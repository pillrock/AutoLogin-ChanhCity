import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import backgroundMusic from '../assets/audio/background.mp3';

const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    // Start playing when component mounts
    audio.play().catch((error) => {
      console.log('Audio autoplay failed:', error);
    });

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleAudioControl = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.5;
        audioRef.current.play();
      } else {
        audioRef.current.volume = 0;
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <button
      className="px-2 py-1 text-gray-400 transition-all duration-300 hover:text-white"
      onClick={handleAudioControl}
    >
      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
};

export default AudioPlayer;
