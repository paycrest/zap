"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const LogoOutlineBg = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Image
        width={416}
        height={416}
        src={
          mounted && resolvedTheme === "dark"
            ? "/logo-outline-group-left-dark.svg"
            : "/logo-outline-group-left-light.svg"
        }
        alt=""
        className="fixed bottom-0 left-0 hidden transition-all sm:block"
        tabIndex={-1}
      />
      <Image
        width={416}
        height={416}
        src={
          mounted && resolvedTheme === "dark"
            ? "/logo-outline-group-right-dark.svg"
            : "/logo-outline-group-right-light.svg"
        }
        alt=""
        className="fixed bottom-0 right-0 hidden transition-all sm:block"
        tabIndex={-1}
      />
    </>
  );
};
