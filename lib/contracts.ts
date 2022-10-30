import { ethers } from "ethers";
import { getProvider } from "./network";

export function getContractBuilder(
  abi: ethers.ContractInterface
): (address: string, wallet?: ethers.Wallet | null) => ethers.Contract {
  return (address: string, wallet?: ethers.Wallet | null) => {
    if (wallet) {
      return new ethers.Contract(address, abi, wallet);
    } else {
      const provider = getProvider();
      return new ethers.Contract(address, abi, provider);
    }
  };
}
