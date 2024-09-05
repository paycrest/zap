"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { PaycrestLogo } from "./ImageAssets";
import { useAccount, useConnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { primaryBtnClasses, secondaryBtnClasses } from "./Styles";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { PiCaretDown } from "react-icons/pi";
import { classNames } from "../utils";
import { Tooltip } from "./Tooltip";
import { GoQuestion } from "react-icons/go";
import { FundWalletModal } from "./FundWalletModal";
import Image from "next/image";
import { NetworksDropdown } from "./NetworksDropdown";
import { WalletDetails } from "./WalletDetails";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  const account = useAccount();
  const { connectors, connect } = useConnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openConnectModal } = useConnectModal();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK",
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-white transition-all dark:bg-neutral-900">
      <nav
        className="container mx-auto flex items-center justify-between p-4 text-neutral-900 dark:text-white lg:px-8"
        aria-label="Navbar"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-1">
            <div className="text-lg font-semibold">noblocks</div>
            <PaycrestLogo className="size-3" />
          </Link>
        </div>

        <div className="flex gap-4 text-sm font-medium">
          {!account.isConnected ? (
            <>
              <button
                type="button"
                className={secondaryBtnClasses}
                onClick={createWallet}
              >
                Create wallet
              </button>

              {openConnectModal && (
                <button
                  type="button"
                  className={primaryBtnClasses}
                  onClick={openConnectModal}
                >
                  Connect wallet
                </button>
              )}
            </>
          ) : (
            <>
              <WalletDetails />

              <NetworksDropdown
                id="person"
                selectedId="1"
                // onSelect={handleSelect}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
