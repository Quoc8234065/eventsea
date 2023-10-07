"use client";

// Navbar.tsx

import Link from "next/link";
import EventSeaLogo from "../public/icons/EventSeaLogo";
import WalletIcon from "../public/icons/WalletIcon";
import { Button } from "./ui/Button";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "./../lib/utils";

export const ConnectWalletButton = () => {
  const [account, setAccount] = useState<string | undefined>();
  const { sdk, connected, connecting } = useSDK();

  const connect = async () => {
    try {
      const metaMaskAccount = (await sdk?.connect()) as string;
      setAccount(metaMaskAccount[0]);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setAccount(undefined); // Optionally reset the account state
    }
  };

  return (
    <>
      {connected ? (
        <div>
          {formatAddress(account)}{" "}
          {/* Using the formatAddress utility function */}
          <button onClick={disconnect}>DISCONNECT</button>{" "}
          {/* Disconnect button */}
        </div>
      ) : (
        <Button variant="primary" disabled={connecting} onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" /> Connect MetaMask
        </Button>
      )}
    </>
  );
};

export const NavBar = () => {
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Demo React App",
      url: window.location.host,
    },
  };

  return (
    <nav className="flex mx-auto px-6 py-7 bg-white border rounded-xl items-center justify-between max-w-screen-xl">
      <Link href="/" className="flex gap-1 px-6">
        <EventSeaLogo />
        <span className="text-2xl font-bold sm:block hidden">
          <span className="text-[#0C200A]">Event</span>
          <span className="text-[#4C6D07]">Sea</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6">
        <SearchBar />
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton />
        </MetaMaskProvider>
      </div>
    </nav>
  );
};

export default NavBar;
