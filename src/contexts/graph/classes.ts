import { Address } from "../../types";
import { ERC721 } from "../../hardhat/typechain/ERC721";
import { ERC1155 } from "../../hardhat/typechain/ERC1155";
import { LendingRaw, RentingRaw, ILending, IRenting, NftToken } from "./types";
import { parseLending, parseRenting } from "./utils";
import { BigNumber, ethers } from "ethers";
import { ERC721__factory } from "../../hardhat/typechain/factories/ERC721__factory";
import { ERC1155__factory } from "../../hardhat/typechain/factories/ERC1155__factory";
import { decimalToPaddedHexString } from "../../utils";

type NftOptions = {
  tokenURI?: string;
  mediaURI?: string;
  meta?: NftToken["meta"];
};

// typeguard for Lending class
/* eslint-disable-next-line */
export const isLending = (x: any): x is Lending => {
  return "lending" in x;
};

// typeguard for Renting class
/* eslint-disable-next-line */
export const isRenting = (x: any): x is Renting => {
  return "renting" in x;
};

/* eslint-disable-next-line */
export const isNft = (x: any): x is Nft => {
  return !isLending(x) && !isRenting(x);
};

class Nft {
  constructor(
    nftAddress: Address,
    tokenId: string | BigNumber,
    amount: string | BigNumber,
    isERC721: boolean,
    signer: ethers.Signer,
    options?: NftOptions
  ) {
    this.address = nftAddress;
    this.nftAddress = nftAddress;
    this.tokenId = tokenId.toString();
    this.amount = amount.toString();
    this.signer = signer;
    this.isERC721 = isERC721;

    this._meta = options?.meta;
    this._tokenURI = options?.tokenURI ?? "";
    this._mediaURI = options?.mediaURI ?? "";

    if (!options?.tokenURI) {
      const _contract = this.contract();
      const uriSelector = isERC721 ? _contract.tokenURI : _contract.uri;

      uriSelector.bind(this);

      uriSelector(this.tokenId)
        .then((d: string) => {
          this._tokenURI = this._parseTokenURI(d);
        })
        .catch(() => {
          console.warn(
            "could not fetch tokenURI",
            this.address,
            "tokenID",
            this.tokenId
          );
        });
    }
  }

  nftAddress: Address;
  address: Address;
  tokenId: string;
  amount: string;
  signer: ethers.Signer;
  isERC721: boolean;
  _meta: NftToken["meta"] | undefined;
  _tokenURI: string;
  _mediaURI: string;
  _contract: ERC721 | ERC1155 | undefined;

  /**
   * If previously instantiated, will return that instance, otherwise, will instantiate
   * a contract for you
   * @returns ERC721 or ERC1155 instance that can be signed by the currentAddress
   */
  contract = (): ERC721 | ERC1155 => {
    if (this._contract) return this._contract;

    const instantiator = this.isERC721 ? ERC721__factory : ERC1155__factory;
    const _contract: ERC721 | ERC1155 = instantiator.connect(
      this.address,
      this.signer
    );
    this._contract = _contract;
    return _contract;
  };

  loadTokenURI = async (): Promise<string | undefined> => {
    if (this._tokenURI) return this._tokenURI;
    if (!this._contract) this.contract();

    try {
      if (this.isERC721) {
        return await this.contract().tokenURI(
          ethers.BigNumber.from(this.tokenId)
        );
      } else {
        return this._parseTokenURI(
          await this.contract().uri(ethers.BigNumber.from(this.tokenId))
        );
      }
    } catch {
      console.warn("loadTokenURI error");
    }
  };

  loadAmount = async (address?: string): Promise<string> => {
    if (this.isERC721 || !address) this.amount = "1";
    // not returning the already computed amount because the provider can change and with it the address
    // anothe reason is due to users of renft lending and renting and thus amounts dynamically changing
    else {
      const amount = (
        await this.contract()
          .balanceOf(address, this.tokenId)
          .catch(() => "0")
      ).toString();
      this.amount = amount;
    }
    return this.amount;
  };

  _parseTokenURI = (uri: string): string => {
    // https://eips.ethereum.org/EIPS/eip-1155
    // will contain {id}
    const uriMatch = uri.match(/(^.+)(\{id\})/);
    if (uriMatch) {
      const [baseURI, _] = uriMatch;
      const url = `${baseURI}${decimalToPaddedHexString(
        Number(this.tokenId),
        64
      ).slice(2)}`;
      return url;
    }
    return uri;
  };
}

class Lending extends Nft {
  constructor(
    lendingRaw: LendingRaw,
    signer: ethers.Signer,
    options?: NftOptions
  ) {
    super(
      lendingRaw.nftAddress,
      lendingRaw.tokenId,
      lendingRaw.lentAmount,
      lendingRaw.isERC721,
      signer,
      options
    );

    this.lending = parseLending(lendingRaw);
    this.id = lendingRaw.id;
  }
  lending: ILending;
  id: string;
}

class Renting extends Nft {
  constructor(
    nftAddress: Address,
    tokenId: string,
    amount: string,
    signer: ethers.Signer,
    rentingRaw: RentingRaw,
    options?: NftOptions
  ) {
    super(nftAddress, tokenId, amount, rentingRaw.isERC721, signer, options);

    this.renting = parseRenting(rentingRaw);
    this.id = rentingRaw.id;
  }
  renting: IRenting;
  id: string;
}

export { Nft, Lending, Renting };
