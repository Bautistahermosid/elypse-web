import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform } from 'framer-motion';

const EllipseObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  // Link rotation and position to scroll
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.8]);
  const positionY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, -0.5]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth idle animation plus scroll influence
    meshRef.current.rotation.y = rotationY.get() + Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.x = rotationX.get() + Math.cos(time * 0.3) * 0.1;
    meshRef.current.scale.setScalar(scale.get());
    meshRef.current.position.y = positionY.get() + Math.sin(time * 0.8) * 0.05;
  });

  return (
    <group>
      {/* Main Stylized Ellipse */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#5E6AD2"
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive="#5E6AD2"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Decorative inner rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#5E6AD2" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.8, 0.005, 16, 100]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export const ThreeScene = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} color="#5E6AD2" intensity={1} />
        <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <EllipseObject />
        </Float>
        
        <fog attach="fog" args={['#0D0D0F', 5, 10]} />
      </Canvas>
    </div>
  );
};
