import React from 'react';
import { motion } from 'framer-motion';
import { Layers, MousePointer2, Plus, Zap, Box } from 'lucide-react';

const blocks = [
  { name: 'Sensor Temp', type: 'input' },
  { name: 'Válvula 01', type: 'output' },
  { name: 'Compresor', type: 'control' },
];

export const ScadaBuilder = () => {
  return (
    <section id="scada" className="py-40 px-8 md:px-24 bg-bg border-y border-border-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
        <div className="lg:col-span-12 mb-16">
           <span className="label-small mb-4 block">03 / Interface</span>
           <h2 className="text-5xl md:text-8xl font-semibold text-ink tracking-tighter leading-none">
             SCADA <span className="font-editorial text-accent">Builder.</span>
           </h2>
        </div>
        
        <div className="lg:col-span-5 space-y-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="space-y-6"
          >
            <p className="text-ink/40 text-xl font-light leading-relaxed">
              Diseñe interfaces de control industrial con la misma facilidad que una herramienta de diseño moderna. Sin necesidad de programación compleja.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <h4 className="label-small text-ink">Modular</h4>
                <p className="text-xs text-muted">Componentes pre-validados.</p>
              </div>
              <div className="space-y-2">
                <h4 className="label-small text-ink">Real-time</h4>
                <p className="text-xs text-muted">Baja latencia garantizada.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hud-panel shadow-3xl"
          >
            <div className="scan-line" style={{ animationDuration: '5s' }} />
            {/* Editor Toolbar */}
            <div className="bg-bg/50 border-b border-border-subtle p-4 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-ink/10" />
                  <div className="w-3 h-3 rounded-full bg-ink/10" />
                  <div className="w-3 h-3 rounded-full bg-ink/10" />
                </div>
                <span className="text-[10px] uppercase text-ink/30 font-medium tracking-widest">Elypse Builder // Project_Beta</span>
              </div>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-ink/10 rounded-lg transition-colors text-ink/40"><MousePointer2 size={16} /></button>
                 <button className="p-2 hover:bg-ink/10 rounded-lg transition-colors text-ink/40"><Layers size={16} /></button>
                 <button className="p-2 bg-accent rounded-lg text-ink"><Plus size={16} /></button>
              </div>
            </div>

            <div className="p-8 h-[400px] relative overflow-hidden flex items-center justify-center">
              {/* Visual Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="flex gap-8 items-center z-10">
                 {/* Drag and drop simulation nodes */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="p-4 bg-white/5 border border-white/10 rounded-xl w-32 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                 >
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] text-white/20">TEMP01</span>
                     <Box size={10} className="text-blue-500" />
                   </div>
                   <div className="h-1 bg-white/10 w-3/4 mb-1" />
                   <div className="h-1 bg-white/10 w-1/2" />
                 </motion.div>

                 <div className="w-16 h-[1px] bg-white/10 relative">
                   <motion.div 
                     animate={{ left: ["0%", "100%"] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500/20 rounded-full blur-md"
                   />
                 </div>

                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl w-40 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                 >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] text-blue-400 font-bold">LOGIC GATE</span>
                    </div>
                    <div className="space-y-2">
                       <div className="flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                         <div className="h-1 bg-blue-500/30 w-full" />
                       </div>
                       <div className="flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                         <div className="h-1 bg-white/10 w-full" />
                       </div>
                    </div>
                 </motion.div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute left-6 top-8 w-32 space-y-2">
                 {blocks.map((b, i) => (
                   <div key={i} className="p-2 bg-white/5 border border-white/5 rounded-lg text-[10px] text-white/50 uppercase tracking-widest flex justify-between items-center">
                     {b.name}
                     <div className="w-1 h-1 rounded-full bg-white/20" />
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
