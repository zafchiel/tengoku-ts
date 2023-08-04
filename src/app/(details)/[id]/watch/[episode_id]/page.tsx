import Link from "next/link"
import Player from "@/components/episodePage/player"
import NavBar from "@/components/episodePage/navBar"
import { extractNameAndEpisode } from "@/lib/utils"
import { EpisodesRecord, SourcesRecord, getXataClient } from "@/xata/xata"
import { redirect } from "next/navigation"

type Props = {
  params: {
    id: string
    episode_id: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const xata = getXataClient()
  const srcs = await xata.db.sources
    .filter({ episode_id: params.episode_id })
    .getMany()

  const sources = srcs.map((obj) => ({
    isM3U8: obj.isM3U8,
    url: obj.url,
    quality: obj.quality,
  }))

  const epsArr = await xata.db.episodes
    .filter({ anime_id: params.id })
    .getMany()

  const eps = epsArr.map((obj) => ({
    id: obj.id,
    number: obj.number,
  }))

  // Fetch episode urls
  // const response = await fetch(
  //   `https://api.consumet.org/anime/gogoanime/watch/${params.episode_id}`
  // )
  // const data = await response.json()
  // const epSources: SourceList[] = data.sources

  // Fetch anime info for episode list (request cached)
  // const anime = await fetchAnimeInfo(params.id)

  const { name, episode } = extractNameAndEpisode(params.episode_id)

  if (srcs === null) redirect(`/${params.id}`)

  return (
    <div className="flex items-center flex-col justify-center w-full py-14 overflow-x-hidden">
      <Player urls={sources as SourcesRecord[]} />
      <NavBar episodeList={eps as EpisodesRecord[]} />
      <div className="mt-3 p-2 w-full">
        <h3 className="text-2xl uppercase font-semibold">
          <Link href={`/${name}`}>{name}</Link>
        </h3>
        <p>EP:&nbsp;{episode}</p>
      </div>
    </div>
  )
}
