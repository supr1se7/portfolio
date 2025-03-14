"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { toPng } from "html-to-image";
import {
  IconDownload,
  IconPhoto,
  IconTextPlus,
  IconTrash,
} from "@tabler/icons-react";

interface MemeText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

export const MemeGenerator = () => {
  const [memeImage, setMemeImage] = useState<string>("");
  const [texts, setTexts] = useState<MemeText[]>([]);
  const memeRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMemeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    const newText: MemeText = {
      id: Date.now().toString(),
      text: "Digite aqui",
      x: 50,
      y: 50,
      fontSize: 32,
      color: "#ffffff",
    };
    setTexts([...texts, newText]);
  };

  const updateText = (id: string, newText: string) => {
    setTexts(
      texts.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const removeText = (id: string) => {
    setTexts(texts.filter((t) => t.id !== id));
  };

  const downloadMeme = async () => {
    if (memeRef.current) {
      try {
        const dataUrl = await toPng(memeRef.current);
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Erro ao gerar imagem:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-8 rounded-xl shadow-2xl w-[800px]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Meme Generator 9000</h2>
          <div className="flex gap-4">
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2"
            >
              <IconPhoto size={20} />
              Escolher Imagem
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addText}
              className="bg-accent text-accent-foreground px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <IconTextPlus size={20} />
              Adicionar Texto
            </motion.button>
          </div>
        </div>

        <div
          ref={memeRef}
          className="relative bg-muted rounded-lg overflow-hidden"
          style={{ minHeight: "400px" }}
        >
          {memeImage && (
            <img
              src={memeImage}
              alt="Meme base"
              className="w-full h-full object-contain"
            />
          )}
          {texts.map((text) => (
            <Draggable key={text.id} defaultPosition={{ x: text.x, y: text.y }}>
              <div className="absolute cursor-move">
                <div className="group relative">
                  <input
                    type="text"
                    value={text.text}
                    onChange={(e) => updateText(text.id, e.target.value)}
                    className="bg-transparent border-2 border-white rounded px-2 py-1 text-white text-4xl font-bold text-center outline-none"
                    style={{
                      fontSize: `${text.fontSize}px`,
                      color: text.color,
                      textShadow: "2px 2px 0 #000",
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeText(text.id)}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconTrash size={20} />
                  </motion.button>
                </div>
              </div>
            </Draggable>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadMeme}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-bold"
          >
            <IconDownload size={24} />
            Baixar Meme
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
