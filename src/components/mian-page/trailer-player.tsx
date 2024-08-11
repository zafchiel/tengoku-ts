"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { TopAiringContext } from "../providers/top-airing-context";
import type { AnimeInfoFiltered } from "@/types";
import dynamic from "next/dynamic";

const YouTubePlayer = dynamic(() => import("./youtube-player"), { ssr: false });

type TrailerPlayerProps = {
  topAiring: AnimeInfoFiltered[];
};

export default function TrailerPlayer({ topAiring }: TrailerPlayerProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { currentAnimeIndex } = useContext(TopAiringContext);

  const handleLoadedVideo = (loaded: boolean) => {
    console.log("loaded", loaded);
    setVideoLoaded(loaded);
  };

  if (topAiring.length < 1 || !topAiring[currentAnimeIndex]) return null;

  return (
    <div
      className="absolute min-h-screen"
      onMouseEnter={() => {
        if (!showVideo) {
          setShowVideo(true);
        }
      }}
    >
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden bg-black/40"></div>

      {showVideo && (
        <YouTubePlayer
          topAiring={topAiring}
          handleLoadedVideo={handleLoadedVideo}
        />
      )}

      <Image
        src={`https://img.youtube.com/vi/${topAiring[currentAnimeIndex].trailer?.youtube_id ?? ""}/maxresdefault.jpg`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="image"
        className="-z-30 absolute h-full w-full object-cover"
      />
    </div>
  );
}
