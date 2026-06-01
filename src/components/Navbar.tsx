import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';

type Language = 'ES' | 'PT' | 'EN';

const translations = {
  ES: {
    nav: [
      { name: 'plataforma', href: '#showcase' },
      { name: 'operaciones', href: '#maintenance' },
      { name: 'analitica', href: '#analytics' },
      { name: 'constructor', href: '#plant-builder' },
      { name: 'planta virtual', href: '#virtual-plant' },
      { name: 'agentes', href: '#agents' },
    ],
    cta: 'Solicitar demo'
  },
  EN: {
    nav: [
      { name: 'Platform', href: '#showcase' },
      { name: 'Operations', href: '#maintenance' },
      { name: 'Analytics', href: '#analytics' },
      { name: 'Builder', href: '#plant-builder' },
      { name: 'Virtual Plant', href: '#virtual-plant' },
      { name: 'Neural Agents', href: '#agents' },
    ],
    cta: 'Request Demo'
  },
  PT: {
    nav: [
      { name: 'Plataforma', href: '#showcase' },
      { name: 'Operações', href: '#maintenance' },
      { name: 'Analítica', href: '#analytics' },
      { name: 'Construtor', href: '#plant-builder' },
      { name: 'Planta Virtual', href: '#virtual-plant' },
      { name: 'Agentes', href: '#agents' },
    ],
    cta: 'Solicitar demo'
  }
};

export const Navbar = () => {
  const [currentLang, setCurrentLang] = useState<Language>('ES');

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-8 mix-blend-difference"
    >
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4">
          <Logo className="w-10 h-10 text-ink" />
          <span className="text-ink font-sans font-bold tracking-tighter text-2xl uppercase">Elypse</span>
        </div>

        <nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-ink/50">
          {translations[currentLang].nav.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-3 border-r border-ink/15 pr-6 mr-2">
          {(['ES', 'PT', 'EN'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setCurrentLang(lang)}
              className={cn(
                "text-[10px] font-mono tracking-wider font-bold transition-all px-2 py-0.5 rounded cursor-pointer",
                currentLang === lang 
                  ? "text-accent bg-accent/10 border border-accent/20" 
                  : "text-ink/40 hover:text-ink/80 border border-transparent"
              )}
            >
              {lang}
            </button>
          ))}
        </div>

        <button className="px-6 py-2 border border-ink/10 text-[11px] uppercase tracking-[0.2em] font-semibold text-ink hover:bg-ink hover:text-bg transition-all cursor-pointer">
          {translations[currentLang].cta}
        </button>
      </div>
    </motion.nav>
  );
};
