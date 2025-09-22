'use client';

import { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar el volumen al 20%
    audio.volume = 0.2;
    
    // Función para manejar la primera interacción del usuario
    const handleFirstInteraction = () => {
      // Reproducir el audio cuando el usuario interactúe con la página
      audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
      
      // Eliminar los event listeners después de la primera interacción
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    // Agregar event listeners para la primera interacción del usuario
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    // Configurar el bucle
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      // Limpiar event listeners
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="hidden">
      <audio 
        ref={audioRef} 
        loop 
        src="/This Side of Paradise.mp3"
      />
    </div>
  );
};

export default AudioPlayer;