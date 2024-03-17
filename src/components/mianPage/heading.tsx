"use client";

import { useContext } from "react";
import { TopAiringContext } from "../global/top-airing-context";

export default function MainHeading() {
  const { topAiring, currentAnimeIndex, loading } = useContext(TopAiringContext);

  if(!topAiring.length || loading) return null;
  
  return (
    <section className="z-20 md:mt-20 flex h-3/5 w-full flex-col items-center justify-center p-5 lg:h-full lg:w-2/5">
      <h1 className="mb-3 text-4xl font-bold md:text-6xl">
        {topAiring[currentAnimeIndex].title}
      </h1>
      <p className="text-primary/70">{topAiring[currentAnimeIndex].title_english}</p>
    </section>
  );
}
