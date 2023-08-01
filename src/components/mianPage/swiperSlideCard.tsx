import { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import slugify from "@/lib/utils"

type Props = {
  obj: TopAiring
}

export default function SwiperSlideCard({ obj }: Props) {
  return (
    <Link href={`/${slugify(obj.title)}`}>
      <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
        <div className="star absolute h-16 w-16 top-3 right-3 bg-background/80 z-50 p-3 flex justify-center items-center">
          <p className="text-sm">{obj.score}</p>
        </div>
        <Image
          width={300}
          height={400}
          src={obj.images.webp.large_image_url}
          alt={obj.title}
          className="w-full h-full rounded-lg hover:scale-125 duration-200 ease-linear"
        />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 rounded-b-lg bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
          <h1 className="z-10 text-xl font-medium text-white">
            {obj.title.replaceAll('"', "")}
          </h1>
          <div className="flex gap-2 text-gray-300">
            {obj.genres.map((e, index) => (
              <p key={index}>{e.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
