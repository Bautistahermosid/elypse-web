import React, { useRef, useEffect } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

interface ScrollVideoProps {
  scrollYProgress?: MotionValue<number>;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ scrollYProgress: externalProgress }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const globalScroll = useScroll();
  const activeScrollProgress = externalProgress || globalScroll.scrollYProgress;

  useEffect(() => {
    // Escuchamos los cambios en el scroll (de 0 a 1)
    const unsubscribe = activeScrollProgress.on('change', (latest) => {
      if (videoRef.current && videoRef.current.duration) {
        // Mapeamos el progreso del scroll (0 a 1) al tiempo del video
        // Empezando desde el segundo 1 hasta el final
        const startTime = 1;
        const duration = videoRef.current.duration;

        // Como ahora el progreso es relativo a la sección (VirtualPlant) y no a toda la página,
        // bajamos el multiplicador para que la rotación se distribuya bien al pasar por la sección.
        const speedMultiplier = 1.5;
        const progress = Math.min(latest * speedMultiplier, 1);

        videoRef.current.currentTime = startTime + (duration - startTime) * progress;
      }
    });

    return () => unsubscribe();
  }, [activeScrollProgress]);

  return (
    <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 z-[0] pointer-events-none opacity-100 overflow-hidden">
      <video
        ref={videoRef}
        src="/video_maquinaNegra.mp4"
        className="w-full h-full object-cover mix-blend-lighten"
        muted
        playsInline
        preload="auto"
      />
      {/* Gradiente para difuminar el borde izquierdo del video con el fondo oscuro */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent" />
    </div>
  );
};
