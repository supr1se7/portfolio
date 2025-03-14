"use client";

import { MemeGenerator } from "@/components/MemeGenerator";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-foreground mb-4">
          Meme Generator 9000
        </h1>
        <p className="text-xl text-muted-foreground">
          Crie memes épicos em segundos! 🚀
        </p>
      </motion.div>

      <MemeGenerator />
    </main>
  );
}
