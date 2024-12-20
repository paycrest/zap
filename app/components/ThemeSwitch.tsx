"use client";

import { trackEvent } from "@/hooks/analytics";
import { useTheme } from "next-themes";
import { useState, useEffect, type ReactElement } from "react";

import { FiSun, FiMoon } from "react-icons/fi";

type IconButtonProps = {
  icon: ReactElement;
  onClick: () => void;
  isActive: boolean;
};

const IconButton = ({ icon, onClick, isActive }: IconButtonProps) => (
  <button
    type="button"
    className={`flex cursor-pointer items-center justify-center rounded-full border p-1.5 transition-all ${
      isActive ? "border-gray-300 dark:border-white/20" : "border-transparent"
    }`}
    onClick={onClick}
    title={`Switch to ${isActive ? "dark" : "light"} mode`}
  >
    {icon}
  </button>
);

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between gap-2 rounded-full border border-gray-300 p-1.5 transition-all dark:border-white/20">
      <IconButton
        icon={<FiSun className="h-auto w-4 text-gray-400 dark:text-white/50" />}
        onClick={() => {
          setTheme("light");
          trackEvent("cta_clicked", {
            cta: "Theme toggle",
            theme: "light",
            position: "Navbar",
          });
        }}
        isActive={resolvedTheme === "light"}
      />
      <IconButton
        icon={
          <FiMoon className="h-auto w-4 text-gray-400 dark:text-white/50" />
        }
        onClick={() => {
          setTheme("dark");
          trackEvent("cta_clicked", { cta: "Theme toggle", theme: "dark" });
        }}
        isActive={resolvedTheme === "dark"}
      />
    </div>
  );
};
