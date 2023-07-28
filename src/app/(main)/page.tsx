// import MainCarousel from "@/components/mianPage/carousel"
import MainCarousel from "@/components/mianPage/mainCarousel"
import MainHeading from "@/components/mianPage/heading"
import TrailerPlayer from "@/components/mianPage/trailerPlayer"
import { RecentEpisodesResponseSchema, TopAiring } from "@/types"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import RecentEpisodesSection from "@/components/mianPage/recentEpisodesSection"

export default async function HomePage() {
  // Fetch top airing anime
  const res = await fetch(
    "https://api.jikan.moe/v4/top/anime?filter=airing&limit=6"
  )
  const { data: topAiringAnime }: { data: TopAiring[] } = await res.json()

  // Fetch recently added episodes
  const res2 = await fetch(
    "https://api.consumet.org/anime/gogoanime/recent-episodes?type=1"
  )
  const recentEpisodes: RecentEpisodesResponseSchema = await res2.json()

  return (
    <>
      <TrailerPlayer topAiringAnime={topAiringAnime} />
      <main className="flex flex-col lg:flex-row h-screen w-full p-10 items-center justify-center">
        <MainHeading topAiringAnime={topAiringAnime} />
        <MainCarousel topAiringAnime={topAiringAnime} />
      </main>
      <RecentEpisodesSection episodes={recentEpisodes} />
    </>
  )
}
