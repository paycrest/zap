"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import ThemeSwitch from "./ThemeSwitch";
import { WalletSetup } from "./WalletSetup";

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed left-0 top-0 w-full bg-white transition-all dark:bg-neutral-900">
      <nav
        className="container mx-auto flex items-center justify-between p-4 text-neutral-900 dark:text-white lg:px-8"
        aria-label="Navbar"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
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
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden text-sm lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-3">
          <WalletSetup />
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};
