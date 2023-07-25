"use client"

import Player from "@/components/episodePage/player"
import Hls from "hls.js"

export default function EpisodePage() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Player
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
    </div>
  )
}
