import MainCarousel from "@/components/mian-page/main-carousel";
import MainHeading from "@/components/mian-page/heading";
import TrailerPlayer from "@/components/mian-page/trailer-player";
import { TopAiringContextProvider } from "@/components/providers/top-airing-context";
import { JIKAN_API_TOP_ANIME_URL } from "@/lib/constants";
import type { AnimeInfo, AnimeInfoFiltered } from "@/types";
import { propertiesToKeep } from "@/types";

export default async function HomePage() {
  let topAiringData: AnimeInfoFiltered[] = [];
  try {
    const response = await fetch(
      `${JIKAN_API_TOP_ANIME_URL}?filter=airing&limit=6`,
      {
        // Revalidate every 7 days
        next: { revalidate: 60 * 60 * 24 * 7 },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const data = (await response.json()).data as AnimeInfo[];

    topAiringData = data.map((anime) => {
      const newItem: AnimeInfoFiltered = {};
      for (const property of propertiesToKeep) {
        if (Object.hasOwn(anime, property)) {
          (newItem as any)[property] = anime[property];
        }
      }
      return newItem;
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <TopAiringContextProvider>
      <TrailerPlayer topAiring={topAiringData} />
      <main className="flex flex-col lg:flex-row h-screen w-full px-2 pb-14 md:p-10 items-center justify-center">
        <MainHeading topAiring={topAiringData} />
        <MainCarousel topAiring={topAiringData} />
      </main>
    </TopAiringContextProvider>
  );
}
