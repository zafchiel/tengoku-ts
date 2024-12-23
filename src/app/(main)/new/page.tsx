import NewCarousel from "@/components/mian-page/carousel";
import type { AnimeInfoFiltered, AnimeInfo } from "@/types";
import { propertiesToKeep } from "@/types";
import { JIKAN_API_TOP_ANIME_URL } from "@/lib/constants";

export default async function NewMainPage() {
	let topAiringData: AnimeInfoFiltered[] = [];
	try {
		const response = await fetch(
			`${JIKAN_API_TOP_ANIME_URL}?filter=airing&limit=6`,
			{
				// Revalidate every 7 days
				next: { revalidate: 60 * 60 * 24 * 7 },
			},
		);
		if (!response.ok) {
			throw new Error(`HTTP Error! status: ${response.status}`);
		}
		const data = (await response.json()).data as AnimeInfo[];

		topAiringData = data.map((anime) => {
			const newItem: AnimeInfoFiltered = {};
			for (const property of propertiesToKeep) {
				if (Object.hasOwn(anime, property)) {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(newItem as any)[property] = anime[property];
				}
			}
			return newItem;
		});
	} catch (error) {
		console.log(error);
		topAiringData = [];
	}
	return (
		<main className="py-14 px-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-screen items-center gap-8">
			<div>
				<h1 className="text-6xl font-bold">
					Bleach: Sennen Kessen-hen - Soukoku-tan
				</h1>
				<p className="text-muted-foreground">
					Bleach: Sennen Kessen-hen - Soukoku-tan
				</p>
			</div>
			<NewCarousel slides={topAiringData} options={{ loop: true }} />
		</main>
	);
}
