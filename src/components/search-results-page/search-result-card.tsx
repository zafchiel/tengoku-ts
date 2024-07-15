import { AnimeInfo } from "@/types";
import Image from "next/image";

type Props = {
	anime: AnimeInfo;
};

export default function SearchResultCard({ anime }: Props) {
	return (
		<div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
			<Image
				width={400}
				height={500}
				src={anime.images.webp.large_image_url}
				alt={anime.title}
				className="w-full h-full rounded-lg hover:scale-105 duration-200 ease-linear"
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
				<p className="font-semibold">{anime.title}</p>
				<div className="flex flex-col text-gray-300">
					<p>
						Type:&nbsp;<span className="font-semibold">{anime.type}</span>
					</p>
					<p className="uppercase">
						{anime.year
							? `${anime.season} - ${anime.year}`
							: new Date(anime.aired.from).getFullYear().toString()}
					</p>
				</div>
			</div>
		</div>
	);
}
