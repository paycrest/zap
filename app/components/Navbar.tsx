"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeSwitch } from "./ThemeSwitch";
import { PaycrestLogo } from "./ImageAssets";
import { AnimatedComponent, slideInOut } from "./AnimatedComponents";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="sticky left-0 top-0 z-10 w-full bg-white/20 backdrop-blur dark:bg-neutral-900/80 transition-colors">
      <AnimatedComponent variant={slideInOut} delay={0.2}>
        <nav
          className="mx-auto flex items-center justify-between py-4"
          aria-label="Navbar"
        >
          <Link href="/" className="flex items-center gap-1">
            <div className="text-lg font-semibold">Zap</div>
            <PaycrestLogo />
          </Link>

          <ThemeSwitch />
        </nav>
      </AnimatedComponent>
    </header>
  );
};
