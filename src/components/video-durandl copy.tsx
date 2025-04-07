import { Hand, ArrowLeft, RotateCcw } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button-new';
import { useClickSound } from '@/hooks/use-click-sound';

const common_btn_classes =
  'fixed z-10 bottom-[4vw] w-max right-[4vw] x-auto text-[3vw] ';

type VideoDurandlProps = {
  screenTouched: boolean;
  setScreenTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoPlaying: boolean;
};

export const VideoDurandl: React.FC<VideoDurandlProps> = ({
  screenTouched,
  setScreenTouched,
  isVideoPlaying,
  setIsVideoPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playClickSound = useClickSound();

  const durandl_video_source =
    'https://glasmuseum-frauenau.de/wp-content/uploads/videos/durandl_voiceover.mp4';

  // const durandl_video_source =
  // 'https://storage.googleapis.com/glameseum/durandl_voiceover.mp4';

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return; // Add null check

    const handleTimeUpdate = () => {
      if (!screenTouched && video.currentTime >= 6) {
        video.currentTime = 0;
        video.play(); // Loop back to start
      }
    };

    if (!isVideoPlaying && !screenTouched) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [screenTouched, isVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return; // Add null check

    if (screenTouched && !isVideoPlaying) {
      video.currentTime = 6; // Start from 6 seconds
      video.muted = false; // Unmute

      video.play().catch((err) => {
        console.warn('Play failed:', err);
      });

      setIsVideoPlaying(true); // Set video playing state
    }
  }, [screenTouched]);

  const reset = () => {
    const video = videoRef.current;

    if (!video) return; // Add null check

    setScreenTouched(false);
    setIsVideoPlaying(false);

    video.muted = true;
    video.currentTime = 0; // Set video to start from 0

    // After resetting, start playing the first 6 seconds
    video.play().catch((err) => {
      console.warn('Play failed:', err);
    });
  };

  const exitToHome = () => {
    playClickSound();
    reset();
  };

  return (
    <div className="relative h-vh">
      <video
        ref={videoRef}
        className="w-full border-0 h-[100vh] object-cover"
        playsInline
        autoPlay
        muted
        onEnded={reset}
      >
        <source src={durandl_video_source} type="video/mp4" />
      </video>

      {screenTouched && (
        <Button
          onClick={exitToHome}
          className={`bg-[#ff6e32] text-white ${common_btn_classes}`}
        >
          <RotateCcw size={'5vw'} />
          <span>Neustart</span>
        </Button>
      )}

      {!screenTouched && (
        <Button className={`bg-white/90 text-slate-800 ${common_btn_classes}`}>
          <span>Bitte Bildschirm tippen</span>
          <Hand size={'5vw'} />
        </Button>
      )}
    </div>
  );
};
