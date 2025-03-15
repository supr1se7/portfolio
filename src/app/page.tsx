"use client";

import { PCSpecs } from "@/components/PCSpecs";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#313338]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#5865F2_0%,_transparent_70%)] opacity-10" />
      
      <div className="pt-20 pb-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Minha Setup
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#B9BBBE]"
        >
          Configuração completa do meu PC Gamer
        </motion.p>
      </div>

      <PCSpecs />
    </main>
  );
}
