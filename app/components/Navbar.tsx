"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ThemeSwitch } from "./ThemeSwitch";
import { WalletButtons } from "./WalletButtons";
import { PaycrestLogo } from "./ImageAssets";

export const Navbar = () => {
  const account = useAccount();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

        <div className="flex flex-1 items-center justify-end gap-3 text-sm">
          <WalletButtons />
          <div className={`${account.isConnected ? "" : "hidden lg:block"}`}>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};
