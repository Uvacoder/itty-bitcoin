import { ethers } from "ethers";
import { FormEvent, useMemo, useState } from "react";
import { getProvider } from "../network";

// We disable eslint on the next line cause changing `{}` to `Record<string, unknown>`
// makes the function not accept a value of `unknown` as a proper argument, even after
// narrowing it with `typeof error === "object"&& error !== null`.
// eslint-disable-next-line @typescript-eslint/ban-types
export function hasKey<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

export function usePrivateKeyInput() {
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const pk = data.get("privateKey") as string;

    // Validate the private key
    try {
      new ethers.Wallet(pk);
      setError(null);
      setPrivateKey(pk);
    } catch (e) {
      if (typeof e === "object" && e !== null && hasKey(e, "reason")) {
        setError(e.reason as string);
      }
    }
  };

  const wallet = useMemo<ethers.Wallet | null>(
    () => (privateKey ? new ethers.Wallet(privateKey, getProvider()) : null),
    [privateKey]
  );

  return {
    wallet,
    privateKey,
    error,
    handleSubmit,
  };
}
