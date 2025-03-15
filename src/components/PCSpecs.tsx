"use client";

import { motion } from "framer-motion";
import {
  IconCpu,
  IconDeviceDesktop,
  IconDeviceTv,
  IconBrandAmd,
  IconArmchair,
} from "@tabler/icons-react";

export const PCSpecs = () => {
  const specs = [
    {
      icon: IconCpu,
      title: "Processador",
      value: "AMD Ryzen 5 5500",
      description: "6 cores, 12 threads",
    },
    {
      icon: IconBrandAmd,
      title: "Placa de Vídeo",
      value: "AMD RX 6600",
      description: "8GB GDDR6",
    },
    {
      icon: IconDeviceDesktop,
      title: "Placa Mãe",
      value: "A520M",
      description: "AMD Socket AM4",
    },
    {
      icon: IconDeviceTv,
      title: "Monitor",
      value: "TGT 180Hz",
      description: "Alta taxa de atualização",
    },
    {
      icon: IconArmchair,
      title: "Suporte Monitor",
      value: "Nibia Zimbo 100",
      description: "Braço Articulado",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        {specs.map((spec, index) => (
          <motion.div
            key={spec.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#232428] p-6 rounded-lg shadow-lg border border-[#5865F2]/20 hover:border-[#5865F2]/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-[#5865F2]/10 rounded-lg group-hover:bg-[#5865F2]/20 transition-colors">
                <spec.icon size={32} className="text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-[#B9BBBE] text-sm mb-1">{spec.title}</h3>
                <p className="text-white text-2xl font-bold mb-1">{spec.value}</p>
                <p className="text-[#B9BBBE] text-sm">{spec.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
