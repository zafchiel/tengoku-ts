import { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import slugify from "@/lib/utils"
import ScoreBadge from "./scoreBadge"

type Props = {
  obj: TopAiring
}

export default function SwiperSlideCard({ obj }: Props) {
  return (
    <Link href={`/${slugify(obj.title)}`}>
      <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
        <section className="absolute top-3 right-3 z-50 border-none">
          <ScoreBadge score={obj.score} />
        </section>
        <Image
          width={300}
          height={400}
          src={obj.images.webp.large_image_url}
          alt={obj.title}
          className="w-full h-full rounded-md hover:scale-125 duration-200 ease-linear"
        />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 rounded-b-lg bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <h1 className="z-10 text-xl font-medium text-white">
            {obj.title.replaceAll('"', "")}
          </h1>
          <div className="flex gap-2 text-muted-foreground">
            {obj.genres.map((e, index) => (
              <p key={index}>{e.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
