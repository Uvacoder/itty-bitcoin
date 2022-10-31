/// <reference types="cypress" />

import { ethers } from "ethers";

export function getWallet(index: number): ethers.Wallet {
  const provider = getTestnetProvider();

  const MNEMONIC = Cypress.env("TEST_MNEMONIC");
  const wallet = ethers.Wallet.fromMnemonic(
    MNEMONIC,
    `m/44'/60'/0'/0/${index}`
  );

  return wallet.connect(provider);
}

export async function impersonateSigner(
  address: string
): Promise<ethers.Signer> {
  await startImpersonation(address);
  return getTestnetProvider().getSigner(address);
}

let cachedProvider: ethers.providers.JsonRpcProvider | null = null;
export function getTestnetProvider(): ethers.providers.JsonRpcProvider {
  if (cachedProvider) {
    return cachedProvider;
  } else {
    cachedProvider = new ethers.providers.JsonRpcProvider(
      `http://localhost:8545/`
    );
    return cachedProvider;
  }
}

// Fork localhost network to the given block
export function forkNetwork(block: string | number): Promise<unknown> {
  const provider = getTestnetProvider();
  return provider.send("hardhat_reset", [
    {
      forking: {
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${Cypress.env(
          "TEST_ALCHEMY_KEY"
        )}`,
        blockNumber: block,
      },
    },
  ]);
}

export function startImpersonation(address: string): Promise<unknown> {
  const provider = getTestnetProvider();
  return provider.send("hardhat_impersonateAccount", [address]);
}

export function stopImpersonation(address: string): Promise<unknown> {
  const provider = getTestnetProvider();
  return provider.send("hardhat_stopImpersonatingAccount", [address]);
}
