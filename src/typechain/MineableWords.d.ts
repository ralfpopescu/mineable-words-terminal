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
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MineableWordsInterface extends ethers.utils.Interface {
  functions: {
    "REMOVETHIS_getBlockNumber()": FunctionFragment;
    "REMOVETHIS_setBlockNumber(uint256)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "bounties(uint256)": FunctionFragment;
    "characters()": FunctionFragment;
    "claimBounty(uint256)": FunctionFragment;
    "decodeMword(uint88)": FunctionFragment;
    "encodeMword(uint256)": FunctionFragment;
    "encodeNonce(address,uint96)": FunctionFragment;
    "fees()": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "initiateBountyRemoval(uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "mint(uint96)": FunctionFragment;
    "name()": FunctionFragment;
    "offerBounty(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "removeBounty(uint256)": FunctionFragment;
    "renderData(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenByIndex(uint256)": FunctionFragment;
    "tokenOfOwnerByIndex(address,uint256)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
    "withdrawFees()": FunctionFragment;
    "withdrawableBalances(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "REMOVETHIS_getBlockNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REMOVETHIS_setBlockNumber",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "bounties",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "characters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimBounty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "decodeMword",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeMword",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeNonce",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "fees", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initiateBountyRemoval",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "offerBounty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBounty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renderData",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenByIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOfOwnerByIndex",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawableBalances",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "REMOVETHIS_getBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REMOVETHIS_setBlockNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bounties", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "characters", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimBounty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeMword",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeMword",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initiateBountyRemoval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "offerBounty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeBounty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renderData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenOfOwnerByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawableBalances",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "BountyOffered(uint256)": EventFragment;
    "BountyRemoval(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BountyOffered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BountyRemoval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    approved: string;
    tokenId: BigNumber;
  }
>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean] & {
    owner: string;
    operator: string;
    approved: boolean;
  }
>;

export type BountyOfferedEvent = TypedEvent<[BigNumber] & { mword: BigNumber }>;

export type BountyRemovalEvent = TypedEvent<[BigNumber] & { mword: BigNumber }>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber }
>;

export class MineableWords extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MineableWordsInterface;

  functions: {
    REMOVETHIS_getBlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    REMOVETHIS_setBlockNumber(
      bn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    bounties(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, boolean, BigNumber] & {
        buyer: string;
        value: BigNumber;
        isClaimed: boolean;
        safeRemoveAfterBlockNumber: BigNumber;
      }
    >;

    characters(overrides?: CallOverrides): Promise<[string]>;

    claimBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decodeMword(
      encoded: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    encodeMword(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    encodeNonce(
      sender: string,
      nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    fees(overrides?: CallOverrides): Promise<[BigNumber]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initiateBountyRemoval(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mint(
      nonce: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    offerBounty(
      mword: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    removeBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renderData(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawableBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  REMOVETHIS_getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

  REMOVETHIS_setBlockNumber(
    bn: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  bounties(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, boolean, BigNumber] & {
      buyer: string;
      value: BigNumber;
      isClaimed: boolean;
      safeRemoveAfterBlockNumber: BigNumber;
    }
  >;

  characters(overrides?: CallOverrides): Promise<string>;

  claimBounty(
    mword: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decodeMword(
    encoded: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  encodeMword(
    data: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  encodeNonce(
    sender: string,
    nonce: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  fees(overrides?: CallOverrides): Promise<BigNumber>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  initiateBountyRemoval(
    mword: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mint(
    nonce: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  offerBounty(
    mword: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  removeBounty(
    mword: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renderData(data: BigNumberish, overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenByIndex(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawFees(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawableBalances(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    REMOVETHIS_getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    REMOVETHIS_setBlockNumber(
      bn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    bounties(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, boolean, BigNumber] & {
        buyer: string;
        value: BigNumber;
        isClaimed: boolean;
        safeRemoveAfterBlockNumber: BigNumber;
      }
    >;

    characters(overrides?: CallOverrides): Promise<string>;

    claimBounty(mword: BigNumberish, overrides?: CallOverrides): Promise<void>;

    decodeMword(
      encoded: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeMword(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeNonce(
      sender: string,
      nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fees(overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    initiateBountyRemoval(
      mword: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(nonce: BigNumberish, overrides?: CallOverrides): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    offerBounty(mword: BigNumberish, overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    removeBounty(mword: BigNumberish, overrides?: CallOverrides): Promise<void>;

    renderData(data: BigNumberish, overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    withdrawFees(overrides?: CallOverrides): Promise<void>;

    withdrawableBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    "BountyOffered(uint256)"(
      mword?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { mword: BigNumber }>;

    BountyOffered(
      mword?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { mword: BigNumber }>;

    "BountyRemoval(uint256)"(
      mword?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { mword: BigNumber }>;

    BountyRemoval(
      mword?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { mword: BigNumber }>;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;
  };

  estimateGas: {
    REMOVETHIS_getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;

    REMOVETHIS_setBlockNumber(
      bn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    bounties(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    characters(overrides?: CallOverrides): Promise<BigNumber>;

    claimBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decodeMword(
      encoded: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeMword(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeNonce(
      sender: string,
      nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fees(overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initiateBountyRemoval(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      nonce: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    offerBounty(
      mword: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renderData(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawableBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    REMOVETHIS_getBlockNumber(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REMOVETHIS_setBlockNumber(
      bn: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bounties(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    characters(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decodeMword(
      encoded: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeMword(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeNonce(
      sender: string,
      nonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initiateBountyRemoval(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      nonce: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    offerBounty(
      mword: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeBounty(
      mword: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renderData(
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenByIndex(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenOfOwnerByIndex(
      owner: string,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawableBalances(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
