import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { VideoSelectList } from "./video-select-list";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/cn";

type VideoPopupProps = {
  currentVideoRef: React.RefObject<HTMLVideoElement>;
  currentVideo: string | null;
  videos: {
    durandl: string[];
    selection: { name: string; src: string }[];
  };
  handleSelectVideo: (src: string) => void;
  handleCloseVideo: () => void;
  setCurrentVideoTime: (time: number) => void;
};

export const VideoPopup: React.FC<VideoPopupProps> = ({
  currentVideoRef,
  currentVideo,
  videos,
  handleSelectVideo,
  handleCloseVideo,
  setCurrentVideoTime,
}) => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    const currentOrientation = window.screen.orientation.type;
    setOrientation(
      currentOrientation.includes("portrait") ? "portrait" : "landscape"
    );
  }, []);

  return (
    <section className="fixed top-0 left-0 h-full w-full p-[5vw] flex flex-col gap-8 items-center justify-center bg-white">
      {!currentVideo ? (
        <motion.div
          key="popup"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.3 },
          }}
          exit={{ opacity: 0, translateY: 0 }}
          className={cn("bg-white w-full space-y-[7vw]", {
            "p-[3vw] max-w-[50%] space-y-[4vw]": orientation === "landscape",
          })}>
          <div
            className={cn("text-left space-y-[2vw]", {
              "space-y-[1vw]": orientation === "landscape",
            })}>
            <h2
              className={cn("text-[7vw] cursor-pointer text-[#374040]", {
                "text-[3.5vw]": orientation === "landscape",
              })}>
              Film auswählen
            </h2>
            <p
              className={cn("text-[3.5vw] text-[#374040]", {
                "text-[2vw]": orientation === "landscape",
              })}>
              Tippe auf einen der Buttons, um den Film anzusehen.
            </p>
          </div>
          <VideoSelectList
            videos={videos.selection}
            handleSelectVideo={handleSelectVideo}
          />
        </motion.div>
      ) : (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.3 },
          }}
          exit={{ opacity: 0, translateY: 0 }}>
          <div
            className={cn("flex flex-col items-start space-y-[5vw]", {
              "max-w-[50%] space-y-[2vw]": orientation === "landscape",
            })}>
            <button
              onClick={handleCloseVideo}
              className={cn(
                "flex justify-center items-center gap-[1.5vw] text-[4vw] uppercase px-[1.5vw] pr-[3vw] cursor-pointer bg-[#ff6e32] text-white",
                {
                  "text-[2vw] px-[1vw] pr-[2vw]": orientation === "landscape",
                }
              )}>
              <ChevronLeft size={orientation === "landscape" ? "3vw" : "5vw"} />
              <span
                className={cn("flex py-[2vw] pt-[3vw] leading-none", {
                  "py-[1.5vw] pt-[2vw]": orientation === "landscape",
                })}>
                Zurück
              </span>
            </button>
            <video
              className={cn("w-full rounded-lg shadow-lg", {})}
              ref={currentVideoRef}
              autoPlay
              controls
              onTimeUpdate={(e) =>
                setCurrentVideoTime(e.currentTarget.currentTime)
              }>
              <source src={currentVideo} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </section>
  );
};
