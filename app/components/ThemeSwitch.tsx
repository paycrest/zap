import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const iconAnimation = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.2 },
};

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-center rounded-full border p-1.5 border-gray-300 dark:border-white/20"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === "light" ? (
          <motion.div {...iconAnimation}>
            <FiSun className="size-4 text-gray-400 dark:text-white/50" />
          </motion.div>
        ) : (
          <motion.div {...iconAnimation}>
            <FiMoon className="size-4 text-gray-400 dark:text-white/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
