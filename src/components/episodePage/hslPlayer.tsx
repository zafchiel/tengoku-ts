"use client";

import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
  MediaPlayerProps,
} from "@vidstack/react";

type Props = {
  src: string;
  title: string;
  poster: string;
};

export default function HLSPlayer({ src, title, poster }: Props) {
  return (
    <MediaPlayer
      title={title}
      poster={poster}
      src={src}
      aspectRatio={16 / 9}
      crossorigin=""
      onVolumeChange={(e) => {
        localStorage.setItem(
          "playerPreferences",
          JSON.stringify({
            volume: e.target.volume,
          })
        );
      }}
      volume={
        JSON.parse(localStorage.getItem("playerPreferences") ?? '{"volume": 1}')
          .volume
      }
    >
      <MediaOutlet>
        <MediaPoster alt={title} />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  );
}
