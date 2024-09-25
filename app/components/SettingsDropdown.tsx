"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { useOutsideClick } from "../hooks";
import {
  CopyIcon,
  LogoutIcon,
  PrivateKeyIcon,
  SettingsIcon,
  WalletIcon,
} from "./ImageAssets";
import { dropdownVariants } from "./AnimatedComponents";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "../utils";
import { PiCheck } from "react-icons/pi";

export const SettingsDropdown = () => {
  const { user, logout } = usePrivy();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user?.wallet?.address ?? "");
    setIsAddressCopied(true);
    setTimeout(() => setIsAddressCopied(false), 2000);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label="Wallet details"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:bg-neutral-800 dark:focus-visible:ring-offset-neutral-900"
      >
        <SettingsIcon className="fill-gray-500 dark:fill-none" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={dropdownVariants}
          aria-label="Dropdown menu"
          className="absolute right-0 z-10 mt-4 min-w-48 max-w-full space-y-4 overflow-hidden rounded-xl bg-gray-50 shadow-xl dark:bg-neutral-800"
        >
          <ul
            role="menu"
            aria-labelledby="settings-dropdown"
            aria-orientation="vertical"
            className="text-sm font-light text-black dark:text-white/80"
          >
            <li
              role="menuitem"
              className="flex cursor-pointer items-center justify-between px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <div className="flex items-center gap-2.5">
                <WalletIcon />
                <p>{shortenAddress(user?.wallet?.address ?? "")}</p>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                title="Copy wallet address"
              >
                {isAddressCopied ? (
                  <PiCheck className="size-4" />
                ) : (
                  <CopyIcon className="size-4 transition hover:fill-white/20" />
                )}
              </button>
            </li>
            <li
              role="menuitem"
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <PrivateKeyIcon />
              <p>Export Private Key</p>
            </li>
            <li
              role="menuitem"
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-neutral-700"
              onClick={logout}
            >
              <LogoutIcon />
              <p>Disconnect</p>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};
