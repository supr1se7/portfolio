"use client";

import { DiscordProfile } from "@/components/DiscordProfile";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#313338] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#5865F2_0%,_transparent_70%)] opacity-10" />
      <DiscordProfile />
    </main>
  );
}
