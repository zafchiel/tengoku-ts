"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import AnimePosters from "./animePosters";
import DetailedInfo from "./detailedInfo";
import { Skeleton } from "../ui/skeleton";

type Props = {
  anime_id: string;
};

export default function 
AnimeDetailsSection({ anime_id }: Props) {
  const [detailedAnimeInfo, setDetailedAnimeInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        if (error instanceof AxiosError) console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnimeInfo();
  }, [anime_id]);

  if (isLoading) return <Skeleton className="w-full h-80 m-5" />;

  if (!detailedAnimeInfo) return null;

  return (
    <section className="w-full flex gap-3">
      <AnimePosters mal_id={detailedAnimeInfo.mal_id} />
      <DetailedInfo info={detailedAnimeInfo} />
    </section>
  );
}
