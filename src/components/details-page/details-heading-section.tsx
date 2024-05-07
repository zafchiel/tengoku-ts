"use client";

import { AnimeInfo } from "@/types";
import { PosterImage } from "./poster-image";

type HeadingSectionProps = {
  animeInfo: AnimeInfo;
  imgBase64: string;
};

export default function DetailsHeadingSection({
  animeInfo,
  imgBase64,
}: HeadingSectionProps) {
  return (
    <div id="description" className="md:flex">
      <PosterImage
        alt="dw"
        src={animeInfo.images.webp.large_image_url}
        imgBase64={imgBase64}
      />

      <div className="flex flex-col justify-start md:p-4 md:max-w-md lg:max-w-xl">
        <div className="flex">
          <h1 className="text-4xl font-bold uppercase">{animeInfo.title}</h1>
          <p className="ml-1">{animeInfo.year}</p>
        </div>
        <p className="text-muted-foreground">{animeInfo.title_japanese}</p>
        <p className="grow">{animeInfo.synopsis ?? "No synposis"}</p>

        <div className="flex flex-wrap items-center justify-center text-muted-foreground gap-3">
          {animeInfo.genres.map((genre) => (
            <p key={genre.name}>{genre.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
