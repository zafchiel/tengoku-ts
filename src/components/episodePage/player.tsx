"use client"

import { useRef, useEffect } from "react"
import Artplayer from "artplayer"
import Hls from "hls.js"
import { type Option } from "artplayer/types/option"

type Props = {
  option: Option
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

export default function Player(){
  return (
    <ArtPlayer
        option={{
          container: ".artplayer-app",
          url: "https://www013.vipanicdn.net/streamhls/1715c2c8077bd3e9be2a448731b0de77/ep.1.1677608728.360.m3u8",
          customType: {
            m3u8: function (video: any, url: string) {
              let hls = new Hls()
              hls.loadSource(url)
              hls.attachMedia(video)
              if (!video.src) {
                video.src = url
              }
            },
          },
        }}
        className="w-full h-full"
      />
  )
}