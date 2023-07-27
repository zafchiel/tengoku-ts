import { redirect } from "next/navigation"
import type { AnimeInfo } from "@/types"
import Image from "next/image"
import Description from "@/components/detailsPage/Description"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"
import { Button } from "@/components/ui/button"

export default async function DetailsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  // Search anime by slug
  const search = await fetch(`https://api.consumet.org/anime/gogoanime/${id}`)
  const searchResults = await search.json()

  // Fetch detailed info of first record found
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${searchResults.results[0].id}`
  )
  const anime: AnimeInfo = await res.json()

  if (Object.keys(anime).length === 1) {
    redirect("http://localhost:3000")
  }

  return (
    <main className="w-full flex flex-col items-center">
      <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
      <div className="md:flex h-full">
        <div className="w-1/3 h-full">
          <Image
            src={anime.image}
            width={400}
            height={500}
            alt={anime.title}
            className="md:static md:h-auto fixed inset-0 h-screen w-full -z-20 object-cover"
          />
        </div>
        <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
          <div className="flex">
            <h1 className="text-4xl font-bold uppercase">{anime.title}</h1>
            <p className="ml-1">{anime.releaseDate}</p>
          </div>
          <p className="opacity-60 mb-2">{anime.otherName}</p>
          {anime.description && <Description paragraph={anime.description} />}

          <div className="grid grid-cols-4 md:flex flex-wrap items-center justify-center opacity-70 gap-3">
            {anime.genres.map((obj) => (
              <p key={obj}>{obj}</p>
            ))}
          </div>
        </div>
      </div>
      <EpisodeList episodeList={anime.episodes} >
      <Button className="md:w-3/4 m-4 w-full">Watch Now</Button>

      </EpisodeList>
    </main>
  )
}
