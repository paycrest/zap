"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  FarcasterIconDarkTheme,
  FarcasterIconLightTheme,
  GithubIconDarkTheme,
  GithubIconLightTheme,
  XIconDarkTheme,
  XIconLightTheme,
} from "./ImageAssets";

const SocialLink = ({
  href,
  title,
  LogoSvg,
}: {
  href: string;
  title: string;
  LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      <LogoSvg className="size-5 transition-opacity hover:opacity-70" />
    </a>
  );
};

const socialsDarkTheme = [
  {
    href: "https://warpcast.com/~/channel/paycrest",
    title: "Farcaster",
    LogoSvg: FarcasterIconDarkTheme,
  },
  {
    href: "https://github.com/paycrest",
    title: "GitHub",
    LogoSvg: GithubIconDarkTheme,
  },
  {
    href: "https://x.com/paycrest",
    title: "X",
    LogoSvg: XIconDarkTheme,
  },
];

const socialsLightTheme = [
  {
    href: "https://warpcast.com/~/channel/paycrest",
    title: "Farcaster",
    LogoSvg: FarcasterIconLightTheme,
  },
  {
    href: "https://github.com/paycrest",
    title: "GitHub",
    LogoSvg: GithubIconLightTheme,
  },
  {
    href: "https://x.com/paycrest",
    title: "X",
    LogoSvg: XIconLightTheme,
  },
];

export const Footer = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const socials =
    resolvedTheme === "dark" ? socialsDarkTheme : socialsLightTheme;

  return (
    <footer className="mt-8 flex w-full items-center justify-between border-t border-dashed border-gray-200 pb-6 pt-4 dark:border-white/10">
      <p className="text-xs font-medium">
        <span className="text-gray-500 dark:text-white/50">
          &copy; 2024 Powered by
        </span>{" "}
        <a
          href="https://paycrest.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 hover:underline dark:text-white/80"
        >
          Paycrest Protocol
        </a>
      </p>
      <div className="flex items-center justify-center gap-2">
        {socials.map((social) => (
          <SocialLink key={social.title} {...social} />
        ))}
      </div>
    </footer>
  );
};
