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
  { icon: IconHome, text: "Início" },
  { icon: IconSearch, text: "Buscar" },
  { icon: IconLibrary, text: "Sua Biblioteca" },
];

const playlists = [
  "Músicas Curtidas",
  "Suas Músicas 2023",
  "Descobertas da Semana",
  "Radar de Novidades",
  "Mix Diário 1",
];

export const SpotifyLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [play, { stop, sound }] = useSound("/music.mp3", {
    volume,
    onend: () => {
      setIsPlaying(false);
      setProgress(0);
    },
  });

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        const time = sound.seek();
        const duration = sound.duration();
        setProgress((time / duration) * 100);
      }, 100);

      return () => {
        clearInterval(interval);
        stop();
      };
    }
  }, [sound, stop]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sound) {
      const newProgress = parseFloat(e.target.value);
      const duration = sound.duration();
      sound.seek((newProgress / 100) * duration);
      setProgress(newProgress);
    }
  };

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
        <div className="flex-1 bg-gradient-to-b from-[#535353] to-[#121212] overflow-y-auto flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl w-full"
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-[80px] h-[80px] rounded-full overflow-hidden"
              >
                <img
                  src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
                  alt="supr1se"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold mb-2">supr1se</h1>
                <p className="text-gray-400 text-lg">@supr1se • 777</p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#181818] rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="h-[400px]">
                <img
                  src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/e2e5a40f009e8d6c5fd0e63cb7eb9b71.jpg"
                  alt="Capa do álbum"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">supr1se - Faixa Atual</h3>
                <p className="text-gray-400">Álbum • 2024</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Player */}
      <div className="h-28 bg-black border-t border-[#282828] px-8 flex items-center justify-between">
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
            <h4 className="font-semibold">Faixa Atual</h4>
            <p className="text-gray-400 text-sm">supr1se • Álbum</p>
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
          <div className="w-full max-w-[600px] flex items-center gap-2 text-xs text-gray-400">
            <span>{sound ? Math.floor(sound.seek()) : "0:00"}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span>{sound ? Math.floor(sound.duration()) : "0:00"}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="w-[300px] flex items-center justify-end gap-2">
          <IconVolume size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};
