import { useMutation } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { FormEvent } from "react";
import { ERC20_ABI } from "../abis/Token";
import { bnToEthers, ethersToBn } from "../bignumber";

export function useTransfer(wallet: ethers.Wallet | null) {
  const mutation = useMutation(
    ["transfer", wallet?.address],
    async ({
      amount,
      recipient,
      tokenAddress,
    }: {
      amount: string;
      recipient: string;
      tokenAddress: string;
    }) => {
      if (!wallet) return false;
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
      const decimals = await contract.decimals();
      const tx = await contract.transfer(
        recipient,
        bnToEthers(new BigNumber(amount), ethersToBn(decimals))
      );
      await tx.wait();
      return true;
    }
  );

  const handleTransferSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    mutation.mutate({
      amount: data.get("amount") as string,
      recipient: data.get("recipient") as string,
      tokenAddress: data.get("token") as string,
    });
  };

  return {
    handleTransferSubmit,
  };
}
