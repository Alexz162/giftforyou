'use client';

import { useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const playerRef = useRef<any>(null);
  const videoId = 'FHT3xNYZU8o'; // ID del video de YouTube

  useEffect(() => {
    // Cargar la API de YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    // Crear reproductor cuando la API esté lista
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-audio', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId, // Para que funcione el loop
          modestbranding: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1
        },
        events: {
          onReady: (e: any) => {
            // Configurar volumen bajo (20%)
            e.target.setVolume(20);
            // Reproducir automáticamente
            e.target.playVideo();
            
            // Asegurarse de que el audio se reproduzca después de la interacción del usuario
            const handleFirstInteraction = () => {
              e.target.unMute();
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('keydown', handleFirstInteraction);
            };
            
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('keydown', handleFirstInteraction);
          }
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="hidden">
      <div id="youtube-audio"></div>
    </div>
  );
};

export default AudioPlayer;