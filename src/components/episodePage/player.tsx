"use client"

import { useRef, useEffect } from "react"
import Artplayer from "artplayer"
import Hls from "hls.js"
import { type Option } from "artplayer/types/option"
import { SourcesRecord } from "@/xata/xata"

type Props = {
  option: Omit<Option, "container">
}

export function ArtPlayer({ option, ...rest }: Props) {
  const artRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current as HTMLDivElement,
    })

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [])

  return (
    <div ref={artRef} className="aspect-[16/9] w-screen px-2" {...rest}></div>
  )
}

export default function Player({ urls }: { urls: SourcesRecord[] }) {
  return (
    <ArtPlayer
      option={{
        url: urls.filter((obj) => obj.quality === "720p")[0].url!,
        customType: {
          m3u8: function (video: HTMLMediaElement, url: string) {
            let hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
            if (!video.src) {
              video.src = url
            }
          },
        },
        quality: urls.map((obj) => ({
          default: obj.quality === "720p"!,
          html: obj.quality!,
          url: obj.url!,
        })),
        autoplay: false,
        autoOrientation: true,
        pip: true,
        autoSize: true,
        autoMini: false,
        setting: true,
        playbackRate: true,
        fullscreen: true,
        miniProgressBar: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        airplay: true,
        theme: "#fff",
        controls: [],
      }}
    />
  )
}
