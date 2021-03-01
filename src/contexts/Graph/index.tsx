import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { request } from "graphql-request";
import parse from "url-parse";
import { set as ramdaSet, lensPath, hasPath } from "ramda";
import { ethers, BigNumber } from "ethers";

import {
  CurrentAddressContext,
  MyERC721Context,
  RentNftContext,
  SignerContext,
} from "../../hardhat/SymfoniContext";
import { ERC721 } from "../../hardhat/typechain/ERC721";
import { ERC1155 } from "../../hardhat/typechain/ERC1155";
import { getERC1155, getERC721, THROWS } from "../../utils";
import { usePoller } from "../../hooks/usePoller";
import { Nft, Path } from "../../types";
import { SECOND_IN_MILLISECONDS } from "../../consts";

import {
  AddressToErc721,
  AddressToErc1155,
  AddressToLending,
  AddressToRenting,
  UserData,
  LendingRentingRaw,
  Lending,
  User,
  MyERC1155s,
  MyERC721s,
} from "./types";
import {
  queryRenftUser,
  queryRenftLendingRentings,
  queryMyERC721s,
  queryMyERC1155s,
} from "./queries";
import { parseLending } from "./utils";

import useIpfsFactory from "../../hooks/ipfs/useIpfsFactory";

/**
 * Useful links
 * https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph
 * https://api.thegraph.com/subgraphs/name/amxx/eip1155-subgraph
 * https://github.com/0xsequence/token-directory
 *
 * Kudos to
 * Luis: https://github.com/microchipgnu
 * Solidity God: wighawag
 */

const CORS_PROXY = process.env["REACT_APP_CORS_PROXY"];
const IS_PROD =
  process.env["REACT_APP_ENVIRONMENT"]?.toLowerCase() === "production";

const ENDPOINT_RENFT_PROD =
  "https://api.thegraph.com/subgraphs/name/nazariyv/rentnft";
const ENDPOINT_RENFT_DEV =
  "http://localhost:8000/subgraphs/name/nazariyv/ReNFT";

const ENDPOINT_EIP721_PROD =
  "https://api.thegraph.com/subgraphs/name/wighawag/eip721-subgraph";
const ENDPOINT_EIP1155_PROD =
  "https://api.thegraph.com/subgraphs/name/amxx/eip1155-subgraph";

type GraphContextType = {
  erc721s: AddressToErc721;
  erc1155s: AddressToErc1155;
  lendings: AddressToLending;
  rentings: AddressToRenting;
  fetchAvailableNfts: () => void;
  removeLending: (nfts: Nft[]) => void;
  user: UserData;
};

const DefaultGraphContext: GraphContextType = {
  erc721s: {},
  erc1155s: {},
  lendings: {},
  rentings: {},
  removeLending: THROWS,
  fetchAvailableNfts: THROWS,
  user: {
    lendings: [],
    rentings: [],
  },
};

const GraphContext = createContext<GraphContextType>(DefaultGraphContext);

