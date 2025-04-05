import { useEffect } from 'react';

export const useClickAudio = (audioSrc: string) => {
  // Add sound to any clicks
  useEffect(() => {
    const audio = new Audio(audioSrc);

    if (!audio) return;

    document.addEventListener('click', () => {
      audio.play();
    });

    return () => {
      document.removeEventListener('click', () => {
        audio.play();
      });
    };
  }, [audioSrc]);
};
