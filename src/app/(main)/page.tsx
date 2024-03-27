"use client"

import MainCarousel from "@/components/mianPage/mainCarousel";
import MainHeading from "@/components/mianPage/heading";
import TrailerPlayer from "@/components/mianPage/trailerPlayer";
import { TopAiringContextProvider } from "@/components/providers/top-airing-context";

export default function HomePage() {
  return (
    <TopAiringContextProvider>
      <TrailerPlayer />
      <main className="flex flex-col lg:flex-row h-screen w-full px-2 pb-14 md:p-10 items-center justify-center">
        <MainHeading />
        <MainCarousel/>
      </main>
    </TopAiringContextProvider>
  );
}