export const GraphProvider: React.FC = ({ children }) => {
  // ! currentAddress can be ""
  const [currentAddress] = useContext(CurrentAddressContext);
  const [signer] = useContext(SignerContext);
  const [erc721s, setErc721s] = useState<AddressToErc721>({});
  const [erc1155s, setErc1155s] = useState<AddressToErc1155>({});
  const [lendings, setLendings] = useState<AddressToLending>({});
  const [rentings, setRentings] = useState<AddressToRenting>({});
  const [userData, setUserData] = useState<UserData>({
    lendings: [],
    rentings: [],
  });
  const renft = useContext(RentNftContext);
  const { ipfs } = useIpfsFactory();

  // would be good to get rid of the dev related stuff under here into a
  // separate component, that would only get rendered if we are in dev env
  // because the below logic is not related to prod functioning
  // * only in dev. this is a context for mock ERC721 contract
  const myERC721 = useContext(MyERC721Context);
  // ! only used in dev environment - so don't worry about this too much
  const fetchNftMetaDev = useCallback(async () => {
    if (!myERC721.instance) return [];
    const toFetch: Promise<Response>[] = [];
    const tokenIds: string[] = [];
    // * only fetched ERC721s in dev right now
    const contract = myERC721.instance;

    // * won't fetch in prod
    // pull all of the tokens of the current address
    const numNfts = await contract
      .balanceOf(currentAddress)
      .catch(() => BigNumber.from("0"));
    if (numNfts.toNumber() === 0) return [];

    for (let i = 0; i < numNfts.toNumber(); i++) {
      // get the tokenId, and then fetch the metadata uri, then push this to toFetch
      const tokenId = await contract
        .tokenOfOwnerByIndex(currentAddress, i)
        .catch(() => -1);
      if (tokenId === -1) continue;

      const metaURI = await contract.tokenURI(tokenId).catch(() => "");
      if (!metaURI) continue;

      tokenIds.push(tokenId.toString());
      toFetch.push(
        fetch(metaURI, {
          headers: [["Content-Type", "text/plain"]],
        })
          .then(async (dat) => await dat.json())
          .catch(() => ({}))
      );
    }
    if (toFetch.length === 0) return [];

    const res = await Promise.all(toFetch);
    const tokenIdsObj = {};
    for (let i = 0; i < res.length; i++) {
      Object.assign(tokenIdsObj, { [tokenIds[i]]: res[i] });
    }

    const isApprovedForAll = await contract
      .isApprovedForAll(
        currentAddress,
        /* eslint-disable-next-line */
        renft.instance!.address
      )
      .catch(() => false);
    setErc721s({
      [contract.address]: {
        contract: contract,
        isApprovedForAll,
        tokenIds: tokenIdsObj,
      },
    });
    return res;
  }, [renft.instance, currentAddress, myERC721.instance]);

  // given the URIs, will fetch ERC1155s' meta from IPFS
  // once that is fetched, will fetch images from just
  // fetched meta
  const fetchNftMeta1155 = useCallback(async (uris: parse[]) => {
    const cids: string[] = [];
    const imageCids: string[] = [];

    if (uris.length < 1) return [];

    for (const uri of uris) {
      console.log(uri.pathname);
      if (!uri.pathname) continue;
      const parts = uri.pathname.split("/");
      const CID = parts[parts.length - 1];
      cids.push(CID);
    }
    // const meta = await pull({ cids });
    const meta: any = [];

    const indicesToUpdate: number[] = [];
    for (let i = 0; i < meta.length; i++) {
      if (!("image" in meta[i])) continue;
      //@ts-ignore
      const imageIpfsUri: string | undefined = meta[i].image;
      const cid = imageIpfsUri?.slice(12);
      if (!cid) continue;
      indicesToUpdate.push(i);
      imageCids.push(cid);
    }
    const images: any = [];
    // const images = await pull({ cids: imageCids, isBytesFetch: true });

    for (let i = 0; i < indicesToUpdate.length; i++) {
      try {
        const blob = await images[i].blob();
        //@ts-ignore
        meta[indicesToUpdate[i]]["image"] = URL.createObjectURL(blob);
      } catch (e) {
        console.warn("could not parse image");
        continue;
      }
    }
    return meta;
  }, []);

  const fetchNftMeta721 = useCallback(async (uris: parse[]) => {
    const toFetch: Promise<Response>[] = [];
    if (uris.length < 1) return [];
    for (const uri of uris) {
      if (!uri.href) continue;
      // additional check here is needed for ZORA links, if it is ZORA URI, then it points to image/media
      // rather than actual meta of the NFT
      if (uri.href.startsWith("https://ipfs.daonomic.com")) {
        const parts = uri.href.split("/");
        const CID = parts[parts.length - 1];
        // todo: super inefficient
        const pulled: any = [];
        // const pulled = pull({ cids: [CID] })
        //   .then((dat) => dat[0])
        //   /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        //   .catch(() => ({})) as Promise<any>;
        toFetch.push(pulled);
      } else if (uri.href.startsWith("https://ipfs.fleek.co/ipfs")) {
        // * ZORA will straight up give you the image. No need for ceremonial meta JSON
        const fetched = fetch(uri.href, {
          headers: [["Content-Type", "text/plain"]],
        })
          .then(async (r) => {
            const blob = await r.blob();
            const url = URL.createObjectURL(blob);
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            return { image: url, image_url: url } as any;
          })
          .catch(() => ({}));
        toFetch.push(fetched);
      } else {
        const uriToPull = uri.href.startsWith("https://api.sandbox.game")
          ? `${CORS_PROXY}${uri.href}`
          : uri.href;
        // todo: only fetch if https or http
        const fetched = fetch(uriToPull, {
          headers: [["Content-Type", "text/plain"]],
        })
          .then(async (dat) => await dat.json())
          .catch(() => ({}));
        toFetch.push(fetched);
      }
    }
    const res = await Promise.all(toFetch);
    return res;
  }, []);

  // some image URIs are pointing to ipfs
  // therfore after the initial meta fetch, the second
  // one (this one) is called to retrieve images from IPFS
  const parseMeta = async (meta: Response[]) => {
    const parsedMeta: Response[] = JSON.parse(JSON.stringify(meta));
    const indicesToUpdate: number[] = [];
    const imagesToFetch: string[] = [];
    let ix = 0;
    for (const m of meta) {
      let key = "";
      if ("image" in m) {
        key = "image";
      } else if ("image_url" in m) {
        key = "image_url";
      }
      if (key) {
        //@ts-ignore
        if (m[key].startsWith("ipfs")) {
          indicesToUpdate.push(ix);
          //@ts-ignore
          const parts = m[key].split("/");
          const cid = parts[parts.length - 1];
          //@ts-ignore
          imagesToFetch.push(cid);
        }
      }
      ix++;
    }
    const fetchedImages: any = [];
    // const fetchedImages = await pull({
    //   cids: imagesToFetch,
    //   isBytesFetch: true,
    // });
    for (let i = 0; i < indicesToUpdate.length; i++) {
      let blob: Blob;
      try {
        blob = await fetchedImages[i].blob();
      } catch (e) {
        console.warn("could not fetch image blob");
        continue;
      }
      //@ts-ignore
      parsedMeta[indicesToUpdate[i]]["image"] = URL.createObjectURL(blob);
    }
    return parsedMeta;
  };

  // * uses the eip1155 subgraph to pull all your erc1155 holdings
  const fetchAllERC1155 = useCallback(async () => {
    const query = queryMyERC1155s(currentAddress);
    console.time("pulled my erc1155s");
    const response: MyERC1155s = await request(ENDPOINT_EIP1155_PROD, query);
    console.timeEnd("pulled my erc1155s");
    console.log(response);
    if (
      !response ||
      !response.account ||
      response.account.balances.length === 0
    )
      return [];
    const { balances } = response.account;
    const toFetchPaths: Path[] = [];
    const toFetchLinks: parse[] = [];

    for (const tokenBalance of balances) {
      const { token } = tokenBalance;
      // * sometimes the subgraph does not return the URI. For example, for ZORA
      const _tokenURI = token.URI;
      const address = token.registry.contractAddress;
      if (!_tokenURI) {
        console.warn("could not fetch meta for", address);
        continue;
      }
      const { tokenId } = token;
      if (!address || !tokenId) continue;
      if (!erc1155s[address]?.contract) {
        // React will bundle up these individual setStates
        const contract = getERC1155(address, signer);
        const isApprovedForAll = await contract
          .isApprovedForAll(
            currentAddress,
            /* eslint-disable-next-line */
            renft.instance!.address
          )
          .catch(() => false);
        setErc1155s((prev) => ({
          ...prev,
          [address]: {
            ...prev.address,
            contract: contract,
            isApprovedForAll,
          },
        }));
      }
      if (!hasPath([address, "tokenIds", tokenId])(erc1155s)) {
        if (!_tokenURI) continue;
        toFetchPaths.push([address, "tokenIds", tokenId]);
        toFetchLinks.push(parse(_tokenURI, true));
      }
    }

    const meta = await fetchNftMeta1155(toFetchLinks);
    for (let i = 0; i < meta.length; i++) {
      setErc1155s((prev) => {
        const setTo = ramdaSet(lensPath(toFetchPaths[i]), meta[i], prev);
        return setTo;
      });
    }
    /* eslint-disable-next-line */
  }, [currentAddress, renft.instance, signer, fetchNftMeta1155]);

  // all of the user's erc721s. Uses Ronan's (wighawag) erc721 subgraph
  // todo: potentially save into cache for future sessions
  const fetchAllERC721 = useCallback(async () => {
    const query = queryMyERC721s(currentAddress);
    console.time("pulled my ERC721s");
    const response: MyERC721s = await request(ENDPOINT_EIP721_PROD, query);
    console.timeEnd("pulled my ERC721s");
    console.log(response);

    if (
      !response ||
      !("tokens" in response) ||
      response.tokens.length === 0 ||
      !renft.instance
    )
      return [];

    const toFetchPaths: Path[] = [];
    const toFetchLinks: parse[] = [];

    for (const token of response.tokens) {
      const { id, tokenURI } = token;
      if (!id) continue;
      // * sometimes the subgraph does not return the URI. For example, for ZORA
      let _tokenURI = tokenURI;
      const [address, tokenId] = id.split("_");
      if (!address || !tokenId) continue;

      if (!erc721s[address]?.contract) {
        const contract = getERC721(address, signer);
        const isApprovedForAll = await contract
          .isApprovedForAll(currentAddress, renft.instance?.address)
          .catch(() => false);

        if (!tokenURI) {
          _tokenURI = await contract
            .tokenURI(BigNumber.from(tokenId))
            .catch(() => "");
        }

        setErc721s((prev) => ({
          ...prev,
          [address]: {
            ...prev.address,
            contract: contract,
            isApprovedForAll,
          },
        }));
      }

      if (!hasPath([address, "tokenIds", tokenId])(erc721s)) {
        if (!_tokenURI) continue;
        toFetchPaths.push([address, "tokenIds", tokenId]);
        toFetchLinks.push(parse(_tokenURI, true));
      }
    }

    const meta = await fetchNftMeta721(toFetchLinks);
    // one more pass through the meta to see if any of the images are ipfs
    const parsedMeta = await parseMeta(meta);
    for (let i = 0; i < meta.length; i++) {
      setErc721s((prev) => {
        const setTo = ramdaSet(lensPath(toFetchPaths[i]), parsedMeta[i], prev);
        return setTo;
      });
    }
    // this functions updates erc721s, so it cannot have that as a dep
    /* eslint-disable-next-line */
  }, [currentAddress, renft.instance, fetchNftMeta721, signer]);

  // incremental diff-like updating of the state
  // to avoid costly refetching of the meta
  const _enrichSetLending = useCallback(
    async (nfts: Lending[]): Promise<void> => {
      const toFetchPaths: Path[] = [];
      const toFetchLinks: parse[] = [];
      // contains the list of lendings that we need to fetch this time
      const _nfts: Lending[] = [];

      // closure for incremental fetch of new meta
      // * checks if the tokenId under consideration requires
      // * meta fetching
      const _updateFetchMeta = async (
        nft: Lending,
        contract: ERC721 | ERC1155
      ) => {
        if (!hasPath([nft.nftAddress, "tokenIds", nft.tokenId])(lendings)) {
          const tokenURI = await contract
            .tokenURI(nft.tokenId)
            .catch(() => undefined);
          if (!tokenURI) return false;
          toFetchPaths.push([nft.nftAddress, "tokenIds", nft.tokenId]);
          toFetchLinks.push(parse(tokenURI, true));
          _nfts.push(nft);
          return true;
        }
      };

      for (const nft of nfts) {
        // * in here if this is the first time we are fetching the metadata
        // * for this NFT
        if (!lendings[nft.nftAddress]?.contract) {
          const { contract, isERC721, status } = getNftContract(nft, signer);
          if (!status) continue;

          /* eslint-disable-next-line */
          const isSuccess = await _updateFetchMeta(nft, contract!);
          if (!isSuccess) continue;

          // * this is the first time, so we upate the state
          // * with the contract for the NFT under question
          setLendings((prev) => ({
            ...prev,
            [nft.nftAddress]: {
              ...prev[nft.nftAddress],
              /* eslint-disable-next-line */
              contract: contract!,
              /* eslint-disable-next-line */
              isERC721: isERC721!,
              isERC1155: !isERC721,
            },
          }));
        } else {
          // * in here if we have fetched meta before
          // * checking if the same contract's new tokenId
          // * requires meta fetching
          const contract = await lendings[nft.nftAddress].contract;
          const isSuccess = await _updateFetchMeta(nft, contract);
          if (!isSuccess) continue;
        }
      }

      // todo: this should be nft type agnostic
      const meta = await fetchNftMeta721(toFetchLinks);

      // now that we have gathered and fetched the incremental meta
      // we are ready to update the current state
      for (let i = 0; i < meta.length; i++) {
        setLendings((prev) => {
          const setTo = ramdaSet(
            lensPath(toFetchPaths[i]),
            {
              ...meta[i],
              ..._nfts[i],
            },
            prev
          );
          return setTo;
        });
      }
    },
    [fetchNftMeta721, signer, lendings]
  );

  const fetchUser = useCallback(async () => {
    const query = queryRenftUser(currentAddress);
    const data: {
      user: User;
    } = await request(
      IS_PROD ? ENDPOINT_RENFT_PROD : ENDPOINT_RENFT_DEV,
      query
    );
    if (!data || !data.user) return [];
    const { lending, renting } = data.user;
    setUserData({
      lendings: lending || [],
      rentings: renting || [],
    });
  }, [currentAddress]);

  // queries ALL of the lendings in reNFT. Uses reNFT's subgraph
  const fetchLending = useCallback(async () => {
    const query = queryRenftLendingRentings();
    const data: {
      lendingRentings: LendingRentingRaw[];
    } = await request(
      IS_PROD ? ENDPOINT_RENFT_PROD : ENDPOINT_RENFT_DEV,
      query
    );
    if (!data) return [];
    const { lendingRentings } = data;
    const resolvedData: Lending[] = [];
    for (let i = 0; i < lendingRentings.length; i++) {
      const numTimesLent = lendingRentings[i].lending.length;
      const numTimesRented = lendingRentings[i].renting?.length ?? 0;
      const isAvailable = numTimesLent === numTimesRented + 1;
      if (!isAvailable) continue;
      const item = parseLending(lendingRentings[i].lending[numTimesLent - 1]);
      resolvedData.push(item);
    }
    _enrichSetLending(resolvedData);
  }, [_enrichSetLending]);

  // to avoid complex logic in removing a particular tokenId
  // let the user invoke this function after successful stop lend
  // to remove the lending directly (by assigning undefined)
  // from the state. This saves us from otherwise complex react
  // state comparison versus the pulled from the graph state
  const removeLending = useCallback((nfts: Nft[]) => {
    for (const nft of nfts) {
      if (nft.contract == null) continue;
      // todo: this won't work during re-lends, need to add lendingId in here as well
      setLendings((prev) =>
        ramdaSet(
          /* eslint-disable-next-line*/
          lensPath([nft.contract!.address, "tokenIds", nft.tokenId]),
          undefined,
          prev
        )
      );
    }
  }, []);

  // to ease up the complexity of functions, abstract away instantiating
  // the contract. Contract may be erc1155 or erc721
  const getNftContract = (nft: Lending, signer?: ethers.Signer) => {
    let contract: ERC721 | ERC1155;
    let isERC721: boolean | undefined;

    // determining if we are dealing with erc721 or erc1155
    try {
      contract = getERC721(nft.nftAddress, signer);
      isERC721 = true;
    } catch (e) {
      console.warn(
        "could not instantiate erc721 with",
        nft.nftAddress,
        "must be erc1155"
      );
      contract = getERC1155(nft.nftAddress, signer);
      isERC721 = false;
    }

    if (isERC721 == null) {
      console.warn("unknown contract type", nft.nftAddress);
      return { contract: undefined, isERC721: undefined, status: false };
    }

    return { contract, isERC721, status: true };
  };

  // const fetchRenting = useCallback(async () => {
  //   const nfts = await _fetchRenting();
  //   console.log("all available for renting");
  // }, [_fetchRenting]);

  const fetchAvailableNfts = useCallback(async () => {
    if (IS_PROD) {
      fetchAllERC721();
      fetchAllERC1155();
    } else {
      fetchNftMetaDev();
    }
  }, [fetchAllERC721, fetchAllERC1155, fetchNftMetaDev]);

  usePoller(fetchLending, 5 * SECOND_IN_MILLISECONDS);

  useEffect(() => {
    // ! do not remove this line
    if (!currentAddress || !renft.instance || !signer) return;
    fetchAvailableNfts();
    fetchLending();
    fetchUser();
  }, [
    currentAddress,
    renft.instance,
    signer,
    fetchAvailableNfts,
    fetchLending,
    fetchUser,
  ]);

  return (
    <GraphContext.Provider
      value={{
        erc721s,
        erc1155s,
        fetchAvailableNfts,
        removeLending,
        lendings,
        rentings,
        user: userData,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;