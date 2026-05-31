import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Cpu, 
  Layers, 
  Calendar, 
  Compass, 
  Plus, 
  Minus, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Terminal, 
  Shield, 
  Database,
  ArrowRight,
  User,
  Image as ImageIcon,
  ChevronDown,
  Trash2,
  Camera
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function ModelObj() {
  const obj = useLoader(OBJLoader, '/model/2dda9cb301c27420c63701527e61865d.obj');
  return <primitive object={obj} />;
}

// Types & Data Structures
type TabType = 'tickets' | 'equipos' | 'inventario' | 'planificacion' | 'exploracion';

interface TabItem {
  id: TabType;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

const TABS: TabItem[] = [
  {
    id: 'tickets',
    title: 'Tickets',
    subtitle: 'Gestión rápida de incidencias',
    description: 'Cree y resuelva en segundos órdenes de mantenimiento correctivo, calibraciones, mejoras e inspecciones críticas para planta.',
    tag: '01 / Ops core'
  },
  {
    id: 'equipos',
    title: 'Equipos',
    subtitle: 'Ficha técnica y gemelos 3D',
    description: 'Gestione parámetros de ingeniería, acceda a modelos 3D esquemáticos y administre la telemetría histórica de sus activos.',
    tag: '02 / Assets'
  },
  {
    id: 'inventario',
    title: 'Inventario',
    subtitle: 'Control y carga de insumos',
    description: 'Supervise repuestos, filtros y consumibles. Automatice alarmas de desabastecimiento antes de que afecten la línea de producción.',
    tag: '03 / Materials'
  },
  {
    id: 'planificacion',
    title: 'Planificación',
    subtitle: 'Optimización de turnos con IA',
    description: 'Organice órdenes de trabajo, cuadrillas de personal y recursos logísticos asistido por algoritmos de aprendizaje profundo.',
    tag: '04 / Neural Ops'
  },
  {
    id: 'exploracion',
    title: 'Exploración de Planta',
    subtitle: 'Telemetría espacial interactiva',
    description: 'Navegue de forma remota por los nodos físicos de su fábrica y reciba diagnósticos dinámicos de temperatura y vibración.',
    tag: '05 / Spatial'
  }
];

export const SystemShowcase = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tickets');
  const [progress, setProgress] = useState(0);
  const AUTO_PLAY_DURATION = 12000; // 12 seconds per tab
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-switch tabs logic
  useEffect(() => {
    setProgress(0);
    const intervalTime = 100;
    const step = (intervalTime / AUTO_PLAY_DURATION) * 100;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Switch tab
          setActiveTab((current) => {
            const index = TABS.findIndex(t => t.id === current);
            const nextIndex = (index + 1) % TABS.length;
            return TABS[nextIndex].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTab]);

  const handleTabClick = (id: TabType) => {
    setActiveTab(id);
    setProgress(0);
  };

  // --- Sub-Component State & Interaction Managers ---
  
  // 1. Tickets Interactive State
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketAsset, setTicketAsset] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');
  const [ticketTaller, setTicketTaller] = useState('');
  const [ticketTaskType, setTicketTaskType] = useState('');
  const [ticketRequester, setTicketRequester] = useState('Carlos Mendoza');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [ticketsList, setTicketsList] = useState<Array<{id: string, type: string, asset: string, time: string, status: string}>>([
    { id: '9842', type: 'Orden Generada', asset: 'Fuga de aceite en Compresor Sigma II', time: 'Hace 5 min', status: 'Completado' },
    { id: '9843', type: 'En Espera', asset: 'Descalibración en Brazo Robótico X-2', time: 'Hace 2 min', status: 'En Espera' }
  ]);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDesc.trim() || !ticketPriority || !ticketTaller) return;

