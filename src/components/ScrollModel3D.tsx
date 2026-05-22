import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Preload } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';

interface ScrollModel3DProps {
  scrollYProgress?: MotionValue<number>;
}

function Model({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  // useGLTF carga el archivo GLB convertido
  const { scene } = useGLTF('/model/maquina.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && scrollProgress) {
      // scrollProgress.get() nos da el valor de 0 a 1 en tiempo real
      const currentProgress = scrollProgress.get();
      
      // Math.PI * 2 es un giro completo (360 grados).
      // Lo multiplicamos por 1 para que haga exactamente una vuelta en lo que dura la sección
      const speedMultiplier = 1;
      groupRef.current.rotation.y = currentProgress * Math.PI * 2 * speedMultiplier;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ajusta la escala y posición si la máquina se ve muy grande o pequeña */}
      <primitive object={scene} scale={2.5} position={[0, -0.5, 0]} />
    </group>
  );
}

export const ScrollModel3D: React.FC<ScrollModel3DProps> = ({ scrollYProgress }) => {
  return (
    <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 z-[0] pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        {/* Environment preset "city" le da reflejos de luz de estudio reales */}
        <Environment preset="city" />

        <React.Suspense fallback={null}>
          <Float
            speed={2} // Velocidad del flotado
            rotationIntensity={0.2} // Movimiento leve extra
            floatIntensity={0.5} // Amplitud del flotado
          >
            <Model scrollProgress={scrollYProgress} />
          </Float>
          <Preload all />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

// Precarga para que no haya salto cuando aparezca
useGLTF.preload('/model/maquina.glb');
