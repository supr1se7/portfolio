"use client";

import { motion } from "framer-motion";
import {
  IconHome,
  IconSearch,
  IconLibrary,
  IconPlaylist,
  IconVolume,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconRepeat,
  IconArrowsShuffle,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useSound } from "use-sound";

const menuItems = [
  { icon: IconHome, text: "Home" },
  { icon: IconSearch, text: "Search" },
  { icon: IconLibrary, text: "Your Library" },
];

const playlists = [
  "Liked Songs",
  "Your Top Songs 2023",
  "Discover Weekly",
  "Release Radar",
  "Daily Mix 1",
];

export const SpotifyLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound("/music.mp3", {
    volume: 0.5,
    onend: () => setIsPlaying(false),
  });

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return (
    <div className="h-screen bg-[#121212] text-white flex flex-col">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-black p-6 flex flex-col gap-6">
          {/* Menu */}
          <div className="space-y-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.text}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-full"
              >
                <item.icon size={24} />
                <span>{item.text}</span>
              </motion.button>
            ))}
          </div>

          {/* Playlists */}
          <div className="flex-1">
            <h2 className="text-gray-400 text-sm mb-4">PLAYLISTS</h2>
            <div className="space-y-3">
              {playlists.map((playlist) => (
                <motion.button
                  key={playlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-gray-400 hover:text-white transition-colors text-sm w-full text-left"
                >
                  {playlist}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gradient-to-b from-[#535353] to-[#121212] p-8 overflow-y-auto">
          {/* Profile section */}
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-[100px] h-[100px] rounded-full overflow-hidden"
            >
              <img
                src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
                alt="supr1se"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold mb-2">supr1se</h1>
              <p className="text-gray-400">@supr1se • 777</p>
            </div>
          </div>

          {/* Recent activity */}
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          <div className="grid grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors"
              >
                <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                  <img
                    src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
                    alt="Album cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">Track {i + 1}</h3>
                <p className="text-gray-400 text-sm">supr1se</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="h-24 bg-black border-t border-[#282828] px-4 flex items-center justify-between">
        {/* Current track */}
        <div className="flex items-center gap-4 w-[300px]">
          <div className="w-14 h-14 rounded overflow-hidden">
            <img
              src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
              alt="Now playing"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">Current Track</h4>
            <p className="text-gray-400 text-sm">supr1se</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IconArrowsShuffle size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IconPlayerSkipBack size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (isPlaying) {
                  stop();
                  setIsPlaying(false);
                } else {
                  play();
                  setIsPlaying(true);
                }
              }}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
            >
              {isPlaying ? (
                <IconPlayerPause size={20} className="text-black" />
              ) : (
                <IconPlayerSkipForward size={20} className="text-black" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IconPlayerSkipForward size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IconRepeat size={20} />
            </motion.button>
          </div>
          <div className="w-full max-w-[600px] h-1 bg-[#4d4d4d] rounded-full">
            <div className="w-1/3 h-full bg-white rounded-full" />
          </div>
        </div>

        {/* Volume */}
        <div className="w-[300px] flex items-center justify-end gap-2">
          <IconVolume size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-[#4d4d4d] rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
