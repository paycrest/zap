"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { NoblocksLogo } from "./ImageAssets";
import { AnimatedComponent, slideInOut } from "./AnimatedComponents";

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="sticky left-0 top-0 z-10 w-full bg-white dark:bg-neutral-900 transition-colors">
      <AnimatedComponent variant={slideInOut} delay={0.2}>
        <nav
          className="mx-auto flex items-center justify-between py-10 rounded-2xl"
          aria-label="Navbar"
        >
          <Link href="/">
            <NoblocksLogo />
          </Link>
        </nav>
      </AnimatedComponent>
    </header>
  );
};
