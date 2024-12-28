import type { AnimeInfoFiltered } from "@/types";
import Link from "next/link";
import Image from "next/image";
import ScoreBadge from "./score-badge";

type Props = {
	anime: AnimeInfoFiltered;
	first?: boolean;
};

export default function Slide({ anime, first }: Props) {
	return (
		<Link
			href={`/anime/${anime.mal_id}`}
			// className="shadow-md shadow-primary/30 scale-105"
		>
			<div className="relative h-full max-h-[500px] aspect-[3/4] w-full overflow-hidden rounded-sm">
				<section className="absolute top-3 left-3 z-50 border-none">
					<ScoreBadge score={anime.score ?? 0} />
				</section>
				<Image
					width={300}
					height={400}
					src={anime.images?.webp.large_image_url ?? "/bg_placeholder.webp"}
					alt={anime.title ?? "Anime Image"}
					priority={first}
					className="w-full h-full object-cover rounded-sm hover:scale-110 duration-200 ease-linear"
				/>
				<div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-2">
					<h1 className="z-10 text-xl font-semibold">
						{anime.title?.replaceAll('"', "")}
					</h1>
					<div className="flex flex-wrap gap-x-2 text-muted-foreground">
						{anime.genres?.map((genre) => (
							<p key={genre.name}>{genre.name}</p>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}
