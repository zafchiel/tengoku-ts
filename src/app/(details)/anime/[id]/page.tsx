import { redirect } from "next/navigation"
import type { AnimeInfo } from "@/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import Description from "@/components/detailsPage/Description"

export default async function DetailsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${id}`,
    { cache: "no-store" }
  )
  const anime: AnimeInfo = await res.json()

  if (Object.keys(anime).length === 1) {
    redirect("http://localhost:3000")
  }

  return (
    <main className="w-full">
      <section className="container flex flex-col items-center">
        <div className="flex h-full">
          <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
          <Image
            src={anime.image}
            width={400}
            height={500}
            alt={anime.title}
            className="aspect-[4/5] md:static md:h-auto fixed inset-0 -z-20 object-cover h-screen w-full"
          />
          <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
            <div className="flex mb-2">
              <h1 className="text-4xl font-bold uppercase">{anime.title}</h1>
              <p className="ml-1">{anime.releaseDate}</p>
            </div>
            <p className="opacity-60">{anime.otherName}</p>
            {anime.description && <Description paragraph={anime.description} />}

            <div className="flex opacity-70 gap-3">
              {anime.genres.map((obj) => (
                <p key={obj}>{obj}</p>
              ))}
            </div>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:w-3/4 m-4 w-full">Watch Now</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Pick your poison</SheetTitle>
              <SheetDescription>
                choosing will redirect you to episode page
              </SheetDescription>
            </SheetHeader>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
              {anime.episodes.map((obj) => (
                <Link
                  href={`anime/watch/${obj.id}`}
                  key={obj.id}
                  className="p-4 border flex justify-center items-center rounded-lg hover:bg-secondary"
                >
                  {obj.number}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </main>
  )
}
