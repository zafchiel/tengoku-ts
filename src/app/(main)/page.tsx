import MainCarousel from "@/components/mian-page/main-carousel";
import MainHeading from "@/components/mian-page/heading";
import TrailerPlayer from "@/components/mian-page/trailer-player";
import { TopAiringContextProvider } from "@/components/providers/top-airing-context";
import { JIKAN_API_TOP_ANIME_URL } from "@/lib/constants";
import type { AnimeInfo } from "@/types";

export default async function HomePage() {
	const topAiring = await fetch(
		`${JIKAN_API_TOP_ANIME_URL}?filter=airing&limit=6`,
		{ cache: "force-cache" },
	);
	const topAiringData = (await topAiring.json()).data as AnimeInfo[];

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
