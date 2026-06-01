import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { SystemShowcase } from './components/sections/SystemShowcase';
import { Maintenance } from './components/sections/Maintenance';
import { Analytics } from './components/sections/Analytics';
import { PlantBuilder } from './components/sections/PlantBuilder';
import { VirtualPlant } from './components/sections/VirtualPlant';
import { IndustrialAI } from './components/sections/IndustrialAI';
import { ThreeScene } from './components/ThreeScene';
import { SmoothScroll } from './components/SmoothScroll';
import { Logo } from './components/Logo';
import { Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-bg text-ink py-32 px-12 border-t border-border-subtle relative z-10 font-sans">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 pt-16">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Logo className="w-10 h-10 text-ink" />
          <span className="font-bold tracking-tighter text-2xl uppercase">Elypse</span>
        </div>
        <div className="flex gap-6">
          <Linkedin size={18} className="text-muted hover:text-ink cursor-pointer transition-colors" />
          <Twitter size={18} className="text-muted hover:text-ink cursor-pointer transition-colors" />
          <Instagram size={18} className="text-muted hover:text-ink cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h4 className="label-small text-muted">Plataforma</h4>
          <ul className="space-y-2 text-[11px] uppercase tracking-widest font-semibold text-muted">
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Funcionalidades</li>
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Integraciones</li>
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Seguridad</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="label-small text-muted">Empresa</h4>
          <ul className="space-y-2 text-[11px] uppercase tracking-widest font-semibold text-muted">
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Sobre nosotros</li>
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Trabaja con nosotros</li>
            <li className="hover:text-ink cursor-pointer hover:translate-x-1 transition-all">Contacto</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.2em] font-bold text-muted">
      <p>© 2026 Elypse - Argentina</p>
      <div className="flex gap-8">
        <span className="hover:text-ink cursor-pointer">Privacidad</span>
        <span className="hover:text-ink cursor-pointer">Términos</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <div className="bg-bg min-h-screen selection:bg-accent/30 selection:text-ink">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]"
          style={{ scaleX }}
        />

        <Navbar />
        <ThreeScene />
        
        <main className="relative z-10">
          <Hero />
          <SystemShowcase />
          <Maintenance />
          <Analytics />
          <PlantBuilder />
          <VirtualPlant />
          <IndustrialAI />
          
          <section className="py-40 bg-ink flex flex-col items-center text-center px-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-medium tracking-tight text-bg mb-12 font-editorial">
                ¿Te animas al futuro <br /> <span className="text-accent">del mantenimiento?</span>
              </h2>
              <button className="bg-bg text-ink px-12 py-5 font-mono text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_var(--color-bg)] cursor-pointer">
                Solicitar info
              </button>
            </motion.div>
          </section>
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
