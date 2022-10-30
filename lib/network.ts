import { ethers } from "ethers";

type NETWORKS = "homestead" | "goerli";
type Provider = ethers.providers.AlchemyProvider;

const providerSingletons: Record<NETWORKS, Provider | null> = {
  homestead: null,
  goerli: null,
};

export function getProvider(
  network: keyof typeof providerSingletons = "goerli"
): Provider {
  const provider = providerSingletons[network];

  if (provider) return provider;

  const newProvider = new ethers.providers.AlchemyProvider(
    network,
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  );
  providerSingletons[network] = newProvider;

  return newProvider;
}
