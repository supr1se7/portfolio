"use client";

import { motion } from "framer-motion";

export const DiscordCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[300px] bg-card rounded-lg overflow-hidden shadow-2xl border border-primary/20 relative group"
    >
      <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000')] bg-cover bg-center opacity-50" />
      </div>
      
      <div className="relative -mt-16 px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 rounded-full border-4 border-card overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256"
            alt="supr1se"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-primary">supr1se</h2>
          <motion.div
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-3 h-3 rounded-full bg-green-500"
          />
        </div>
        
        <div className="space-y-2 text-muted-foreground">
          <p className="font-mono">&gt; Hacker | Developer | Community Leader</p>
          <p className="font-mono">&gt; Discord Community: 1000+ members</p>
          <p className="font-mono">&gt; Status: Online</p>
        </div>
      </div>

      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 to-accent/50 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};
