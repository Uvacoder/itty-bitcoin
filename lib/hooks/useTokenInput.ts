import { ethers } from "ethers";
import { FormEvent, useState } from "react";

export function useTokenInput() {
  const [tokenAddresses, setTokens] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTokenSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const token = data.get("token") as string;

    if (ethers.utils.isAddress(token)) {
      if (!tokenAddresses.includes(token)) {
        setTokens((tokenAddresses) => [...tokenAddresses, token]);
        setError(null);
      } else {
        setError("Token already added");
      }
    } else {
      setError("Invalid token address");
    }
  };

  return {
    tokenAddresses,
    error,
    handleAddTokenSubmit,
  };
}
