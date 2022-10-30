import { BigNumber } from "bignumber.js";

export type Falsy = false | null | undefined;

export interface Token {
  address: string;
  symbol: string;
  balance: BigNumber;
  decimals: BigNumber;
}
