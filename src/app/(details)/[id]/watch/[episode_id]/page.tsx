import Link from "next/link"
import Player from "@/components/episodePage/player"
import NavBar from "@/components/episodePage/navBar"
import { extractNameAndEpisode, fetchSource } from "@/lib/utils"
import { EpisodesRecord, SourcesRecord, getXataClient } from "@/xata/xata"
import { redirect } from "next/navigation"
import { insertNewAnime, updateEpisodesInDb } from "@/xata/anime"
import { fetchAnimeInfo } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authConfig } from "@/pages/api/auth/[...nextauth]"

type Props = {
  params: {
    id: string
    episode_id: string
  }
}

export default async function EpisodePage({ params }: Props) {
  // Fetch anime info for episode list
  const anime = await fetchAnimeInfo(params.id)

  const xata = getXataClient()
  const animeDB = await xata.db.animes.read(anime.id)

  if (animeDB) {
    const episodesInDB = await xata.db.episodes
      .filter({ anime_id: anime.id })
      .getMany()
    if (episodesInDB.length !== anime.totalEpisodes) {
      await updateEpisodesInDb(anime, animeDB.totalEpisodes!)
    }
  }

  if (!animeDB) {
    await insertNewAnime(anime)
  }

  const sourcesArray = await fetchSource(params.episode_id)
  if (sourcesArray === null) redirect(`/${params.id}`)

  const { name, episode } = extractNameAndEpisode(params.episode_id)

  return (
    <div className="flex items-center flex-col justify-center w-full py-14 overflow-x-hidden">
      <Player urls={sourcesArray as SourcesRecord[]} />
      <NavBar episodeList={anime.episodes} params={params} />
      <div className="mt-3 p-2 w-full">
        <h3 className="text-2xl uppercase font-semibold">
          <Link href={`/${name}`}>{name}</Link>
        </h3>
        <p>EP:&nbsp;{episode}</p>
      </div>
    </div>
  )
}
