"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AnimePosters from "./animePosters";
import DetailedInfo from "./detailedInfo";

type Props = {
  anime_id: string;
};

export default function AnimeDetailsSection({ anime_id }: Props) {
  const [detailedAnimeInfo, setDetailedAnimeInfo] = useState<any>(null);

  useEffect(() => {
    const fetchAnimeInfo = async () => {
      try {
        const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
          params: {
            q: anime_id,
            limit: 1,
          },
        });
        if (data.data) {
          setDetailedAnimeInfo(data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimeInfo();
  }, [anime_id]);

  if (!detailedAnimeInfo) return null;

  return (
    <section className="w-full flex gap-3">
      <AnimePosters mal_id={detailedAnimeInfo.mal_id} />
      <DetailedInfo info={detailedAnimeInfo} />
    </section>
  );
}
