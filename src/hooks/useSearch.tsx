import { useCallback, useMemo } from "react";
import {
  NftFilterType,
  useNFTFilterBy
} from "../components/app-layout/nft-filter-select";
import {
  NftSortType,
  useNFTSortBy
} from "../components/app-layout/nft-sortby-select";
import shallow from "zustand/shallow";
import { Lending } from "../contexts/graph/classes";
import { PaymentToken } from "@renft/sdk";
import { useExchangePrice } from "./useExchangePrice";

export const toUSD = (
  token: PaymentToken,
  amount: number,
  tokenPerUSD: Record<PaymentToken, number>
) => {
  return amount * tokenPerUSD[token];
};

export const compare = (a: number, b: number) => {
  if (a < b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
};

export const sortByDailyRentPrice =
  (tokenPerUSD: Record<PaymentToken, number>, dir = "asc") =>
  (a: Lending, b: Lending) => {
    const priceA = toUSD(
      a.lending.paymentToken,
      a.lending.dailyRentPrice,
      tokenPerUSD
    );
    const priceB = toUSD(
      b.lending.paymentToken,
      b.lending.dailyRentPrice,
      tokenPerUSD
    );
    const result = compare(priceA, priceB);
    return dir === "asc" ? result : result * -1;
  };

export const sortByCollateral =
  (tokenPerUSD: Record<PaymentToken, number>, dir = "asc") =>
  (a: Lending, b: Lending) => {
    const priceA = toUSD(
      a.lending.paymentToken,
      a.lending.nftPrice,
      tokenPerUSD
    );
    const priceB = toUSD(
      b.lending.paymentToken,
      b.lending.nftPrice,
      tokenPerUSD
    );
    const result = compare(priceA, priceB);
    return dir === "asc" ? result : result * -1;
  };

export const sortByDuration =
  (dir = "asc") =>
  (a: Lending, b: Lending) => {
    const priceA = a.lending.maxRentDuration;
    const priceB = b.lending.maxRentDuration;
    const result = compare(priceA, priceB);
    return dir === "asc" ? result : result * -1;
  };

export const useSearch = (items: Lending[]): Lending[] => {
  const filter = useNFTFilterBy(
    useCallback((state) => {
      return state.filters;
    }, []),
    shallow
  );

  const sortBy = useNFTSortBy(
    useCallback((state) => {
      return state.sortBy;
    }, []),
    shallow
  );
  const tokenPerUSD = useExchangePrice();

  const filterItems = useCallback((items: Lending[], filter: NftFilterType) => {
    switch (filter) {
      case "all":
        return items;
      case "art":
        return items;
      case "utility":
        return items;
      case "gaming":
        return items;
      case "erc-721":
        return items.filter((i) => i.isERC721);
      case "erc-1155":
        return items.filter((i) => !i.isERC721);
      case "punks":
        return items.filter(
          (i) =>
            i.address.toLowerCase() ===
            "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
        );
      case "mooncats":
        return items.filter(
          (i) =>
            i.address.toLowerCase() ===
            "0x495f947276749ce646f68ac8c248420045cb7b5e"
        );
      default:
        return items;
    }
  }, []);
  const sortItems = useCallback(
    (items: Lending[], sortBy: NftSortType, tokenPerUSD) => {
      switch (sortBy) {
        case "all":
          return items;
        case "price-low-to-high":
          return items.sort(sortByDailyRentPrice(tokenPerUSD));
        case "price-high-to-low":
          return items.sort(sortByDailyRentPrice(tokenPerUSD, "desc"));
        case "highest-collateral":
          return items.sort(sortByCollateral(tokenPerUSD));
        case "lowest-collateral":
          return items.sort(sortByCollateral(tokenPerUSD, "desc"));
        default:
          return items;
      }
    },
    []
  );

  return useMemo(() => {
    if (filter === "all" && sortBy === "all") {
      return items;
    }
    if (filter === "all") {
      return sortItems(items, sortBy, tokenPerUSD);
    } else if (sortBy === "all") {
      return filterItems(items, filter);
    }
    return sortItems(filterItems(items, filter), sortBy, tokenPerUSD);
  }, [items, filter, sortBy, tokenPerUSD]);
};
