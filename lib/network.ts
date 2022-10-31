import { ethers } from "ethers";

type NETWORKS = "homestead" | "goerli" | "localhost";
type Provider =
  | ethers.providers.AlchemyProvider
  | ethers.providers.JsonRpcProvider;

const providerSingletons: Record<NETWORKS, Provider | null> = {
  homestead: null,
  goerli: null,
  localhost: null,
};

export function getProvider(
  _network: keyof typeof providerSingletons = "homestead"
): Provider {
  const provider = providerSingletons[_network];
  if (provider) return provider;

  // @ts-ignore
  const network = window.Cypress ? "localhost" : _network;

  let newProvider;
  if (network === "localhost") {
    newProvider = new ethers.providers.JsonRpcProvider(
      `http://localhost:8545/`
    );
  } else {
    newProvider = new ethers.providers.AlchemyProvider(
      network,
      process.env.NEXT_PUBLIC_ALCHEMY_KEY
    );
  }
  providerSingletons[network] = newProvider;

  return newProvider;
}
