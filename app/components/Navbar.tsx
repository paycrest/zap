"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ThemeSwitch } from "./ThemeSwitch";
import { WalletButtons } from "./WalletButtons";

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed left-0 top-0 z-40 w-full bg-white/20 backdrop-blur transition-all dark:bg-neutral-900/80">
      <nav
        className="container mx-auto flex items-center justify-between p-4 text-neutral-900 dark:text-white lg:px-8"
        aria-label="Navbar"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Zap by Paycrest</span>
            <Image
              className="h-7 w-auto"
              src={
                mounted && resolvedTheme === "dark"
                  ? "/zap-logo-dark-theme.svg"
                  : "/zap-logo-light-theme.svg"
              }
              alt=""
              width={48}
              height={48}
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 text-sm">
          <WalletButtons />
          <div className="hidden lg:block">
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};
