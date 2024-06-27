"use client";
import { TiInfo } from "react-icons/ti";
import { AnimatePresence, motion } from "framer-motion";

export const InputError = ({ message }: { message: string | any }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1 text-xs font-medium text-rose-500"
    >
      <TiInfo />
      <p>{message}</p>
    </motion.div>
  </AnimatePresence>
);
