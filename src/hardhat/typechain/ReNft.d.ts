/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ReNftInterface extends ethers.utils.Interface {
  functions: {
    "claimCollateral(address[],uint256[],uint256[])": FunctionFragment;
    "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "rent(address[],uint256[],uint256[],uint16[])": FunctionFragment;
    "rentFee()": FunctionFragment;
    "returnIt(address[],uint256[],uint256[])": FunctionFragment;
    "setBeneficiary(address)": FunctionFragment;
    "setRentFee(uint256)": FunctionFragment;
    "stopLending(address[],uint256[],uint256[])": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "claimCollateral",
    values: [string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "lend",
    values: [
      string[],
      BigNumberish[],
      BigNumberish[],
      BytesLike[],
      BytesLike[],
      BigNumberish[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "rent",
    values: [string[], BigNumberish[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "rentFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "returnIt",
    values: [string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setBeneficiary",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRentFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stopLending",
    values: [string[], BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lend", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rentFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "returnIt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBeneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRentFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stopLending",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "CollateralClaimed(address,uint256,uint256,uint32)": EventFragment;
    "LendingStopped(address,uint256,uint256,uint32)": EventFragment;
    "Lent(address,uint256,uint256,address,uint16,bytes4,bytes4,bool,uint8)": EventFragment;
    "Rented(address,uint256,uint256,address,uint16,bool,uint32)": EventFragment;
    "Returned(address,uint256,uint256,address,uint32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollateralClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LendingStopped"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Lent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Rented"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Returned"): EventFragment;
}

export class ReNft extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  listeners<T, G>(
    eventFilter?: TypedEventFilter<T, G>
  ): Array<TypedListener<T, G>>;
  off<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  on<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  once<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeListener<T, G>(
    eventFilter: TypedEventFilter<T, G>,
    listener: TypedListener<T, G>
  ): this;
  removeAllListeners<T, G>(eventFilter: TypedEventFilter<T, G>): this;

  queryFilter<T, G>(
    event: TypedEventFilter<T, G>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<T & G>>>;

  interface: ReNftInterface;

  functions: {
    claimCollateral(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "claimCollateral(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    lend(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    rent(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "rent(address[],uint256[],uint256[],uint16[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    rentFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "rentFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    returnIt(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "returnIt(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setBeneficiary(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setBeneficiary(address)"(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setRentFee(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setRentFee(uint256)"(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stopLending(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "stopLending(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  claimCollateral(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "claimCollateral(address[],uint256[],uint256[])"(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  lend(
    _nft: string[],
    _tokenId: BigNumberish[],
    _maxRentDuration: BigNumberish[],
    _dailyRentPrice: BytesLike[],
    _nftPrice: BytesLike[],
    _paymentToken: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])"(
    _nft: string[],
    _tokenId: BigNumberish[],
    _maxRentDuration: BigNumberish[],
    _dailyRentPrice: BytesLike[],
    _nftPrice: BytesLike[],
    _paymentToken: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC1155Received(address,address,uint256,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC721Received(address,address,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  rent(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    _rentDuration: BigNumberish[],
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "rent(address[],uint256[],uint256[],uint16[])"(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    _rentDuration: BigNumberish[],
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  rentFee(overrides?: CallOverrides): Promise<BigNumber>;

  "rentFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  returnIt(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "returnIt(address[],uint256[],uint256[])"(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setBeneficiary(
    _newBeneficiary: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setBeneficiary(address)"(
    _newBeneficiary: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setRentFee(
    _rentFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setRentFee(uint256)"(
    _rentFee: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stopLending(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "stopLending(address[],uint256[],uint256[])"(
    _nft: string[],
    _tokenId: BigNumberish[],
    _id: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    claimCollateral(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "claimCollateral(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    lend(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    rent(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "rent(address[],uint256[],uint256[],uint16[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    rentFee(overrides?: CallOverrides): Promise<BigNumber>;

    "rentFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    returnIt(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "returnIt(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    setBeneficiary(
      _newBeneficiary: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBeneficiary(address)"(
      _newBeneficiary: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRentFee(
      _rentFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setRentFee(uint256)"(
      _rentFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stopLending(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "stopLending(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    CollateralClaimed(
      nftAddress: string | null,
      tokenId: BigNumberish | null,
      lendingId: BigNumberish | null,
      claimedAt: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, number],
      {
        nftAddress: string;
        tokenId: BigNumber;
        lendingId: BigNumber;
        claimedAt: number;
      }
    >;

    LendingStopped(
      nftAddress: string | null,
      tokenId: BigNumberish | null,
      lendingId: BigNumberish | null,
      stoppedAt: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, number],
      {
        nftAddress: string;
        tokenId: BigNumber;
        lendingId: BigNumber;
        stoppedAt: number;
      }
    >;

    Lent(
      nftAddress: string | null,
      tokenId: BigNumberish | null,
      lendingId: null,
      lenderAddress: string | null,
      maxRentDuration: null,
      dailyRentPrice: null,
      nftPrice: null,
      isERC721: null,
      paymentToken: null
    ): TypedEventFilter<
      [
        string,
        BigNumber,
        BigNumber,
        string,
        number,
        string,
        string,
        boolean,
        number
      ],
      {
        nftAddress: string;
        tokenId: BigNumber;
        lendingId: BigNumber;
        lenderAddress: string;
        maxRentDuration: number;
        dailyRentPrice: string;
        nftPrice: string;
        isERC721: boolean;
        paymentToken: number;
      }
    >;

    Rented(
      nftAddress: string | null,
      tokenId: BigNumberish | null,
      lendingId: null,
      renterAddress: string | null,
      rentDuration: null,
      isERC721: null,
      rentedAt: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, string, number, boolean, number],
      {
        nftAddress: string;
        tokenId: BigNumber;
        lendingId: BigNumber;
        renterAddress: string;
        rentDuration: number;
        isERC721: boolean;
        rentedAt: number;
      }
    >;

    Returned(
      nftAddress: string | null,
      tokenId: BigNumberish | null,
      lendingId: BigNumberish | null,
      renterAddress: null,
      returnedAt: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, string, number],
      {
        nftAddress: string;
        tokenId: BigNumber;
        lendingId: BigNumber;
        renterAddress: string;
        returnedAt: number;
      }
    >;
  };

  estimateGas: {
    claimCollateral(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "claimCollateral(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    lend(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rent(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "rent(address[],uint256[],uint256[],uint16[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    rentFee(overrides?: CallOverrides): Promise<BigNumber>;

    "rentFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    returnIt(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "returnIt(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    setBeneficiary(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setBeneficiary(address)"(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setRentFee(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setRentFee(uint256)"(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    stopLending(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "stopLending(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimCollateral(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "claimCollateral(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    lend(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "lend(address[],uint256[],uint16[],bytes4[],bytes4[],uint8[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _maxRentDuration: BigNumberish[],
      _dailyRentPrice: BytesLike[],
      _nftPrice: BytesLike[],
      _paymentToken: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rent(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "rent(address[],uint256[],uint256[],uint16[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      _rentDuration: BigNumberish[],
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    rentFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "rentFee()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    returnIt(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "returnIt(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setBeneficiary(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setBeneficiary(address)"(
      _newBeneficiary: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setRentFee(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setRentFee(uint256)"(
      _rentFee: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stopLending(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "stopLending(address[],uint256[],uint256[])"(
      _nft: string[],
      _tokenId: BigNumberish[],
      _id: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}