import { Button } from "@/components/ui/button"
import Player from "@/components/episodePage/player"
import EpisodeList from "@/components/detailsPage/EpisodeLIst"
import type { AnimeInfo, SourceList } from "@/types"

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

  return (
    <div className="flex flex-col items-center justify-center w-full py-14 overflow-x-hidden">
      <Player urls={epSources} />
      <EpisodeList>
        <Button className="fixed bottom-2 w-full md:static">Episodes</Button>
      </EpisodeList>
    </div>
  )
}
