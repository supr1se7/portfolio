"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ViewCounter = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const currentViews = parseInt(localStorage.getItem('pageViews') ?? '0');
      const newViews = currentViews + 1;
      localStorage.setItem('pageViews', newViews.toString());
      setViews(newViews);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-white/80 z-50"
    >
      <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
      <span className="text-sm font-medium">{views} visualizações</span>
    </motion.div>
  );
};
