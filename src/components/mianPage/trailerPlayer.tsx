"use client"

import { useState } from "react"
import { TopAiring } from "@/types"
import YouTube from "react-youtube"
import Image from "next/image"

const regex = /\/embed\/([a-zA-Z0-9_-]+)\?/
const randomVideoStartSecond = Math.floor(Math.random() * 40)

export default function TrailerPlayer({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring
}) {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleLoadedVideo = () => {
    setVideoLoaded(true)
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-10 h-full w-full overflow-hidden bg-black/40"></div>
      <YouTube
        videoId={topAiringAnime[0].trailer.youtube_id}
        iframeClassName={`absolute w-full h-screen -z-10 ${
          !videoLoaded && "hidden"
        }`}
        onError={() => setVideoLoaded(false)}
        onPlay={handleLoadedVideo}
        onEnd={() => setVideoLoaded(false)}
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            disablekb: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            showinfo: 0,
            start: randomVideoStartSecond,
          },
        }}
      />
      <Image
        src={`https://img.youtube.com/vi/${topAiringAnime[0].trailer.youtube_id}/maxresdefault.jpg`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="image"
        className="-z-20 h-full w-full object-cover"
      />
    </>
  )
}
