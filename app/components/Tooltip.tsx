"use client";
import { type ReactNode, useState } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

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

      <div
        className={`absolute bottom-6 flex flex-col items-center font-normal transition-opacity duration-300 ease-in-out group-hover:flex ${
          show
            ? "pointer-events-auto flex opacity-100"
            : "pointer-events-none hidden opacity-0"
        }`}
      >
        <span className="relative z-10 w-52 max-w-full break-words rounded-xl bg-gray-100 p-3 px-4 text-center text-xs text-gray-500 shadow-lg dark:bg-neutral-700 dark:text-white/50">
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-200 shadow-lg dark:bg-neutral-700" />
      </div>
    </div>
  );
};
