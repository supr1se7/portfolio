"use client";

import { motion } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};
