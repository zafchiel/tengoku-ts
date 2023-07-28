import Player from "@/components/episodePage/player"
import type { SourceList } from "@/types"
import NavBar from "@/components/episodePage/navBar"
import { fetchAnimeInfo } from "@/lib/utils"

type Props = {
  params: {
    id: string
    episode_id: string
  }
}

export default async function EpisodePage({ params }: Props) {
  // Fetch episode urls
  const response = await fetch(
    `https://api.consumet.org/anime/gogoanime/watch/${params.episode_id}`
  )
  const data = await response.json()
  const epSources: SourceList[] = data.sources

  // Fetch anime info for episode list (request cached)
  const anime = await fetchAnimeInfo(params.id)

  return (
    <div className="flex flex-col items-center justify-center w-full py-14 overflow-x-hidden">
      <Player urls={epSources} />
      <NavBar episodeList={anime.episodes} />
      <h3>{params.episode_id.replaceAll("-", " ").toUpperCase()}</h3>
    </div>
  )
}
