import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-12 overflow-hidden bg-bg">
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-[0.3em] w-fit font-mono">
            Industry 4.0 Standard
          </div>
          <h1 className="editorial-title font-editorial mb-8 text-ink text-center">
            Elypse<span className="text-accent animate-pulse">_</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/50 max-w-2xl font-light leading-relaxed mb-12 text-center">
            Software inteligente de mantenimiento predictivo y gestión de activos para la optimización de operaciones industriales en tiempo real.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
