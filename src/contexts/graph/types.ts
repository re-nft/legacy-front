import { Address, PaymentToken, TokenId } from "../../types";

export type NftToken = {
  address: Address;
  tokenId: TokenId;
  uri?: string;
};

// ! NON-RENFT SUBGRAPHS for 721 and 1155

// raw data that comes from the eip721 subgraph
export type ERC721s = {
  tokens: {
    // e.g. "0xbcd4f1ecff4318e7a0c791c7728f3830db506c71_3000013"
    id: string;
    // e.g. "https://nft.service.cometh.io/3000013"
    tokenURI?: NftToken["uri"];
  }[];
};

// raw data that comes from the eip1155 subgraph
export type ERC1155s = {
  account: {
    balances: {
      amount: number;
      token: {
        tokenId: NftToken["tokenId"];
        tokenURI?: NftToken["uri"];
        registry: {
          contractAddress: Address;
        };
      };
    }[];
  };
};

// ! RENFT SUBGRAPH BELOW

export type Lending = {
  id: string;
  nftAddress: Address;
  tokenId: TokenId;
  lenderAddress: Address;
  maxRentDuration: number;
  dailyRentPrice: number;
  nftPrice: number;
  paymentToken: PaymentToken;
  renting?: string;
  collateralClaimed: boolean;
};

export type LendingRaw = Omit<
  Lending,
  "maxRentDuration" | "dailyRentPrice" | "nftPrice" | "paymentToken"
> & {
  maxRentDuration: string;
  dailyRentPrice: string;
  nftPrice: string;
  paymentToken: string;
};

export type Renting = {
  id: string;
  renterAddress: Address;
  rentDuration: number;
  rentedAt: number;
  lendingId: string;
};

export type RentingRaw = Omit<Renting, "rentDuration" | "rentedAt"> & {
  rentDuration: string;
  rentedAt: string;
};
