import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Zap, Target } from 'lucide-react';

const stats = [
  { label: 'OEE Global', value: '94.2%', trend: '+2.4%', icon: Target },
  { label: 'MTBF', value: '1,280h', trend: '+12%', icon: Clock },
  { label: 'Consumo Energético', value: '420 kWh', trend: '-5%', icon: Zap },
  { label: 'Disponibilidad', value: '98.5%', trend: '+0.8%', icon: TrendingUp },
];

import { Clock } from 'lucide-react';

export const Analytics = () => {
  return (
    <section id="analytics" className="py-40 px-8 md:px-24 bg-card relative overflow-hidden border-y border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-muted text-[10px] uppercase font-bold tracking-[0.3em] mb-6 block">02 / Analytics Core</span>
            <h2 className="text-5xl md:text-8xl font-semibold text-ink tracking-tighter leading-[0.85] mb-8">
              Analítica <br />
              <span className="font-editorial text-accent">de Precisión.</span>
            </h2>
            <p className="text-ink/50 text-xl font-light leading-relaxed">
              Visualice el rendimiento de su planta en tiempo real. Elypse le permite configurar sus propios parámetros y KPIs para una toma de decisiones informada.
            </p>
          </motion.div>
          
          <div className="flex gap-4">
             <button className="px-8 py-3 bg-bg text-ink text-[11px] uppercase tracking-widest font-bold hover:scale-105 transition-transform border border-border-subtle">
                Export Reports
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="hud-panel p-6 group cursor-pointer"
            >
              <h4 className="label-small text-muted mb-3">{stat.label}</h4>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-medium text-ink tracking-tighter">{stat.value}</span>
                <span className="text-success text-xs font-bold font-mono">
                  {stat.trend}
                </span>
              </div>
              <div className="w-full bg-border-subtle h-[1px] relative overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "70%" }}
                   transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                   className="absolute top-0 left-0 h-full bg-accent/20" 
                 />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 hud-panel p-16 text-ink flex flex-col lg:flex-row items-center justify-between gap-24 relative"
        >
          <div className="scan-line" style={{ animationDuration: '6s' }} />
          <div className="lg:w-1/2 space-y-10 z-10">
            <span className="label-small text-accent">Configuración</span>
            <h3 className="text-4xl md:text-6xl font-medium leading-[0.9] tracking-tighter">
              Diseño de Métricas <br />
              <span className="text-accent font-editorial">Sin Límites.</span>
            </h3>
            <p className="text-ink/40 text-xl font-light max-w-md">
              Arrastre y suelte para crear dashboards personalizados. Sin código, sin fricción, solo datos útiles.
            </p>
            <button className="bg-accent text-bg px-10 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_var(--color-accent)] cursor-pointer">
              Probar Editor
            </button>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
             {/* 1. Bar Chart */}
             <div className="h-32 hud-panel p-4 flex flex-col justify-between">
               <span className="text-[10px] font-mono text-muted uppercase">Producción (Q3)</span>
               <div className="flex items-end justify-between h-16 gap-1 mt-2">
                 {[40, 70, 45, 90, 60, 85, 30].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     whileInView={{ height: `${h}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     className="w-full bg-accent/80 rounded-t-sm"
                   />
                 ))}
               </div>
             </div>

             {/* 2. Line Chart */}
             <div className="h-32 hud-panel p-4 flex flex-col justify-between">
               <span className="text-[10px] font-mono text-muted uppercase">Eficiencia OEE</span>
               <div className="relative h-16 w-full mt-2">
                 <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                   <motion.path
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     d="M0,30 L20,15 L40,25 L60,5 L80,20 L100,0"
                     fill="none"
                     stroke="var(--color-accent)"
                     strokeWidth="2"
                     vectorEffect="non-scaling-stroke"
                   />
                   <motion.path
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 0.2 }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     d="M0,30 L20,15 L40,25 L60,5 L80,20 L100,0 L100,40 L0,40 Z"
                     fill="var(--color-accent)"
                   />
                 </svg>
               </div>
             </div>

             {/* 3. Pie/Donut Chart */}
             <div className="h-32 hud-panel p-4 flex flex-col justify-between items-center relative">
               <span className="text-[10px] font-mono text-muted uppercase self-start">Distribución Fallas</span>
               <div className="relative w-16 h-16 mt-2 flex items-center justify-center">
                 <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                   <circle cx="18" cy="18" r="16" fill="none" className="stroke-ink/10" strokeWidth="3" />
                   <motion.circle 
                     initial={{ strokeDasharray: "0, 100" }}
                     whileInView={{ strokeDasharray: "65, 100" }}
                     transition={{ duration: 1.5 }}
                     cx="18" cy="18" r="16" fill="none" className="stroke-accent" strokeWidth="3" 
                   />
                   <motion.circle 
                     initial={{ strokeDasharray: "0, 100" }}
                     whileInView={{ strokeDasharray: "20, 100" }}
                     transition={{ duration: 1.5, delay: 0.5 }}
                     strokeDashoffset="-65"
                     cx="18" cy="18" r="16" fill="none" className="stroke-warning" strokeWidth="3" 
                   />
                 </svg>
                 <span className="absolute text-[10px] font-bold text-ink">65%</span>
               </div>
             </div>

             {/* 4. Scatter / Activity */}
             <div className="h-32 hud-panel p-4 flex flex-col justify-between">
               <span className="text-[10px] font-mono text-muted uppercase">Nodos Activos</span>
               <div className="relative h-16 w-full mt-2 grid grid-cols-8 gap-[2px]">
                 {Array.from({ length: 32 }).map((_, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0.1 }}
                     animate={{ opacity: [0.1, Math.random() * 0.8 + 0.2, 0.1] }}
                     transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                     className="bg-accent rounded-sm w-full h-full"
                   />
                 ))}
               </div>
             </div>
          </div>

          {/* Decorative background circle */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
