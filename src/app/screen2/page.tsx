'use client';

import { useState, useEffect, useRef } from 'react';
import { VideoDurandl } from '@/components/video-durandl';
import { useClickSound } from '@/hooks/use-click-sound';

export default function Home() {
  const [screenTouched, setScreenTouched] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playClickSound = useClickSound('/sounds/click.wav');

  const handleClick = () => {
    if (!isVideoPlaying) {
      playClickSound(); // Play the click sound
      setScreenTouched(true);
    }
  };

  return (
    <main onClick={handleClick} className="h-dvh">
      {/* <AnimatePresence> */}
      <VideoDurandl
        screenTouched={screenTouched}
        setScreenTouched={setScreenTouched}
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
      />

      {/* </AnimatePresence> */}
    </main>
  );
}
