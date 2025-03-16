"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "use-sound";
export const DiscordProfile = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, {
    stop
  }] = useSound("/music.mp3", {
    volume: 0.5,
    onend: () => setIsPlaying(false)
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      play();
      setIsPlaying(true);
    }
    return () => stop();
  }, [play, stop]);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="w-[320px] bg-[#232428] rounded-lg overflow-hidden shadow-2xl">
      <div className="h-24 bg-gradient-to-r from-[#5865F2] to-[#7289DA] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000')] bg-cover bg-center opacity-50" />
      </div>
      
      <div className="relative -mt-16 px-4">
        <motion.div whileHover={{
        scale: 1.05
      }} className="w-[100px] h-[100px] rounded-full border-[6px] border-[#232428] overflow-hidden">
          <img src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg" alt="supr1se" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="text-2xl font-bold text-white">supr1se</h2>
          <span className="text-[#B9BBBE]">777</span>
          <motion.img src="https://picsum.photos/200" alt="Discord Nitro" className="w-5 h-5 ml-1" whileHover={{
          scale: 1.2
        }} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3BA55D]" />
            <span className="text-[#B9BBBE] text-sm">Online</span>
          </div>
          
          <div className="bg-[#5865F2]/10 rounded px-2 py-1 inline-block">
            <span className="text-[#5865F2] text-sm font-medium">supr1se no topo</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => {
          if (isPlaying) {
            stop();
            setIsPlaying(false);
          } else {
            play();
            setIsPlaying(true);
          }
        }} className="bg-[#5865F2] text-white px-4 py-2 rounded text-sm font-medium">
            {isPlaying ? "Pausar Música" : "Tocar Música"}
          </motion.button>
        </div>
      </div>
    </motion.div>;
};