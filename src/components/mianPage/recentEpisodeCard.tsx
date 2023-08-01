import { RecentEpisode } from "@/types"
import Image from "next/image"
import Link from "next/link"

type Props = {
  ep: RecentEpisode
}

export default function RecentEpisodeCard({ ep }: Props) {
  return (
    <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
      <Link href={`/${ep.id}/watch/${ep.episodeId}`}>
        <Image
          width={400}
          height={500}
          src={ep.image}
          alt={ep.title}
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <p className="font-semibold">{ep.title}</p>
          <div className="flex text-gray-300">
            <p>EP:&nbsp;<span>{ep.episodeNumber}</span></p>
          </div>
        </div>
      </Link>
    </div>
  )
}
