import { useRef, useEffect } from 'react';

export const useClickSound = (audioSrc: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the Audio object only on the client side
    audioRef.current = new Audio(audioSrc);
  }, [audioSrc]);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Audio playback failed:', err);
      });
    }
  };

  return playClickSound;
};