    setIsGeneratingTicket(true);
    setTimeout(() => {
      const newId = `${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketsList(prev => [
        {
          id: newId,
          type: 'Orden Generada',
          asset: `${ticketDesc} en ${ticketAsset || 'Activo General'}`,
          time: 'Ahora',
          status: 'Abierto'
        },
        ...prev
      ]);
      setIsGeneratingTicket(false);
      
      // Reset form
      setTicketDesc('');
      setTicketAsset('');
      setTicketPriority('');
      setTicketTaller('');
      setTicketTaskType('');
      setUploadedPhotos([]);
    }, 1000);
  };

  // 2. Equipos State
  const [selectedSubsystem, setSelectedSubsystem] = useState<'info' | 'insumos' | 'historial'>('info');
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(false);

  // 3. Inventario State
  const [inventory, setInventory] = useState([
    { name: 'Filtros HEPA H14', stock: 82, min: 20, unit: 'unidades' },
    { name: 'Aceite Sintético H-100', stock: 12, min: 15, unit: 'litros' },
    { name: 'Sensores de Flujo RTD', stock: 45, min: 10, unit: 'unidades' },
    { name: 'Sellos de Nitrilo', stock: 8, min: 10, unit: 'unidades' }
  ]);

  const modifyStock = (index: number, amount: number) => {
    setInventory(prev => prev.map((item, idx) => {
      if (idx === index) {
        const newStock = Math.max(0, item.stock + amount);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  // 4. Planificación IA State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [efficiency, setEfficiency] = useState(74);
  const [aiLogs, setAiLogs] = useState<string[]>([]);
  const [workOrders, setWorkOrders] = useState([
    { id: 'WO-101', name: 'Calibrar Termostatos', hours: '08:00 - 10:00', operator: 'Ing. Arrieta', isAiOptimized: false },
    { id: 'WO-102', name: 'Lubricar Motor K-9', hours: '10:15 - 12:00', operator: 'Tec. Mansilla', isAiOptimized: false },
    { id: 'WO-103', name: 'Limpieza Filtro Primario', hours: '13:00 - 15:30', operator: 'Tec. Mansilla', isAiOptimized: false }
  ]);

  const runAiOptimization = () => {
    setIsOptimizing(true);
    setAiLogs(['[IA Engine] Inicializando análisis neuronal de recursos...', '[IA Engine] Analizando 3 órdenes de trabajo pendientes...']);
    
    setTimeout(() => {
      setAiLogs(prev => [...prev, '[IA Engine] Conflicto detectado: Tec. Mansilla asignado a WO-102 y WO-103 consecutivamente. Riego de sobrecarga.']);
    }, 1200);

    setTimeout(() => {
      setAiLogs(prev => [...prev, '[IA Engine] Solución: Reasignando WO-103 a Tec. Rivas. Reduciendo tiempos muertos en un 18%.']);
      setWorkOrders([
        { id: 'WO-101', name: 'Calibrar Termostatos', hours: '08:00 - 10:00', operator: 'Ing. Arrieta', isAiOptimized: true },
        { id: 'WO-102', name: 'Lubricar Motor K-9', hours: '10:00 - 11:30', operator: 'Tec. Mansilla', isAiOptimized: true },
        { id: 'WO-103', name: 'Limpieza Filtro Primario', hours: '11:45 - 13:15', operator: 'Tec. Rivas', isAiOptimized: true }
      ]);
    }, 2500);

    setTimeout(() => {
      setAiLogs(prev => [...prev, '[IA Engine] Optimización completa. Tasa de eficiencia maximizada.']);
      setEfficiency(96);
      setIsOptimizing(false);
    }, 3800);
  };

  // Reset IA Optimization
  const resetAiOptimization = () => {
    setEfficiency(74);
    setAiLogs([]);
    setWorkOrders([
      { id: 'WO-101', name: 'Calibrar Termostatos', hours: '08:00 - 10:00', operator: 'Ing. Arrieta', isAiOptimized: false },
      { id: 'WO-102', name: 'Lubricar Motor K-9', hours: '10:15 - 12:00', operator: 'Tec. Mansilla', isAiOptimized: false },
      { id: 'WO-103', name: 'Limpieza Filtro Primario', hours: '13:00 - 15:30', operator: 'Tec. Mansilla', isAiOptimized: false }
    ]);
  };

  // 5. Exploración de Planta State
  const [selectedPlantZone, setSelectedPlantZone] = useState<'A' | 'B' | 'C'>('A');
  const [liveChartData, setLiveChartData] = useState<number[]>([45, 48, 47, 52, 49, 53, 56, 50, 52, 58, 62, 59]);

  // Live telemetry data simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveChartData(prev => {
        const next = [...prev.slice(1)];
        const base = selectedPlantZone === 'A' ? 50 : selectedPlantZone === 'B' ? 82 : 31;
        const noise = Math.floor(Math.random() * 8) - 4;
        next.push(Math.max(10, Math.min(100, base + noise)));
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [selectedPlantZone]);

  const zoneMetadata = {
    A: { name: 'Reactor Químico R-10', temp: '54.2 °C', vibracion: '0.12 mm/s', status: 'Estable' },
    B: { name: 'Compresores de Gas G-04', temp: '82.7 °C', vibracion: '0.45 mm/s', status: 'Advertencia' },
    C: { name: 'Cámara de Enfriamiento C-12', temp: '14.5 °C', vibracion: '0.08 mm/s', status: 'Estable' }
  };

  return (
    <section id="showcase" className="py-32 bg-bg border-t border-border-subtle relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)/3%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <span className="label-small text-accent mb-4 block">Interactive Experience</span>
          <h2 className="text-4xl md:text-7xl font-bold text-ink tracking-tight mb-8">
            El Core de su Planta, <br />
            <span className="font-editorial text-accent font-light">Bajo Control Absoluto</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            Haga clic en las opciones para interactuar directamente con nuestro simulador y explorar cómo Elypse unifica y simplifica cada aspecto operativo.
          </p>
        </div>

        {/* Dynamic Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Product Selector (Wrapper style) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden cursor-pointer group flex flex-col justify-between",
                      isActive 
                        ? "bg-accent/[0.03] border-accent/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]" 
                        : "bg-transparent border-border-subtle/40 hover:border-border-subtle"
                    )}
                  >
                    {/* Auto-play Timer Progress Bar */}
                    {isActive && (
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                        className="absolute bottom-0 left-0 h-[2px] bg-accent/60"
                      />
                    )}

                    <div className="flex items-start justify-between mb-2">
                      <span className={cn(
                        "text-[9px] uppercase tracking-[0.2em] font-mono",
                        isActive ? "text-accent" : "text-muted/60"
                      )}>
                        {tab.tag}
                      </span>
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isActive ? "bg-accent shadow-[0_0_10px_var(--color-accent)] animate-pulse" : "bg-transparent"
                      )} />
                    </div>

                    <h3 className={cn(
                      "text-xl font-medium tracking-tight mb-2 transition-colors",
                      isActive ? "text-ink" : "text-ink/60 group-hover:text-ink"
                    )}>
                      {tab.title}
                    </h3>
                    
                    <p className={cn(
                      "text-xs leading-relaxed transition-all duration-500",
                      isActive ? "text-muted max-h-20 opacity-100 mt-1" : "text-muted/0 max-h-0 opacity-0 overflow-hidden"
                    )}>
                      {tab.description}
                    </p>
                  </button>
                );
              })}
            </div>
            
            <div className="pt-8 pl-4 hidden lg:flex items-center gap-4 text-xs font-mono text-muted/50">
              <Terminal size={14} className="text-accent" />
              <span>SISTEMA TOTALMENTE INTEGRADO V2.8 // CLOUD CORE</span>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Viewport */}
          <div className="lg:col-span-7">
            <div className="hud-panel w-full h-[620px] rounded-3xl p-6 md:p-10 flex flex-col justify-between shadow-2xl relative bg-card/65 border border-border-subtle/50 backdrop-blur-xl overflow-hidden min-w-0">
              <div className="scan-line" style={{ animationDuration: '6s' }} />
              
              {/* Terminal Viewport Top */}
              <div className="flex justify-between items-center pb-6 border-b border-border-subtle/30 z-10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/30 border border-error/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-warning/30 border border-warning/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-success/30 border border-success/50" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted/60 uppercase">
                    ELYPSE_SIMULATOR://{activeTab.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                  <span className="text-[9px] font-mono tracking-widest text-success uppercase">CONNECTED</span>
                </div>
              </div>

              {/* Viewport Content (Animate Tabs Content) */}
              <div className="flex-grow py-8 overflow-y-auto z-10 flex flex-col min-w-0">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: TICKETS WIDGET */}
                  {activeTab === 'tickets' && (
                    <motion.div
                      key="tickets"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex flex-col justify-between h-full min-w-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        
                        {/* Interactive Form (Crear Nuevo Ticket matching the photo exactly) */}
                        <div className="bg-bg/40 border border-border-subtle/50 p-6 rounded-2xl space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border-subtle/40 scrollbar-track-transparent">
                          
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-accent tracking-wide uppercase">Crear Nuevo Ticket</h3>
                            <p className="text-[10px] text-muted/70 font-mono">Complete los campos para registrar un nuevo ticket de soporte</p>
                          </div>

                          <form onSubmit={handleCreateTicket} className="space-y-4">
                            
                            {/* Seccion 1: Informacion Basica */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-mono tracking-widest text-muted/80 border-b border-border-subtle/20 pb-1 pt-2">
                                Información Básica
                              </h4>

                              <div>
                                <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">
                                  Descripción del Problema <span className="text-error font-sans">*</span>
                                </label>
                                <textarea
                                  value={ticketDesc}
                                  onChange={(e) => setTicketDesc(e.target.value)}
                                  placeholder="Describa detalladamente el problema o solicitud..."
                                  className="w-full bg-bg/60 border border-border-subtle/40 rounded-xl px-4 py-3 text-xs text-ink placeholder-muted/30 focus:outline-none focus:border-accent/40 transition-colors h-20 resize-none"
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">Activo/Equipo</label>
                                  <div className="relative">
                                    <select
                                      value={ticketAsset}
                                      onChange={(e) => setTicketAsset(e.target.value)}
                                      className="w-full bg-bg/60 border border-border-subtle/40 rounded-xl px-3 py-2.5 text-xs text-ink/80 focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer pr-8"
                                    >
                                      <option value="">Seleccione un activo...</option>
                                      <option value="Turbina Principal K-9">Turbina Principal K-9</option>
                                      <option value="Compresor Sigma II">Compresor Sigma II</option>
                                      <option value="Brazo Robótico X-2">Brazo Robótico X-2</option>
                                      <option value="Generador Auxiliar G-04">Generador Auxiliar G-04</option>
                                      <option value="Reactor Químico R-10">Reactor Químico R-10</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none" />
                                  </div>
                                  <p className="text-[7.5px] text-muted/40 font-mono mt-1">Si no ve el activo, regístrelo en "Registro de Equipos"</p>
                                </div>

                                <div>
                                  <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">
                                    Prioridad <span className="text-error font-sans">*</span>
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={ticketPriority}
                                      onChange={(e) => setTicketPriority(e.target.value)}
                                      className="w-full bg-bg/60 border border-border-subtle/40 rounded-xl px-3 py-2.5 text-xs text-ink/80 focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer pr-8"
                                      required
                                    >
                                      <option value="">Seleccione prioridad...</option>
                                      <option value="Baja">Baja</option>
                                      <option value="Media">Media</option>
                                      <option value="Alta">Alta</option>
                                      <option value="Urgente">Urgente</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Seccion 2: Asignacion */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-mono tracking-widest text-muted/80 border-b border-border-subtle/20 pb-1 pt-2">
                                Asignación
                              </h4>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">
                                    Taller <span className="text-error font-sans">*</span>
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={ticketTaller}
                                      onChange={(e) => setTicketTaller(e.target.value)}
                                      className="w-full bg-bg/60 border border-border-subtle/40 rounded-xl px-3 py-2.5 text-xs text-ink/80 focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer pr-8"
                                      required
                                    >
                                      <option value="">Seleccione taller...</option>
                                      <option value="Mecánica Central">Mecánica Central</option>
                                      <option value="Electricidad e Inst.">Electricidad e Inst.</option>
                                      <option value="Sistemas de Control">Sistemas de Control</option>
                                      <option value="Calibración Industrial">Calibración Ind.</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none" />
                                  </div>
                                  <p className="text-[7.5px] text-muted/40 font-mono mt-1">Si no ve el taller, créelo en "Organización"</p>
                                </div>

                                <div>
                                  <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">Tipo de Tarea</label>
                                  <div className="relative">
                                    <select
                                      value={ticketTaskType}
                                      onChange={(e) => setTicketTaskType(e.target.value)}
                                      className="w-full bg-bg/60 border border-border-subtle/40 rounded-xl px-3 py-2.5 text-xs text-ink/80 focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer pr-8"
                                    >
                                      <option value="">Seleccione tipo...</option>
                                      <option value="Calibración">Calibración</option>
                                      <option value="Reparación Correctiva">Reparación Correctiva</option>
                                      <option value="Mantenimiento Preventivo">Mantenimiento Prev.</option>
                                      <option value="Inspección de Seguridad">Inspección de Seg.</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none" />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[9px] font-mono text-muted/95 uppercase mb-1.5">Solicitante</label>
                                <div className="relative">
                                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50" />
                                  <input
                                    type="text"
                                    value={ticketRequester}
                                    disabled
                                    className="w-full bg-bg/40 border border-border-subtle/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-ink/50 cursor-not-allowed font-mono"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Seccion 3: Fotos del Problema */}
                            <div className="space-y-4">
                              <h4 className="text-[10px] uppercase font-mono tracking-widest text-muted/80 border-b border-border-subtle/20 pb-1 pt-2">
                                Fotos del Problema
                              </h4>

                              <div className="space-y-2">
                                <label className="block text-[9px] font-mono text-muted/95 uppercase mb-0.5">Adjuntar Fotos</label>
                                
                                {uploadedPhotos.length === 0 ? (
                                  <div 
                                    onClick={() => setUploadedPhotos(['falla_valvula_turbine.png'])}
                                    className="border-2 border-dashed border-border-subtle/50 hover:border-accent/40 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-colors group bg-bg/15"
                                  >
                                    <Camera size={22} className="text-muted/50 group-hover:text-accent transition-colors mb-2" />
                                    <span className="text-xs font-mono font-medium text-accent">Click para seleccionar fotos</span>
                                    <span className="text-[7.5px] text-muted/40 font-mono mt-1">Formatos: JPG, PNG, GIF (máx. 5MB por foto)</span>
                                  </div>
                                ) : (
                                  <div className="bg-bg/60 border border-border-subtle/40 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                      <ImageIcon size={16} className="text-accent" />
                                      <div className="text-left">
                                        <span className="text-xs font-mono text-ink/85 block">{uploadedPhotos[0]}</span>
                                        <span className="text-[7.5px] font-mono text-success">CARGADO CON ÉXITO // 1.2 MB</span>
                                      </div>
                                    </div>
                                    <button 
                                      type="button"
                                      onClick={() => setUploadedPhotos([])}
                                      className="text-muted hover:text-error transition-colors p-1 cursor-pointer"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="pt-2">
                              <button
                                type="submit"
                                disabled={isGeneratingTicket || !ticketDesc.trim() || !ticketPriority || !ticketTaller}
                                className={cn(
                                  "w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer",
                                  ticketDesc.trim() && ticketPriority && ticketTaller && !isGeneratingTicket
                                    ? "bg-accent text-bg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                    : "bg-border-subtle/20 text-muted/40 border border-border-subtle/20 cursor-not-allowed"
                                )}
                              >
                                {isGeneratingTicket ? (
                                  <>Generando Orden...</>
                                ) : (
                                  <>Crear Ticket <ArrowRight size={14} /></>
                                )}
                              </button>
                            </div>

                          </form>
                        </div>

                        {/* Real-time feed (Gestión de Tickets) */}
                        <div className="space-y-4">
                          <h4 className="text-xs uppercase tracking-wider font-mono text-muted flex items-center gap-2">
                            <Terminal size={12} className="text-accent" /> Gestión de Tickets
                          </h4>
                          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                            {ticketsList.map((ticket, i) => (
                              <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-3.5 bg-bg/25 border border-border-subtle/20 rounded-xl flex items-center justify-between"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-accent">#{ticket.id}</span>
                                    <span className={cn(
                                      "px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold",
                                      ticket.type === 'Orden Generada' ? "bg-success/10 text-success border border-success/20" :
                                      ticket.type === 'En Espera' ? "bg-warning/10 text-warning border border-warning/20" :
                                      "bg-accent/10 text-accent border border-accent/20"
                                    )}>
                                      {ticket.type}
                                    </span>
                                  </div>
                                  <p className="text-xs font-medium text-ink/80">{ticket.asset}</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] font-mono text-muted block">{ticket.time}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: EQUIPOS WIDGET */}
                  {activeTab === 'equipos' && (
                    <motion.div
                      key="equipos"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex flex-col justify-between h-full min-w-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        
                        {/* Interactive 3D Object Model */}
                        <div className="relative aspect-square max-w-[260px] mx-auto w-full bg-bg/40 border border-border-subtle/50 rounded-2xl flex items-center justify-center overflow-hidden">
                          <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <pointLight position={[-10, -10, -10]} />
                            <React.Suspense fallback={null}>
                              <Stage environment="city" intensity={0.6}>
                                <ModelObj />
                              </Stage>
                            </React.Suspense>
                            <OrbitControls autoRotate autoRotateSpeed={rotationSpeed * 2} enableZoom={false} />
                          </Canvas>
                          
                          {/* Speed slider indicator */}
                          <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-center">
                            <span className="text-[8px] font-mono text-muted/60 uppercase">ROTATIONAL ROTOR // SIM</span>
                            <div className="flex gap-1.5">
                              {[0.5, 1, 2].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setRotationSpeed(s)}
                                  className={cn(
                                    "px-1.5 py-0.5 rounded text-[8px] font-mono border cursor-pointer",
                                    rotationSpeed === s 
                                      ? "bg-accent/25 border-accent text-accent" 
                                      : "bg-transparent border-border-subtle/50 text-muted"
                                  )}
                                >
                                  {s}x
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interactive Technical Details */}
                        <div className="space-y-5">
                          <div className="flex gap-2">
                            {['info', 'insumos', 'historial'].map((sub) => (
                              <button
                                key={sub}
                                onClick={() => setSelectedSubsystem(sub as any)}
                                className={cn(
                                  "py-2 px-3 text-[10px] font-mono rounded-lg border uppercase tracking-wider cursor-pointer",
                                  selectedSubsystem === sub 
                                    ? "bg-accent/10 border-accent/30 text-accent" 
                                    : "bg-transparent border-border-subtle/50 text-muted"
                                )}
                              >
                                {sub === 'info' ? 'Info Técnica' : sub === 'insumos' ? 'Insumos Asociados' : 'Historial'}
                              </button>
                            ))}
                          </div>

                          <div className="bg-bg/40 border border-border-subtle/50 p-6 rounded-2xl space-y-4">
                            {selectedSubsystem === 'info' && (
                              <>
                                <div className="flex justify-between items-center">
                                  <h4 className="text-xs uppercase font-mono text-ink tracking-wider">
                                    Motor Rotacional R-3
                                  </h4>
                                  <span className="text-[10px] font-mono text-success">OPERATIVO</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-muted font-mono uppercase">ID Activo</span>
                                    <p className="font-mono text-ink/80">EQ-ROT-0329</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-muted font-mono uppercase">Frecuencia Trabajo</span>
                                    <p className="font-mono text-ink/80">{`${50 * rotationSpeed} Hz`}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-muted font-mono uppercase">Salud Activo</span>
                                    <p className="font-bold text-success flex items-center gap-1.5">
                                      <Shield size={12} /> 98.4%
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-muted font-mono uppercase">Próximo Service</span>
                                    <p className="font-mono text-accent">14 de Julio, 2026</p>
                                  </div>
                                </div>
                              </>
                            )}
                            {selectedSubsystem === 'insumos' && (
                              <div className="space-y-3">
                                <h4 className="text-xs uppercase font-mono text-ink tracking-wider mb-2">Insumos Asociados</h4>
                                <div className="flex justify-between items-center bg-bg/50 p-2 rounded border border-border-subtle/30">
                                  <span className="text-[10px] text-muted font-mono">Aceite Sintético H-100</span>
                                  <span className="text-[10px] font-mono text-accent">Stock: 12L</span>
                                </div>
                                <div className="flex justify-between items-center bg-bg/50 p-2 rounded border border-border-subtle/30">
                                  <span className="text-[10px] text-muted font-mono">Sellos de Nitrilo 40mm</span>
                                  <span className="text-[10px] font-mono text-warning">Stock: 4 u.</span>
                                </div>
                                <div className="flex justify-between items-center bg-bg/50 p-2 rounded border border-border-subtle/30">
                                  <span className="text-[10px] text-muted font-mono">Filtro de Aire F-2</span>
                                  <span className="text-[10px] font-mono text-success">Stock: 25 u.</span>
                                </div>
                              </div>
                            )}
                            {selectedSubsystem === 'historial' && (
                              <div className="space-y-3">
                                <h4 className="text-xs uppercase font-mono text-ink tracking-wider mb-2">Historial de Mantenimiento</h4>
                                <div className="border-l-2 border-accent/20 pl-3 space-y-3">
                                  <div>
                                    <p className="text-[10px] font-mono text-muted">12 May 2026</p>
                                    <p className="text-xs text-ink/80">Cambio de rodamientos axiales</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-mono text-muted">05 Abr 2026</p>
                                    <p className="text-xs text-ink/80">Inspección termográfica</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-mono text-muted">15 Feb 2026</p>
                                    <p className="text-xs text-ink/80">Lubricación general</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: INVENTARIO WIDGET */}
                  {activeTab === 'inventario' && (
                    <motion.div
                      key="inventario"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex flex-col justify-between h-full min-w-0"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs uppercase tracking-wider font-mono text-muted flex items-center gap-2">
                            <Database size={12} className="text-accent" /> Control de Stock y Carga Eficaz
                          </h4>
                          <span className="text-[10px] font-mono text-muted/60">Simulador de Insumos</span>
                        </div>

                        <div className="space-y-3.5">
                          {inventory.map((item, idx) => {
                            const isLowStock = item.stock < item.min;
                            const percentage = Math.min(100, Math.round((item.stock / 100) * 100));
                            
                            return (
                              <div 
                                key={item.name}
                                className="bg-bg/25 border border-border-subtle/25 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                              >
                                <div className="md:w-1/3 space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs font-semibold text-ink/90">{item.name}</h5>
                                    {isLowStock && (
                                      <span className="text-[8px] bg-warning/10 text-warning font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-warning/20 flex items-center gap-1 animate-pulse">
                                        <AlertTriangle size={8} /> CRÍTICO
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-mono text-muted block uppercase">Mín. requerido: {item.min} {item.unit}</span>
                                </div>

                                <div className="flex-grow flex items-center gap-3">
                                  <div className="flex-grow h-2 bg-border-subtle/30 rounded-full overflow-hidden relative">
                                    <motion.div 
                                      animate={{ width: `${percentage}%` }}
                                      className={cn(
                                        "h-full rounded-full transition-all duration-300",
                                        isLowStock ? "bg-warning" : "bg-accent"
                                      )}
                                    />
                                  </div>
                                  <span className="text-xs font-mono font-bold text-ink/80 w-16 text-right">
                                    {item.stock} <span className="text-[9px] font-normal text-muted">{item.unit.substring(0, 3)}</span>
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                  <button
                                    onClick={() => modifyStock(idx, -5)}
                                    className="w-8 h-8 rounded-lg border border-border-subtle bg-bg/50 flex items-center justify-center text-muted hover:text-ink hover:border-accent/40 transition-all cursor-pointer"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <button
                                    onClick={() => modifyStock(idx, 5)}
                                    className="w-8 h-8 rounded-lg border border-border-subtle bg-bg/50 flex items-center justify-center text-muted hover:text-ink hover:border-accent/40 transition-all cursor-pointer"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: PLANIFICACIÓN IA WIDGET */}
                  {activeTab === 'planificacion' && (
                    <motion.div
                      key="planificacion"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex flex-col justify-between h-full min-w-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        
                        {/* Interactive Gantt timeline */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs uppercase tracking-wider font-mono text-muted flex items-center gap-2">
                              <Calendar size={12} className="text-accent" /> Planificador de Cuadrilla
                            </h4>
                            <span className="text-[9px] font-mono text-muted/50">Turno de Mañana</span>
                          </div>

                          <div className="space-y-3">
                            {workOrders.map((wo) => (
                              <div 
                                key={wo.id}
                                className={cn(
                                  "bg-bg/25 border p-3.5 rounded-xl transition-all flex justify-between items-center",
                                  wo.isAiOptimized 
                                    ? "border-success/20 bg-success/[0.02]" 
                                    : "border-border-subtle/30"
                                )}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-muted">{wo.id}</span>
                                    {wo.isAiOptimized && (
                                      <span className="text-[8px] bg-success/15 text-success font-mono uppercase px-1 rounded flex items-center gap-0.5">
                                        <Sparkles size={8} /> IA OPT
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="text-xs font-semibold text-ink">{wo.name}</h5>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] font-mono text-ink/70 block mb-1">{wo.hours}</span>
                                  <span className="text-[10px] text-accent font-medium">{wo.operator}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* IA neural panel */}
                        <div className="md:col-span-5 space-y-4">
                          {/* Radial efficiency loader */}
                          <div className="bg-bg/40 border border-border-subtle/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                            <div className="relative w-28 h-28 flex items-center justify-center">
                              {/* Static circular track */}
                              <svg className="w-full h-full -rotate-90">
                                <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="transparent" />
                                <motion.circle 
                                  cx="56" 
                                  cy="56" 
                                  r="48" 
                                  stroke="var(--color-accent)" 
                                  strokeWidth="8" 
                                  fill="transparent" 
                                  strokeDasharray="301.6"
                                  animate={{ strokeDashoffset: 301.6 - (301.6 * efficiency) / 100 }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold font-mono tracking-tighter text-ink">{efficiency}%</span>
                                <span className="text-[8px] text-muted font-mono uppercase">Eficiencia</span>
                              </div>
                            </div>

                            <div className="w-full space-y-2">
                              {efficiency === 74 ? (
                                <button
                                  onClick={runAiOptimization}
                                  disabled={isOptimizing}
                                  className="w-full py-2.5 rounded-xl bg-accent text-bg font-mono font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <Sparkles size={12} /> Optimizar con IA
                                </button>
                              ) : (
                                <button
                                  onClick={resetAiOptimization}
                                  className="w-full py-2.5 rounded-xl border border-border-subtle hover:border-accent/40 text-muted hover:text-ink font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  Reestablecer
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* AI Diagnostic Logs Terminal */}
                      {aiLogs.length > 0 && (
                        <div className="bg-bg/85 border border-border-subtle p-4 rounded-xl font-mono text-[9px] text-muted space-y-1.5 max-h-[110px] overflow-y-auto">
                          {aiLogs.map((log, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-accent/60">&gt;&gt;</span>
                              <span className="leading-relaxed">{log}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 5: EXPLORACIÓN WIDGET */}
                  {activeTab === 'exploracion' && (
                    <motion.div
                      key="exploracion"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex flex-col justify-between h-full min-w-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Interactive factory map */}
                        <div className="md:col-span-6 bg-bg/40 border border-border-subtle/50 rounded-2xl p-6 relative flex flex-col justify-center overflow-hidden min-h-[220px]">
                          {/* Grid Overlay */}
                          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:15px_15px]" />
                          
                          {/* Floor Plan schematics */}
                          <div className="relative w-full h-[160px] border border-border-subtle/30 rounded-lg p-2.5 flex items-center justify-center">
                            
                            <svg className="w-full h-full text-muted/20" viewBox="0 0 100 50">
                              {/* Floor layout outlines */}
                              <rect x="5" y="5" width="40" height="40" stroke="currentColor" strokeWidth="0.8" fill="none" />
                              <rect x="55" y="5" width="40" height="20" stroke="currentColor" strokeWidth="0.8" fill="none" />
                              <rect x="55" y="30" width="40" height="15" stroke="currentColor" strokeWidth="0.8" fill="none" />
                              <line x1="45" y1="25" x2="55" y2="25" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                            </svg>

                            {/* Node Hotspots */}
                            {/* Reactor 10 (Zone A) */}
                            <button
                              onClick={() => setSelectedPlantZone('A')}
                              className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                            >
                              <div className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                selectedPlantZone === 'A' 
                                  ? "bg-accent/20 border-accent scale-125" 
                                  : "bg-bg border-muted/50 hover:border-ink"
                              )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", selectedPlantZone === 'A' ? "bg-accent" : "bg-muted/70")} />
                              </div>
                              <span className="text-[7px] font-mono text-muted uppercase mt-1">R-10</span>
                            </button>

                            {/* Compressor (Zone B) */}
                            <button
                              onClick={() => setSelectedPlantZone('B')}
                              className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                            >
                              <div className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                selectedPlantZone === 'B' 
                                  ? "bg-warning/20 border-warning scale-125 shadow-[0_0_10px_rgba(245,166,35,0.4)]" 
                                  : "bg-bg border-warning/50 hover:border-warning"
                              )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", selectedPlantZone === 'B' ? "bg-warning" : "bg-warning/70")} />
                              </div>
                              <span className="text-[7px] font-mono text-muted uppercase mt-1">G-04</span>
                            </button>

                            {/* Cooler (Zone C) */}
                            <button
                              onClick={() => setSelectedPlantZone('C')}
                              className="absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                            >
                              <div className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                selectedPlantZone === 'C' 
                                  ? "bg-accent/20 border-accent scale-125" 
                                  : "bg-bg border-muted/50 hover:border-ink"
                              )}>
                                <div className={cn("w-1.5 h-1.5 rounded-full", selectedPlantZone === 'C' ? "bg-accent" : "bg-muted/70")} />
                              </div>
                              <span className="text-[7px] font-mono text-muted uppercase mt-1">C-12</span>
                            </button>

                          </div>
                        </div>

                        {/* Telemetry output */}
                        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                          
                          <div className="bg-bg/40 border border-border-subtle/50 p-5 rounded-2xl space-y-3">
                            <div className="flex justify-between items-center">
                              <h5 className="text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
                                <Activity size={12} /> Zona: {selectedPlantZone}
                              </h5>
                              <span className={cn(
                                "text-[9px] font-mono font-bold uppercase",
                                zoneMetadata[selectedPlantZone].status === 'Advertencia' ? "text-warning animate-pulse" : "text-success"
                              )}>
                                {zoneMetadata[selectedPlantZone].status}
                              </span>
                            </div>

                            <h4 className="text-xs font-semibold text-ink">{zoneMetadata[selectedPlantZone].name}</h4>

                            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                              <div>
                                <span className="text-[9px] text-muted font-mono uppercase block">Temperatura</span>
                                <span className="font-mono text-ink/80 font-bold">{zoneMetadata[selectedPlantZone].temp}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-muted font-mono uppercase block">Vibración</span>
                                <span className="font-mono text-ink/80 font-bold">{zoneMetadata[selectedPlantZone].vibracion}</span>
                              </div>
                            </div>
                          </div>

                          {/* Telemetry Mini Chart Graph SVG */}
                          <div className="bg-bg/40 border border-border-subtle/50 p-4 rounded-2xl h-[100px] flex flex-col justify-between">
                            <span className="text-[8px] font-mono text-muted/60 uppercase">Gráfico de Vibración en Planta (15s)</span>
                            
                            <div className="h-10 w-full flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <motion.path
                                  d={`M ${liveChartData.map((val, i) => `${(i / (liveChartData.length - 1)) * 100} ${40 - (val / 100) * 40}`).join(' L ')}`}
                                  fill="none"
                                  stroke="var(--color-accent)"
                                  strokeWidth="1.5"
                                  initial={false}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              </svg>
                            </div>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Terminal Viewport Bottom */}
              <div className="flex justify-between items-center pt-6 border-t border-border-subtle/30 z-10 text-[9px] font-mono text-muted/40">
                <span className="flex items-center gap-1.5 uppercase">
                  <Shield size={10} className="text-accent" /> Secure encryption active
                </span>
                <span>SYSTEM_OK // V2.8</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
