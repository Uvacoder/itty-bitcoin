import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { ethersToBn } from "../bignumber";
import { DEFAULT_DECIMALS, FIVE_SECONDS } from "../constants";
import { getProvider } from "../network";
import { Token } from "../types";
import { ERC20_ABI } from "../abis/Token";

async function getTokenInfo(
  address: string,
  tokenAddress: string
): Promise<Token> {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, getProvider());
  const [balance, decimals, symbol] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals(),
    contract.symbol(),
  ]);
  const bnBalance = ethersToBn(balance, DEFAULT_DECIMALS);
  const bnDec = ethersToBn(decimals ?? DEFAULT_DECIMALS);

  return {
    address: tokenAddress,
    balance: bnBalance,
    decimals: bnDec,
    symbol,
  };
}

export function useTokens(
  wallet: ethers.Wallet | null,
  tokenAddresses: string[]
) {
  return useQuery(
    ["info", wallet?.address, tokenAddresses],
    async () => {
      if (!wallet || tokenAddresses.length === 0) return [];
      return Promise.all(
        tokenAddresses.map((token) => getTokenInfo(wallet.address, token))
      );
    },
    {
      refetchInterval: FIVE_SECONDS,
      refetchIntervalInBackground: true,
      keepPreviousData: true,
      enabled: wallet !== null && tokenAddresses.length > 0,
    }
  );
}
