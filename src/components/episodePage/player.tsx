"use client"

import { useRef, useEffect } from "react"
import Artplayer from "artplayer"
import Hls from "hls.js"
import { type Option } from "artplayer/types/option"
import { EpisodeUrls } from "@/types"

type Props = {
  option: Omit<Option, 'container'>
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

  return <div ref={artRef} {...rest}></div>
}

export default function Player({urls}: {urls: EpisodeUrls[]}){
  return (
    <ArtPlayer
        option={{
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
            default: obj.quality === '720p',
            html: obj.quality,
            url: obj.url
          }))
        }}

        className="w-full h-full"
      />
  )
}