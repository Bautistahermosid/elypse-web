import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Clone } from '@react-three/drei';
import { MousePointer2, Plus, Box, Trash2, Cuboid, LayoutDashboard } from 'lucide-react';
import * as THREE from 'three';

type Point = { x: number; y: number };
type Wall = { id: string; start: Point; end: Point };
type PlacedObject = { id: string; x: number; y: number; type: string };

function Wall3D({ wall }: { wall: Wall }) {
  const dx = wall.end.x - wall.start.x;
  const dz = wall.end.y - wall.start.y;
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dz, dx);
  
  const midX = (wall.start.x + wall.end.x) / 2;
  const midZ = (wall.start.y + wall.end.y) / 2;
  
  const scale = 0.05; // 2D pixels to 3D units

  return (
    <mesh position={[midX * scale, 1.5, midZ * scale]} rotation={[0, -angle, 0]}>
      <boxGeometry args={[length * scale, 3, 0.2]} />
      <meshStandardMaterial color="#2a2b38" roughness={0.8} />
    </mesh>
  );
}

function Object3D({ obj }: { obj: PlacedObject }) {
  const { scene } = useGLTF('/model/maquina.glb');
  const scale = 0.05;
  
  return (
    <group position={[obj.x * scale, 0, obj.y * scale]}>
      <Clone object={scene} scale={1} />
    </group>
  );
}

export const PlantBuilder = () => {
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [tool, setTool] = useState<'select' | 'wall' | 'object'>('select');
  
  const [walls, setWalls] = useState<Wall[]>([]);
  const [objects, setObjects] = useState<PlacedObject[]>([]);
  
  const [drawingWall, setDrawingWall] = useState<Point | null>(null);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode !== '2D') return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate coordinates relative to center of container
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (tool === 'wall') {
      if (!drawingWall) {
        setDrawingWall({ x, y });
      } else {
        setWalls([...walls, { id: Date.now().toString(), start: drawingWall, end: { x, y } }]);
        setDrawingWall({ x, y }); // Continue drawing
      }
    } else if (tool === 'object') {
      setObjects([...objects, { id: Date.now().toString(), x, y, type: 'machine' }]);
      setTool('select');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (mode !== '2D') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
  };

  const finishDrawing = () => {
    setDrawingWall(null);
  };

  const clearAll = () => {
    setWalls([]);
    setObjects([]);
    setDrawingWall(null);
  };

  return (
    <section id="plant-builder" className="py-40 px-8 md:px-24 bg-bg border-y border-border-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        <div className="lg:col-span-12 mb-8">
           <span className="label-small mb-4 block">03 / Layout Core</span>
           <h2 className="text-5xl md:text-8xl font-semibold text-ink tracking-tighter leading-none">
             Plant <span className="font-editorial text-accent">Builder.</span>
           </h2>
        </div>
        
        <div className="lg:col-span-4 space-y-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="space-y-6"
          >
            <p className="text-ink/40 text-xl font-light leading-relaxed">
              Diseñe el layout de su planta en 2D con precisión técnica y visualícelo instantáneamente en 3D interactivo.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setMode('2D')}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-lg border transition-colors ${mode === '2D' ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-transparent border-border-subtle text-muted hover:text-ink'}`}
                >
                  <LayoutDashboard size={16} /> 2D Blueprint
                </button>
                <button 
                  onClick={() => setMode('3D')}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-lg border transition-colors ${mode === '3D' ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-transparent border-border-subtle text-muted hover:text-ink'}`}
                >
                  <Cuboid size={16} /> 3D Render
                </button>
              </div>

              {mode === '2D' && (
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => { setTool('select'); finishDrawing(); }} className={`py-3 flex flex-col items-center gap-2 rounded-lg border transition-colors ${tool === 'select' ? 'bg-ink/10 border-ink/30 text-ink' : 'border-border-subtle text-muted hover:text-ink'}`}>
                    <MousePointer2 size={16} /> <span className="text-[10px] uppercase">Select</span>
                  </button>
                  <button onClick={() => { setTool('wall'); finishDrawing(); }} className={`py-3 flex flex-col items-center gap-2 rounded-lg border transition-colors ${tool === 'wall' ? 'bg-ink/10 border-ink/30 text-ink' : 'border-border-subtle text-muted hover:text-ink'}`}>
                    <Plus size={16} /> <span className="text-[10px] uppercase">Wall</span>
                  </button>
                  <button onClick={() => { setTool('object'); finishDrawing(); }} className={`py-3 flex flex-col items-center gap-2 rounded-lg border transition-colors ${tool === 'object' ? 'bg-ink/10 border-ink/30 text-ink' : 'border-border-subtle text-muted hover:text-ink'}`}>
                    <Box size={16} /> <span className="text-[10px] uppercase">Machine</span>
                  </button>
                </div>
              )}

              <button onClick={clearAll} className="w-full py-3 flex items-center justify-center gap-2 rounded-lg border border-red-500/20 text-red-500/70 hover:bg-red-500/10 transition-colors">
                <Trash2 size={16} /> <span className="text-[10px] uppercase">Clear Layout</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <div className="hud-panel shadow-3xl h-[600px] overflow-hidden relative">
            <div className="scan-line" style={{ animationDuration: '5s' }} />
            
            {/* Editor Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-bg/50 backdrop-blur-md border-b border-border-subtle p-3 flex justify-between items-center">
              <span className="text-[10px] uppercase text-ink/40 font-medium tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live Editor // {mode}
              </span>
              <span className="text-[10px] text-muted">
                {walls.length} Walls | {objects.length} Objects
              </span>
            </div>

            <div 
              ref={containerRef}
              className="absolute inset-0 pt-12 cursor-crosshair touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onContextMenu={(e) => { e.preventDefault(); finishDrawing(); }}
            >
              {mode === '2D' ? (
                <div className="w-full h-full relative">
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" style={{ backgroundPosition: 'center center' }} />
                  
                  {/* Origin crosshair */}
                  <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-ink/30 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 h-4 w-[1px] bg-ink/30 -translate-x-1/2 -translate-y-1/2" />

                  <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}>
                    {walls.map(w => (
                      <line key={w.id} x1={w.start.x} y1={w.start.y} x2={w.end.x} y2={w.end.y} stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                    ))}
                    {drawingWall && (
                      <line x1={drawingWall.x} y1={drawingWall.y} x2={mousePos.x} y2={mousePos.y} stroke="#5E6AD2" strokeWidth="4" strokeDasharray="4" />
                    )}
                  </svg>
                  
                  <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}>
                    {objects.map(o => (
                      <div key={o.id} className="absolute w-8 h-8 -ml-4 -mt-4 bg-accent/20 border border-accent flex items-center justify-center rounded shadow-[0_0_15px_rgba(94,106,210,0.5)]" style={{ transform: `translate(${o.x}px, ${o.y}px)` }}>
                        <Box size={14} className="text-accent" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Canvas camera={{ position: [0, 15, 15], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 10]} intensity={1} />
                  <Environment preset="city" />
                  
                  <group>
                    {/* Floor grid in 3D */}
                    <gridHelper args={[50, 50, '#333', '#111']} />
                    
                    {walls.map(w => <Wall3D key={w.id} wall={w} />)}
                    {objects.map(o => <Object3D key={o.id} obj={o} />)}
                  </group>
                  
                  <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} />
                </Canvas>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
