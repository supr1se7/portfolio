"use client";

import { motion } from "framer-motion";

export const CreativeLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="relative w-48 h-48">
        <motion.div
          className="absolute inset-0 border-t-4 border-[#1DB954] rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-2 border-t-4 border-white rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
            alt="Logo"
            className="w-24 h-24 rounded-full object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-xl font-bold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Carregando...
        </motion.div>
      </div>
    </div>
  );
};
