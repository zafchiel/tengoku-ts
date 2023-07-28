"use client"

import { useState } from "react"
import YouTube from "react-youtube"
import Image from "next/image"
import { useAtomValue } from "jotai/react"
import { currentAnimeAtom } from "./mainCarousel"

const randomVideoStartSecond = Math.floor(Math.random() * 40)

export default function TrailerPlayer() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const currentAnime = useAtomValue(currentAnimeAtom)

  const handleLoadedVideo = () => {
    setVideoLoaded(true)
  }

  if (Object.keys(currentAnime).length === 0) {
    return (
      <Image
        src="/bg_placeholder.webp"
        height={900}
        width={1600}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="image"
        className="-z-30 h-screen w-screen object-cover"
      />
    )
  }

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden bg-black/40"></div>

      <YouTube
        videoId={currentAnime.trailer.youtube_id}
        iframeClassName={`absolute w-full h-screen -z-20 ${
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
        src={`https://img.youtube.com/vi/${currentAnime.trailer.youtube_id}/maxresdefault.jpg`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="image"
        className="-z-30 h-full w-full object-cover"
      />
    </>
  )
}
