"use client";

import { AnimatedText } from "@/components/AnimatedText";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
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
      
      <section className="h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-32 h-32 rounded-full overflow-hidden mb-8"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <AnimatedText
          text="Olá, eu sou um Desenvolvedor"
          className="text-4xl font-bold text-primary mb-4 text-center"
        />
        
        <AnimatedText
          text="Criando experiências digitais únicas"
          className="text-xl text-muted-foreground mb-8 text-center"
        />
        
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

      <section className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedText
            text="Projetos em Destaque"
            className="text-3xl font-bold text-primary mb-12 text-center"
          />
          
          <div className="grid gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">Projeto {index + 1}</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
