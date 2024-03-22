"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { JIKAN_API_ANIME_URL } from "@/lib/constants";

type Props = {
  mal_id: number;
};

export default function AnimePosters({ mal_id }: Props) {
  const [animePics, setAnimePics] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnimePosters = async () => {
      try {
        // Fetch anime posters
        const {
          data: { data: animePicturesData },
        } = await axios.get(
          `${JIKAN_API_ANIME_URL}/${mal_id}/pictures`
        );
        setAnimePics(animePicturesData);
      } catch (error) {
        if (error instanceof AxiosError) console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimePosters();
  }, [mal_id]);

  if (isLoading) return <Skeleton className="h-80 w-52" />;

  if (animePics.length < 1) return null;

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold uppercase">Posters</h2>
        <div className="flex flex-col gap-2">
          {animePics?.map((obj: any) => (
            <Image
              key={obj.webp.large_image_url}
              src={obj.webp.large_image_url}
              width={300}
              height={500}
              alt="image"
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="mx-4" />
    </>
  );
}
