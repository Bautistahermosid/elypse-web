import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-left px-12 overflow-hidden bg-bg">
      <div className="z-10 w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-[0.3em] w-fit font-mono">
              Industry 4.0 Standard
            </div>
            <h1 className="editorial-title font-editorial mb-8 text-ink">
              Elypse<span className="text-accent animate-pulse">_</span>
            </h1>
            <p className="text-lg md:text-xl text-ink/50 max-w-lg font-light leading-relaxed mb-12">
              Software inteligente de mantenimiento predictivo y gestión de activos para la optimización de operaciones industriales en tiempo real.
            </p>
          </motion.div>
        </div>

        <div className="hidden lg:col-span-6 lg:flex flex-col items-end relative h-full">
           {/* Space for the 3D element which is fixed in background */}
           <div className="absolute right-0 top-1/4 hud-panel p-6 w-64 translate-x-12 border-border-subtle cursor-pointer">
              <div className="scan-line" />
              <div className="label-small mb-3 text-accent flex items-center justify-between">
                <span>Operational Health</span>
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              </div>
              <div className="text-3xl font-light text-ink font-mono tracking-tight">98.4%</div>
              <div className="w-full bg-ink/10 h-[2px] mt-4 overflow-hidden relative">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "98.4%" }}
                   transition={{ duration: 2, delay: 0.5 }}
                   className="bg-accent h-full shadow-[0_0_10px_rgba(94,106,210,0.5)]" 
                 />
              </div>
           </div>

           <div className="absolute left-0 bottom-1/4 hud-panel p-6 w-64 -translate-x-12 border-border-subtle cursor-pointer">
              <div className="scan-line" />
              <div className="label-small mb-3 text-ink/40">Anomaly Detection</div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
                <span className="text-xs font-mono text-success uppercase tracking-wider">Nominal</span>
              </div>
              <div className="font-mono text-[9px] text-accent/70 uppercase flex justify-between">
                <span>SYS_REQ_FREQ:</span>
                <span>0.42Hz</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
