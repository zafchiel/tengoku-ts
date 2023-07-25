import Player from "@/components/episodePage/player"
import React from "react"

export default function EpisodePage() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Player
        option={{
          container: ".artplayer-app",
          url: "https://artplayer.org/assets/sample/video.mp4",
        }}
        style={{
          width: "600px",
          height: "400px",
          margin: "60px auto 0",
        }}
      />
    </div>
  )
}
