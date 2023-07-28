import { RecentEpisode } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
  ep: RecentEpisode
}

export default function RecentEpisodeCard({ ep }: Props) {
  return (
    <div className="relative h-full aspect-[4/5] w-1/2 p-2 sm:w-40 overflow-hidden rounded-md shadow-md">
      <Link href={`/${ep.id}/watch/${ep.episodeId}`}>
        <div className="flex absolute top-0 inset-x-0 bg-background/70 p-2 justify-center items-center">
          Episode:&nbsp;<p>{ep.episodeNumber}</p>
        </div>
        <Image
          width={400}
          height={500}
          src={ep.image}
          alt={ep.title}
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-background/70 p-2 text-sm">
          <p>{ep.title}</p>
        </div>
      </Link>
    </div>
  )
}
