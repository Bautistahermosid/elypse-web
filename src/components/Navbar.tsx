import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, BarChart3, Database, Cpu, Globe, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';

const navItems = [
  { name: 'Mantenimiento', icon: LayoutGrid, href: '#maintenance' },
  { name: 'Analytics', icon: BarChart3, href: '#analytics' },
  { name: 'Maquinaria', icon: Database, href: '#machinery' },
  { name: 'SCADA', icon: Cpu, href: '#scada' },
  { name: 'Planta Virtual', icon: Globe, href: '#virtual-plant' },
];

export const Navbar = () => {
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
          {navItems.map((item) => (
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
        <button className="px-6 py-2 border border-ink/10 text-[11px] uppercase tracking-[0.2em] font-semibold text-ink hover:bg-ink hover:text-bg transition-all">
          Request Demo
        </button>
      </div>
    </motion.nav>
  );
};
