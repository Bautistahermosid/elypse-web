import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const tickets = [
  { id: 'OT-2045', asset: 'Turbina K-9', priority: 'Urgente', status: 'En Proceso', time: '14:20' },
  { id: 'OT-2046', asset: 'Compresor Sigma', priority: 'Normal', status: 'Pendiente', time: '15:10' },
  { id: 'OT-2047', asset: 'Brazo Robótico X-2', priority: 'Alta', status: 'Planificado', time: 'Mañana' },
];

export const Maintenance = () => {
  return (
    <section id="maintenance" className="py-40 px-8 md:px-24 bg-bg relative overflow-hidden border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
        <div className="lg:w-1/2 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-small mb-6 block text-muted">01 / Operations</span>
            <h2 className="text-5xl md:text-7xl font-semibold text-ink tracking-tighter leading-[0.9] mb-8">
              Mantenimiento <br />
              <span className="text-accent font-editorial">de Alta Precisión</span>
            </h2>
            <p className="text-ink/40 text-lg leading-relaxed max-w-lg mb-10 font-light">
              Digitalice cada orden de trabajo. Desde el preventivo hasta el correctivo, Elypse centraliza la planificación para maximizar el tiempo de actividad.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Predictivo', desc: 'IA de análisis profundo' },
                { title: 'Tiempo Real', desc: 'Telemetría instantánea' },
                { title: 'Trazabilidad', desc: 'Audit logs completos' },
                { title: 'Automatización', desc: 'Flujos auto-gestionados' }
              ].map((item, i) => (
                <div key={i} className="hud-panel p-6 group cursor-pointer hover:bg-accent/5 transition-colors">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-accent mb-2 group-hover:text-ink transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-muted font-medium tracking-wide uppercase leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel p-8 md:p-12 shadow-2xl"
          >
            <div className="scan-line" />
            {/* Minimalist Dashboard UI */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-ink font-medium text-lg flex items-center gap-2">
                <FileText size={20} className="text-accent" />
                Órdenes Recientes
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-ink/40">Live Feed</span>
              </div>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket, i) => (
                <motion.div 
                  key={ticket.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="bg-bg/50 border border-border-subtle rounded-xl p-4 flex items-center justify-between hover:bg-accent/10 transition-colors group/row"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      ticket.priority === 'Urgente' ? "bg-error/10 text-error" : "bg-accent/10 text-accent"
                    )}>
                      {ticket.priority === 'Urgente' ? <AlertCircle size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-ink/30">{ticket.id}</p>
                      <h4 className="text-sm font-medium text-ink/80 group-hover/row:text-ink transition-colors">{ticket.asset}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-ink/60 mb-1">{ticket.status}</p>
                    <p className="text-[10px] text-ink/20 uppercase tracking-widest">{ticket.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative data lines */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
