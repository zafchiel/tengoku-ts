import getBase64 from "@/lib/get-base64-image";
import AnimeDetailsSection from "@/components/details-page/anime-details-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import HeadingSection from "@/components/details-page/details-heading-section";
import ListingButtons from "@/components/details-page/listing-buttons";
import RelationsSection from "@/components/details-page/relations-section";
import CharactersSection from "@/components/details-page/characters-sections";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAnimeInfoFull } from "@/lib/utils";
import OpeningsSection from "@/components/details-page/openings-section";
import AnimeDetailsNavigation from "@/components/details-page/anime-details-navigation";
import RecommendationsSection from "@/components/details-page/recommendations-section";
import ExternalLinksSection from "@/components/details-page/external-links-section";

type DetailsPageProps = {
	params: {
		animeId: string;
	};
};

export default async function DetailsPage({ params }: DetailsPageProps) {
	const anime = await fetchAnimeInfoFull(params.animeId);

	if (!anime)
		return (
			<main className="container px-1 md:py-24">
				<Alert variant="destructive" className="max-w-xl">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Anime not found. Please try searching again.
					</AlertDescription>
				</Alert>
			</main>
		);

	const imgBase64 = await getBase64(anime.images.webp.large_image_url);

	if (!imgBase64) {
		return (
			<main className="container px-1 md:py-24">
				<Alert variant="destructive" className="max-w-xl">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Anime not found. Please try searching again.
					</AlertDescription>
				</Alert>
			</main>
		);
	}

	return (
		<>
			<div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
			<main className="grid gird-cols-1 md:grid-cols-[400px_1fr] gap-4 px-2 md:px-4 md:py-14 md:mt-10 w-fit mx-auto">
				<div className="md:col-span-2">
					<HeadingSection animeInfo={anime} imgBase64={imgBase64} />
				</div>

				<section className="col-span-2 md:col-span-1">
					<div className="w-full md:max-w-xl">
						<ListingButtons animeInfo={anime} />
					</div>

					<AnimeDetailsNavigation />
				</section>

				<section className="md:max-w-5xl w-full space-y-28">
					<AnimeDetailsSection animeInfo={anime} />

					<RelationsSection animeRelations={anime.relations} />

					<Suspense fallback={<Skeleton className="w-full h-96" />}>
						<CharactersSection animeId={anime.mal_id} />
					</Suspense>

					<OpeningsSection theme={anime.theme} />

					<Suspense fallback={<Skeleton className="w-full h-96" />}>
						<RecommendationsSection animeId={params.animeId} />
					</Suspense>

					<ExternalLinksSection
						externalLinks={anime.external}
						streamingLinks={anime.streaming}
					/>
				</section>
			</main>
		</>
	);
}
