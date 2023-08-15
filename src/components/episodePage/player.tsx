"use client";

import { useRef, useEffect, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { type Option } from "artplayer/types/option";
import { SourcesRecord } from "@/xata/xata";
import axios from "axios";
import { useSession } from "next-auth/react";
import { SourceList, UserProgressData } from "@/types";

type ArtPlayerDeepProps = {
  option: Omit<Option, "container">;
  anime_id: string;
  epNumber: number;
  animeLength: number;
};

export function ArtPlayer({
  option,
  anime_id,
  epNumber,
  animeLength,
  ...rest
}: ArtPlayerDeepProps) {
  const { data: session } = useSession();
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current as HTMLDivElement,
    });

    art.on("video:timeupdate", async ({ target }) => {
      if (!session?.user) {
        art.off("video:timeupdate");
        return;
      }
      // @ts-ignore
      const progress = parseInt((target.currentTime / target.duration) * 100);
      if (progress > 66) {
        try {
          await axios.patch(`/api/user/updateExisitngProgress`, {
            user_id: session?.user?.id,
            anime_id,
            progress: epNumber,
            status: epNumber === animeLength ? "Completed" : "Watching",
          });
        } catch (error) {
          console.log(error);
        } finally {
          art.off("video:timeupdate");
        }
      }
    });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, []);

  return (
    <div ref={artRef} className="aspect-[16/9] w-screen px-2" {...rest}></div>
  );
}

type PlayerProps = {
  urls: SourceList[];
} & Omit<ArtPlayerDeepProps, "option">;

export default function Player({
  urls,
  anime_id,
  epNumber,
  animeLength,
}: PlayerProps) {
  const defaultQuality = urls.filter(
    (obj) => obj.quality === "1080p" || "720p"
  )[0].url;
  return (
    <ArtPlayer
      option={{
        url: defaultQuality,
        customType: {
          m3u8: function (video: HTMLMediaElement, url: string) {
            let hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            if (!video.src) {
              video.src = url;
            }
          },
        },
        quality: urls.map((obj) => ({
          default: obj.quality === ("1080p" || "720p"),
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
      anime_id={anime_id}
      epNumber={epNumber}
      animeLength={animeLength}
    />
  );
}
