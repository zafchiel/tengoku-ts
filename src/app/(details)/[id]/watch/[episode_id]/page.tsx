import Player from "@/components/episodePage/player"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"
import type { AnimeInfo } from "@/types"

type Props = {
  params: {
    id: string
    episode_id: string
  }
}


export default async function EpisodePage({params}: Props) {
  // Search anime by slug
  const search = await fetch(`https://api.consumet.org/anime/gogoanime/${params.id}`)
  const searchResults = await search.json()

  // Fetch detailed info of first record found
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${searchResults.results[0].id}`
  )
  const anime: AnimeInfo = await res.json()

  return (
    <div className="flex items-center justify-center w-full h-80">
      <Player />
      <EpisodeList episodeList={anime.episodes} />
    </div>
  )
}
