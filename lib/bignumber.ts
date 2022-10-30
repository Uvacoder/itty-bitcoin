import { ethers } from "ethers";
import BigNumber from "bignumber.js";

// This is needed to make BigNumber's toString method not return
// exponential notation, which ethers.BigNumber can't parse.
BigNumber.config({ EXPONENTIAL_AT: 1_000_000 });

// Converts `value` ethers.BigNumber to a BigNumber, optionally dividing by
// 10 ^ `decimals` to produce a floating point representation of a fixed-point
// integer `value`.
const ethersToBn = (
  value: ethers.BigNumber,
  decimals: ethers.BigNumber | number = 0
): BigNumber => {
  const base = ethers.BigNumber.from(10).pow(decimals);
  const bn = new BigNumber(value.toString());
  return bn.dividedBy(new BigNumber(base.toString()));
};

// Converts `value` BigNumber to ethers.BigNumber, optionally multiplying it by
// 10 ^ `decimals` to produce a fixed-point interger representation of `value`.
const bnToEthers = (
  value: BigNumber,
  decimals: number | BigNumber = 0
): ethers.BigNumber => {
  const dec = BigNumber.isBigNumber(decimals)
    ? decimals
    : new BigNumber(decimals);
  const base = new BigNumber(10).pow(dec);
  const val = value.multipliedBy(base).decimalPlaces(0);
  return ethers.BigNumber.from(val.toString());
};

export { ethersToBn, bnToEthers };
