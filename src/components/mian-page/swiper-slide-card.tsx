import type { AnimeInfoFiltered } from "@/types";
import Link from "next/link";
import Image from "next/image";
import ScoreBadge from "./score-badge";

type Props = {
  anime: AnimeInfoFiltered;
  first?: boolean;
};

export default function SwiperSlideCard({ anime, first }: Props) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="relative h-full max-h-[500px] aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md">
        <section className="absolute top-3 left-3 z-50 border-none">
          <ScoreBadge score={anime.score ?? 0} />
        </section>
        <Image
          width={300}
          height={400}
          src={anime.images?.webp.large_image_url ?? "/bg_placeholder.webp"}
          alt={anime.title ?? "Anime Image"}
          priority={first}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/bg_placeholder.webp";
          }}
          className="w-full h-full object-cover rounded-sm hover:scale-110 duration-200 ease-linear"
        />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <h1 className="z-10 text-xl font-semibold">
            {anime.title?.replaceAll('"', "")}
          </h1>
          <div className="flex gap-2 text-muted-foreground">
            {anime.genres?.map((genre) => <p key={genre.name}>{genre.name}</p>)}
          </div>
        </div>
      </div>
    </Link>
  );
}
