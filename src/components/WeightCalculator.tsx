"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IconScale, IconRuler, IconWeight } from "@tabler/icons-react";

export const WeightCalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<{
    imc: number;
    classification: string;
    idealWeight: number;
  } | null>(null);

  const calculateIMC = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const imc = weightInKg / (heightInMeters * heightInMeters);
      const idealWeight = 21.7 * (heightInMeters * heightInMeters);

      let classification = "";
      if (imc < 18.5) classification = "Abaixo do peso";
      else if (imc < 24.9) classification = "Peso normal";
      else if (imc < 29.9) classification = "Sobrepeso";
      else if (imc < 34.9) classification = "Obesidade Grau I";
      else if (imc < 39.9) classification = "Obesidade Grau II";
      else classification = "Obesidade Grau III";

      setResult({
        imc,
        classification,
        idealWeight,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-8 rounded-lg shadow-2xl border border-primary/20 w-[600px]"
    >
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-primary mb-2 font-mono">Altura (cm)</label>
          <div className="relative">
            <IconRuler className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-secondary p-3 pl-12 rounded-lg text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="170"
            />
          </div>
        </div>
        <div>
          <label className="block text-primary mb-2 font-mono">Peso (kg)</label>
          <div className="relative">
            <IconWeight className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-secondary p-3 pl-12 rounded-lg text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="70"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={calculateIMC}
        className="w-full bg-primary text-primary-foreground font-mono py-3 rounded-lg mb-8 flex items-center justify-center gap-2"
      >
        <IconScale size={20} />
        Calcular
      </motion.button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-primary font-mono mb-2">Seu IMC</h3>
            <p className="text-4xl font-bold text-primary font-mono">
              {result.imc.toFixed(1)}
            </p>
            <p className="text-muted-foreground font-mono">
              {result.classification}
            </p>
          </div>

          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-primary font-mono mb-2">Peso Ideal</h3>
            <p className="text-4xl font-bold text-primary font-mono">
              {result.idealWeight.toFixed(1)} kg
            </p>
            <p className="text-muted-foreground font-mono">
              Baseado em um IMC ideal de 21.7
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
