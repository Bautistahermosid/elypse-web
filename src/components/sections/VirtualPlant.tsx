import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Maximize2 } from 'lucide-react';
import { ScrollModel3D } from '../ScrollModel3D';

export const VirtualPlant = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="virtual-plant" ref={containerRef} className="bg-bg relative h-[300vh] border-b border-border-subtle">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-12 overflow-hidden">
        <ScrollModel3D scrollYProgress={scrollYProgress} />
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div style={{ scale, opacity }} className="lg:col-span-5 space-y-10">
            <div>
              <span className="label-small mb-4 block text-muted">04 / Virtual Presence</span>
              <h2 className="text-5xl md:text-7xl font-semibold text-ink tracking-tighter leading-none mb-8">
                Digital <br />
                <span className="font-editorial text-accent">Twin.</span>
              </h2>
            </div>
            
            <p className="text-ink/40 text-xl font-light leading-relaxed">
              Navegue por su planta en un entorno inmersivo. Acceda a sensores y estados de maquinaria directamente sobre el modelo 3D de sus activos.
            </p>
            

          </motion.div>

          <motion.div 
             style={{ opacity }}
             className="relative aspect-video hud-panel shadow-2xl group"
          >
             <div className="scan-line" />
             {/* Abstract Wireframe Visual */}
             <div className="absolute inset-0 p-8">
                <div className="w-full h-full border border-white/5 rounded-2xl relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                   
                   {/* Simulated plant cubes */}
                   <div className="absolute bottom-10 left-10 w-20 h-12 border border-accent/30 bg-accent/5" />
                   <div className="absolute bottom-24 left-32 w-16 h-24 border border-border-subtle bg-bg/5" />
                   <div className="absolute bottom-10 right-20 w-32 h-16 border border-border-subtle bg-bg/5" />
                   
                   {/* Overlay technical data */}
                   <div className="absolute top-6 left-6 p-3 bg-bg/40 backdrop-blur-md border border-border-subtle rounded-lg">
                      <p className="text-[8px] text-ink/30 uppercase tracking-widest mb-1">Sector 01 // Status</p>
                      <div className="flex gap-1 items-center">
                         <div className="w-1 h-1 rounded-full bg-success animate-pulse" />
                         <span className="text-[10px] text-ink">Nominal</span>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="p-2 bg-ink/10 rounded-lg text-ink/40 hover:bg-ink/20 transition-colors cursor-pointer"><Maximize2 size={16} /></div>
             </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
