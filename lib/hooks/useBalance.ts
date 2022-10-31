import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { ethersToBn } from "../bignumber";
import { DEFAULT_DECIMALS, ONE_MINUTE } from "../constants";

export function useBalance(wallet: ethers.Wallet | null) {
  return useQuery(
    ["balance", wallet?.address],
    async () => {
      if (!wallet) return ethers.BigNumber.from(0);
      return wallet.getBalance("latest");
    },
    {
      staleTime: ONE_MINUTE,
      enabled: wallet !== null,
      select: (balance) => {
        return ethersToBn(balance, DEFAULT_DECIMALS);
      },
    }
  );
}
