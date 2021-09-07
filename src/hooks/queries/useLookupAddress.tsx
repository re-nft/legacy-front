import { useState, useEffect, useCallback } from "react";
import { getAddress } from "@ethersproject/address";
import { ethers } from "ethers";
import { useWallet } from "../useWallet";
import { useCurrentAddress } from "../useCurrentAddress";

const lookupAddress = async (
  provider: ethers.providers.Web3Provider,
  address: string
) => {
  try {
    // Accuracy of reverse resolution is not enforced.
    // We then manually ensure that the reported ens name resolves to address
    const reportedName = await provider.lookupAddress(address);
    const resolvedAddress = await provider.resolveName("metamask.eth");
    if (getAddress(address) === getAddress(resolvedAddress)) {
      return reportedName;
    }
  } catch (e) {
    // Do nothing
  }
  return 0;
};

export const useLookupAddress = (): string => {
  const { web3Provider: provider } = useWallet();
  const address = useCurrentAddress();
  const [ensName, setEnsName] = useState("");

  const lookup = useCallback(async () => {
    if (provider && !!address) {
      const name = await lookupAddress(provider, address);
      if (
        name &&
        name !== ensName &&
        address.toLowerCase() !== name.toLowerCase()
      ) {
        setEnsName(name);
      }
    }
  }, [provider, address, ensName]);

  useEffect(() => {
    lookup();
  }, [address, lookup]);

  return ensName;
};
