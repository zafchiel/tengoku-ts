import { redirect } from "next/navigation"
import type { AnimeInfo } from "@/types"

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

  const episodeArr = anime.episodes.map(async (an) => {
    const res = await fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${an.id}?server=gogocdn`
    )
    const urls = await res.json()
    return urls
  })

  return (
    <main className="w-full">
      <section className="container flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold uppercase p-4">{anime.title}</h1>
        <div>
          {anime.episodes.map((obj) => (
            <div key={obj.id}>{obj.id}</div>
          ))}
        </div>
      </section>
    </main>
  )
}
