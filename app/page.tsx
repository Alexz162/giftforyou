"use client";

import "./components/FlorAmarilla.css";
import FlorAmarilla from "./components/FlorAmarilla";
import AudioPlayer from "./components/AudioPlayer";
import { useEffect, useState } from "react";

export default function Home() {
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignature(true);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-yellow-100 h-[100vh] w-[100vw] flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <AudioPlayer />
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">
        Feliz 21 de septiembre ✌️
      </h1>
      <div className="m-3">
        <FlorAmarilla />
      </div>
      <p 
        className={`fixed bottom-4 right-4 text-gray-600 transition-opacity duration-1000 ${showSignature ? 'opacity-100' : 'opacity-0'}`}
      >
        Hecho por Alex
      </p>
      
    </div>
  );
}
