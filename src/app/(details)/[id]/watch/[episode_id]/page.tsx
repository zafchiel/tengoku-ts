import Player from "@/components/episodePage/player"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"
import type { AnimeInfo, EpisodeUrls } from "@/types"

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


  // Fetch episode urls
  const response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${params.episode_id}`)
  const data = await response.json()
  const episode: EpisodeUrls[] = data.sources

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-screen h-screen">

      <Player urls={episode} />
      </div>
      <EpisodeList episodeList={anime.episodes} />
    </div>
  )
}
