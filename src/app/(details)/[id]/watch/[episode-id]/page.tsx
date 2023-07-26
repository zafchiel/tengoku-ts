import Player from "@/components/episodePage/player"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"

export default function EpisodePage({params: {id, episode-id}}: {params: {id: string, episode-id: string}}) {
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
    <div className="flex items-center justify-center h-screen w-full">
      <Player />
      <EpisodeList />
    </div>
  )
}
