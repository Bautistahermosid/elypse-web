import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Calendar, MessageSquare, Cpu, MapPin, Zap } from 'lucide-react';

const agents = [
  {
    title: 'Agente Planificador',
    desc: 'Optimización autónoma de logística, turnos y rutas de mantenimiento.',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    title: 'Asistente Virtual',
    desc: 'Soporte inteligente por voz y texto para asistencia técnica inmediata en planta.',
    icon: MessageSquare,
    color: 'text-emerald-500'
  },
  {
    title: 'Agente de Maquinaria',
    desc: 'Gemelos digitales entrenados específicamente en el ADN técnico de cada activo.',
    icon: Cpu,
    color: 'text-purple-500'
  },
  {
    title: 'Agente de Área',
    desc: 'Inteligencia contextual sobre zonas críticas, seguridad y flujo de materiales.',
    icon: MapPin,
    color: 'text-orange-500'
  }
];

export const IndustrialAI = () => {
  return (
    <section id="agents" className="py-40 px-12 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-24 mb-20">
          <div className="lg:w-1/2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="label-small text-muted mb-6 block">05 / Neural Agents</span>
              <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter text-ink leading-[0.85] mb-10">
                Agentes <br />
                <span className="font-editorial text-accent">Inteligentes.</span>
              </h2>
              <p className="text-ink/50 text-xl font-light leading-relaxed">
                Elypse no es solo software; es un ecosistema de agentes entrenados para ser el <span className="text-ink font-medium italic">segundo cerebro</span> de su personal industrial. Especialización pura para una ejecución sin fallos.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-[0.5px] border-ink/10 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-10 border-[0.5px] border-ink/10 rounded-full"
               />
               
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="w-48 h-48 hud-panel flex items-center justify-center shadow-3xl relative z-10"
               >
                  <BrainCircuit size={72} className="text-ink" strokeWidth={0.5} />
                  <motion.div 
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-accent/10 rounded-[40px] blur-2xl"
                  />
               </motion.div>
               
               {/* Orbital labels */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 px-4 py-2 glass-panel border border-border-subtle rounded-full text-[9px] uppercase tracking-widest font-bold text-ink bg-bg/50 backdrop-blur-md">
                 Multi-Agent Orchestrator
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="hud-panel p-8 hover:-translate-y-1 transition-transform group cursor-pointer"
            >
              <div className={`w-12 h-12 bg-card rounded-sm flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent group-hover:text-bg transition-colors duration-500`}>
                <agent.icon size={22} strokeWidth={1.5} className="text-muted group-hover:text-bg" />
              </div>
              <h4 className="text-sm font-bold text-ink mb-4 uppercase tracking-widest">{agent.title}</h4>
              <p className="text-sm text-ink/50 font-light leading-relaxed">
                {agent.desc}
              </p>
              
              <div className="mt-8 pt-6 border-t border-border-subtle flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Activo</span>
                 <Zap size={14} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

