import Player from "@/components/episodePage/player"
import type { SourceList } from "@/types"
import NavBar from "@/components/episodePage/navBar"
import { extractNameAndEpisode, fetchAnimeInfo } from "@/lib/utils"

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

  const { name, episode } = extractNameAndEpisode(params.episode_id)

  return (
    <div className="flex items-center flex-col justify-center w-full py-14 overflow-x-hidden">
      <Player urls={epSources} />
      <NavBar episodeList={anime.episodes} />
      <div className="mt-3 p-2 w-full">
        <h3 className="text-2xl uppercase font-semibold">{name}</h3>
        <p>EP:&nbsp;{episode}</p>
      </div>
    </div>
  )
}
