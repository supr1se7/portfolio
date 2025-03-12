"use client";

import { AnimatedText } from "@/components/AnimatedText";
import { WeightCalculator } from "@/components/WeightCalculator";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconCode, IconUsers, IconTerminal2 } from "@tabler/icons-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_50%)] opacity-10" />
        
        <AnimatedText
          text="Calculadora de Peso Ideal"
          className="text-6xl font-bold text-primary mb-4 text-center font-mono"
        />
        
        <AnimatedText
          text="Descubra seu IMC e peso ideal"
          className="text-xl text-muted-foreground mb-12 text-center font-mono"
        />

        <WeightCalculator />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6"
        >
          {[
            { icon: IconBrandGithub, href: "https://github.com" },
            { icon: IconBrandLinkedin, href: "https://linkedin.com" },
            { icon: IconMail, href: "mailto:contato@exemplo.com" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-secondary text-primary hover:bg-primary hover:text-secondary transition-colors"
            >
              <item.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section className="min-h-screen py-20 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_50%)] opacity-10" />
        
        <div className="max-w-4xl mx-auto">
          <AnimatedText
            text="Community Stats"
            className="text-3xl font-bold text-primary mb-12 text-center font-mono"
          />
          
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: IconCode, title: "Lines of Code", value: "100K+" },
              { icon: IconUsers, title: "Community Members", value: "1000+" },
              { icon: IconTerminal2, title: "Hacks Completed", value: "50+" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card p-6 rounded-lg shadow-lg border border-primary/20 group hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col items-center text-center">
                  <item.icon size={48} className="text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary font-mono">{item.title}</h3>
                  <p className="text-4xl font-bold text-muted-foreground font-mono">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
