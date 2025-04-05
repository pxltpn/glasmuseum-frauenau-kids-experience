import { cn } from "@/utils/cn";
import React, { FC, useEffect, useState } from "react";

type Video = {
  name: string;
  src: string;
};

type VideoSelectListProps = {
  videos: Video[];
  handleSelectVideo: (videoSrc: string) => void;
};

export const VideoSelectList = ({
  videos,
  handleSelectVideo,
}: VideoSelectListProps) => {
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
    <ul className="flex flex-col gap-[2vw]">
      {videos.map((video) => (
        <li
          onClick={() => handleSelectVideo(video.src)}
          key={video.name}
          className={cn(
            "bg-[#ff6e32] text-white uppercase text-[3.5vw] p-[3vw] cursor-pointer",
            {
              "text-[2vw] p-[1.5vw]": orientation === "landscape",
            }
          )}>
          {video.name}
        </li>
      ))}
    </ul>
  );
};
