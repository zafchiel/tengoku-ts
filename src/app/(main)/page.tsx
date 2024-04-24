"use client"

import MainCarousel from "@/components/mian-page/main-carousel";
import MainHeading from "@/components/mian-page/heading";
import TrailerPlayer from "@/components/mian-page/trailer-player";
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
