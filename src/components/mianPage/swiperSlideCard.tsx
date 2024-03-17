import { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import ScoreBadge from "./scoreBadge"

type Props = {
  anime: TopAiring
}

export default function SwiperSlideCard({ anime }: Props) {
  return (
    <Link href={`/${anime.mal_id}`}>
      <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
        <section className="absolute top-3 right-3 z-50 border-none">
          <ScoreBadge score={anime.score} />
        </section>
        <Image
          width={300}
          height={400}
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="w-full h-full rounded-md hover:scale-125 duration-200 ease-linear"
        />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 rounded-b-lg bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <h1 className="z-10 text-xl font-medium text-white">
            {anime.title.replaceAll('"', "")}
          </h1>
          <div className="flex gap-2 text-muted-foreground">
            {anime.genres.map((genre) => (
              <p key={genre.name}>{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
