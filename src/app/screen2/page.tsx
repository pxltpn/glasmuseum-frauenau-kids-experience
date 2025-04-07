'use client';

import { useEffect, useState } from 'react';
import { VideoDurandl } from '@/components/video-durandl';
import { useClickSound } from '@/hooks/use-click-sound';

export default function Home() {
  const [screenTouched, setScreenTouched] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playClickSound = useClickSound();

  const handleClick = () => {
    if (!isVideoPlaying) {
      setScreenTouched(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', playClickSound);

    return () => {
      document.removeEventListener('click', playClickSound);
    };
  }, [isVideoPlaying]);

  return (
    <main onClick={handleClick} className="h-vh">
      <VideoDurandl
        screenTouched={screenTouched}
        setScreenTouched={setScreenTouched}
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
      />
    </main>
  );
}
