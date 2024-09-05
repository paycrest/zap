"use client";
import { motion } from "framer-motion";
import { type ReactNode, useState } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const tooltipVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export const Tooltip = ({ message, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="group relative flex flex-col items-center">
      <span
        className="flex justify-center"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        exit="hidden"
        variants={tooltipVariants}
        className="absolute bottom-6 flex flex-col items-center font-normal transition-opacity duration-300 ease-in-out group-hover:flex"
      >
        <span className="relative z-50 w-52 max-w-full break-words rounded-xl bg-gray-100 p-3 px-4 text-center text-xs text-neutral-900 shadow-lg dark:bg-neutral-800 dark:text-white/80">
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-100 shadow-lg dark:bg-neutral-800" />
      </motion.div>
    </div>
  );
};
