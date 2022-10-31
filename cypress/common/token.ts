/// <reference types="cypress" />

import { ethers } from "ethers";
import { INIT_BLOCK } from "./constants";

export async function mintTokens(
  provider: ethers.providers.JsonRpcProvider,
  tokenAddress: string,
  recipient: string,
  amount: ethers.BigNumber
): Promise<void> {
  const encodedAmount = ethers.utils.hexlify(
    ethers.utils.zeroPad(amount.toHexString(), 32)
  );
  for (let i = 0; i < 500; i++) {
    // Try storage slot index
    const index = ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [recipient, i] // key, slot
    );

    const prevStorage = await provider.send("eth_getStorageAt", [
      tokenAddress,
      index,
    ]);
    await provider.send("hardhat_setStorageAt", [
      tokenAddress,
      index,
      encodedAmount,
    ]);

    const token = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) external view returns (uint256)"],
      provider
    );
    const balance = await token.balanceOf(recipient);
    if (balance.eq(amount)) {
      return;
    }

    // This wasn't the right slot, restore the data and keep searching
    await provider.send("hardhat_setStorageAt", [
      tokenAddress,
      index,
      prevStorage,
    ]);
  }
}

export async function sendETH(
  signer: ethers.Signer,
  to: string,
  amount: number
): Promise<void> {
  const latestBlock = await signer.provider?.getBlock("latest");
  const accountNonce = ethers.utils.hexlify(
    await signer.getTransactionCount(latestBlock?.number ?? INIT_BLOCK)
  );
  await signer.sendTransaction({
    to,
    value: ethers.utils.parseEther(amount.toString()),
    nonce: accountNonce,
  });
}
