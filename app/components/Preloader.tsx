"use client";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none fixed inset-0 z-50 grid min-h-screen place-items-center gap-4 bg-white dark:bg-neutral-900"
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
            className="loader"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
