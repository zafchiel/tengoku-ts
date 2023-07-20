import MainCarousel from "@/components/mianPage/carousel"
import MainHeading from "@/components/mianPage/heading"
import TrailerPlayer from "@/components/mianPage/trailerPlayer"
import { TopAiring } from "@/types"

export default async function HomePage() {
  const res = await fetch(
    "https://api.jikan.moe/v4/top/anime?filter=airing&limit=6"
  )
  const { data: topAiringAnime }: { data: TopAiring[] } = await res.json()
  return (
    <>
      <TrailerPlayer topAiringAnime={topAiringAnime} />
      <main className="flex flex-col lg:flex-row h-screen w-full p-10">
        <MainHeading />
        <MainCarousel topAiringAnime={topAiringAnime} />
      </main>
    </>
  )
}
