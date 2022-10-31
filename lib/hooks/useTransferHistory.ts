import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { getProvider } from "../network";
import { Token } from "../types";
import { ethersToBn } from "../bignumber";
import { ERC20_ABI } from "../abis/Token";
import { DEFAULT_DECIMALS } from "../constants";

async function getTransfersByToken(
  accountAddress: string,
  tokenAddress: string
) {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    ERC20_ABI,
    getProvider()
  );

  const transfers = await tokenContract.queryFilter(
    tokenContract.filters.Transfer(accountAddress, null, null)
  );

  return transfers.map((log) => {
    const parsed = tokenContract.interface.parseLog(log).args;

    return {
      from: parsed.src,
      to: parsed.dst,
      amount: parsed.wad,
      blockNumber: log.blockNumber,
    };
  });
}

export function useTransferHistory(
  wallet: ethers.Wallet | null,
  tokens: Token[]
) {
  return useQuery(
    ["history", wallet?.address],
    async () => {
      if (!wallet || tokens.length === 0) return [];

      const transfers = await Promise.all(
        tokens.map((token) =>
          getTransfersByToken(wallet.address, token.address)
        )
      );

      return transfers.flat();
    },
    {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      keepPreviousData: true,
      staleTime: 1000,
      enabled: wallet !== null,
    }
  );
}
