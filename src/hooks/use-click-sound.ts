import { useRef } from 'react';

export const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = () => {
    // Lazily initialize the Audio object on first interaction
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/click.wav');
      audioRef.current.volume = 0.4; // Set volume to 50%
      audioRef.current.preload = 'auto'; // Preload the audio
      audioRef.current.load(); // Load the audio
    }

    // Attempt to play the audio
    audioRef.current.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  };

  return playClickSound;
};
