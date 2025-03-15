"use client";

import { motion } from "framer-motion";
import { CreativeLoader } from "./CreativeLoader";
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
import YouTube from "react-youtube";

const menuItems = [
  { icon: IconHome, text: "Início" },
  { icon: IconSearch, text: "Buscar" },
  { icon: IconLibrary, text: "Sua Biblioteca" },
];

const portfolioSections = [
  "Sobre Mim",
  "Projetos",
  "Experiência",
  "Tecnologias",
  "Contato",
];

export const SpotifyLayout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videos = [
    "9Zmpqwcmy2E",
    "qS8Xa_-VWyI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && isPlaying) {
        const current = player.getCurrentTime();
        const total = player.getDuration();
        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume * 100); // YouTube API espera volume de 0-100
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      const newProgress = parseFloat(e.target.value);
      const newTime = (newProgress / 100) * duration;
      player.seekTo(newTime);
      setProgress(newProgress);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const onReady = (event: any) => {
    const player = event.target;
    setPlayer(player);
    player.setVolume(volume * 100);
    player.playVideo();
    // Atrasa a remoção do loading por 2 segundos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const onStateChange = (event: any) => {
    // YT.PlayerState.PLAYING = 1
    // YT.PlayerState.ENDED = 0
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 0) {
      handleNextTrack();
    } else {
      // Não alterar o estado isPlaying para outros eventos
      // Isso mantém o estado anterior quando carrega nova música
    }
  };

  const handlePreviousTrack = () => {
    if (player) {
      const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
      setCurrentVideoIndex(prevIndex);
      // Usar cueVideoById em vez de loadVideoById mantém o estado de reprodução
      if (isPlaying) {
        player.loadVideoById(videos[prevIndex]);
      } else {
        player.cueVideoById(videos[prevIndex]);
        player.playVideo();
      }
    }
  };

  const handleNextTrack = () => {
    if (player) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
      // Usar cueVideoById em vez de loadVideoById mantém o estado de reprodução
      if (isPlaying) {
        player.loadVideoById(videos[nextIndex]);
      } else {
        player.cueVideoById(videos[nextIndex]);
        player.playVideo();
      }
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-white flex flex-col">
      {isLoading && <CreativeLoader />}
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="w-64 bg-black p-6 flex flex-col gap-6"
        >
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
            <h2 className="text-gray-400 text-sm mb-4">PORTFÓLIO</h2>
            <div className="space-y-3">
              {portfolioSections.map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-gray-400 hover:text-white transition-colors text-sm w-full text-left"
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main content area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex-1 bg-gradient-to-b from-[#535353] to-[#121212] overflow-y-auto flex flex-col items-center justify-center p-8"
        >
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
              <div className="w-[350px] h-[350px] mx-auto">
                <img
                  src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/0d74188f7edf273d797b80a6824b84b4.jpg"
                  alt="Capa do álbum"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {["Dinheiro não aceita desaforo.", "Ou você faz ele trabalhar pra você,", "ou vai passar a vida trabalhando por ele."].map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.8
                      }}
                      className={`text-xl ${index === 0 ? 'font-bold text-[#1DB954]' : 'text-gray-400'}`}
                    >
                      {text}
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Player */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="h-28 bg-black border-t border-[#282828] px-8 flex items-center justify-between"
      >
        {/* Current track */}
        <div className="flex items-center gap-4 w-[300px]">
          <div className="w-14 h-14 rounded overflow-hidden">
            <img
              src="https://pre-built-images.s3.amazonaws.com/webapp-uploads/f73a68cac47a0b62dc3ac2ac279ca7d6.jpg"
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
              onClick={handlePreviousTrack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IconPlayerSkipBack size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (player) {
                  if (isPlaying) {
                    player.pauseVideo();
                  } else {
                    player.playVideo();
                  }
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
              onClick={handleNextTrack}
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
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="absolute top-[-380px] opacity-0">
            <YouTube
              videoId={videos[currentVideoIndex]}
              opts={{
                width: "1",
                height: "1",
                playerVars: {
                  autoplay: 1,
                },
              }}
              onReady={onReady}
              onStateChange={onStateChange}
            />
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
            className="w-24 h-1 bg-[#4d4d4d] rounded-full appearance-none cursor-pointer 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:mt-[-4px]
              hover:bg-[#666666]
              relative
              before:absolute
              before:content-['']
              before:left-0
              before:top-0
              before:h-full
              before:bg-white
              before:rounded-full"
            style={{
              backgroundSize: `${volume * 100}% 100%`,
              backgroundImage: 'linear-gradient(#fff, #fff)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
