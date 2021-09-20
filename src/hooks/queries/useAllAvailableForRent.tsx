import request from "graphql-request";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Lending, Nft } from "../../types/classes";
import { queryAllLendingRenft } from "../../services/queries";
import { timeItAsync } from "../../utils";
import { SECOND_IN_MILLISECONDS } from "../../consts";
import { debounceTime, from, map, Observable, switchMap, timer } from "rxjs";
import { LendingRaw } from "../../types";
import shallow from "zustand/shallow";
import { useWallet } from "../store/useWallet";
import { useCurrentAddress } from "../misc/useCurrentAddress";
import { NFTRentType, useLendingStore, useNftsStore } from "../store/useNftStore";

export const fetchRentings = (): Observable<LendingRaw[]> => {
  if (!process.env.NEXT_PUBLIC_RENFT_API) {
    throw new Error("RENFT_API is not defined");
  }
  const subgraphURI = process.env.NEXT_PUBLIC_RENFT_API;
  return from<Promise<{ lendings: LendingRaw[] }>>(
    timeItAsync("Pulled All ReNFT Lendings", async () =>
      request(subgraphURI, queryAllLendingRenft).catch(() => {
        console.warn("could not pull all ReNFT lendings");
        return {};
      })
    )
  ).pipe(
    map((response) => Object.values(response?.lendings || [])),
    map((lendings) => {
      return lendings.filter((v) => !v.renting).filter((v) => v != null);
    })
  );
};

export const useAllAvailableForRent = () => {
  const { network } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const currentAddress = useCurrentAddress();
  const allLendings = useLendingStore(
    useCallback((state) => state.lendings, []),
    shallow
  );
  

  const addNfts = useNftsStore((state) => state.addNfts);
  const addLendings = useLendingStore((state) => state.addLendings);
  const allAvailableToRentIds = useLendingStore(
    useCallback((state) => state.allAvailableToRent, []),
    shallow
  );
  useEffect(() => {
    const subscription = timer(0, 10 * SECOND_IN_MILLISECONDS)
      .pipe(
        switchMap(() => {
          if (
            network &&
            network !== process.env.NEXT_PUBLIC_NETWORK_SUPPORTED
          ) {
            return [];
          }
          setLoading(true);
          return fetchRentings();
        }),
        map((items) => {
          const nfts = items.map(
            (lendingRaw) =>
              new Nft(
                lendingRaw.nftAddress,
                lendingRaw.tokenId,
                lendingRaw.lentAmount,
                lendingRaw.isERC721
              )
          );
          addNfts(nfts);
          addLendings(items.map((r) => new Lending(r)), NFTRentType.ALL_AVAILABLE_TO_RENT);
        }),
        debounceTime(SECOND_IN_MILLISECONDS),
        map(() => {
          setLoading(false);
        })
      )
      .subscribe();
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [currentAddress, setLoading, network, addLendings, addNfts]);

  const allAvailableToRent = useMemo(() => {
    if (!currentAddress) return Object.values(allLendings);
    const filterAvailableForRenting = (l: Lending) => {
      // empty address show all renting
      // ! not equal. if lender address === address, then that means we have lent the item, and now want to rent our own item
      // ! therefore, this check is !==
      const userNotLender =
        l.lenderAddress.toLowerCase() !== currentAddress.toLowerCase();
      const userNotRenter = l.lenderAddress.toLowerCase() !== currentAddress;
      return userNotLender && userNotRenter && allAvailableToRentIds.has(l.id);
    }
    return Object.values(allLendings).filter(filterAvailableForRenting);
  }, [currentAddress, allLendings, allAvailableToRentIds]);

  return { allAvailableToRent, isLoading };
};
