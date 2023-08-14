"use client";

import { useAtomValue } from "jotai/react";
import { useHydrateAtoms } from "jotai/utils";
import { currentAnimeAtom } from "./mainCarousel";
import { TopAiring } from "@/types";

type Props = {
  topAiringAnime: TopAiring[];
};

export default function MainHeading({ topAiringAnime }: Props) {
  const currentAnime = useAtomValue(currentAnimeAtom);
  useHydrateAtoms([[currentAnimeAtom, topAiringAnime[0]]]);

  return (
    <section className="z-20 md:mt-20 flex h-3/5 w-full flex-col items-center justify-center p-5 lg:h-full lg:w-2/5">
      <h1 className="mb-3 text-4xl font-bold md:text-6xl">
        {currentAnime.title}
      </h1>
      <p className="text-primary/70">{currentAnime.title_english}</p>
    </section>
  );
}
