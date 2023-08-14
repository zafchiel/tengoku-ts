import Link from "next/link"
import Player from "@/components/episodePage/player"
import NavBar from "@/components/episodePage/navBar"
import { extractNameAndEpisode, fetchSource } from "@/lib/utils"
import { ProgressRecord, SourcesRecord, getXataClient } from "@/xata/xata"
import { redirect } from "next/navigation"
import { insertNewAnime, updateEpisodesInDb } from "@/xata/anime"
import { fetchAnimeInfo } from "@/lib/utils"
import EpPageHeader from "@/components/episodePage/epPageHeader"
import { getServerSession } from "next-auth"
import { authConfig } from "@/pages/api/auth/[...nextauth]"
import { UserProgressData } from "@/types"

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

  const session = await getServerSession(authConfig)
  let userProgress: UserProgressData | null = null
  if (session?.user) {
    //@ts-ignore
    const progressRecord = await xata.db.progress
      .filter({ anime: params.id, user: session?.user.id })
      .getFirst()
    if (progressRecord) {
      userProgress = {
        progress_id: progressRecord.id,
        user_id: session.user.id,
        progress: progressRecord.progress!,
        status: progressRecord.status,
      }
    }
  }

  return (
    <>
      <EpPageHeader />
      <div className="flex items-center flex-col justify-center w-full py-14 overflow-x-hidden">
        <Player urls={sourcesArray as SourcesRecord[]} />
        <NavBar
          userProgress={userProgress}
          episodeList={anime.episodes}
          params={params}
        />
        <div className="mt-3 p-2 w-full">
          <h3 className="text-2xl uppercase font-semibold">
            <Link href={`/${params.id}`}>{name}</Link>
          </h3>
          <p>EP:&nbsp;{episode}</p>
        </div>
      </div>
    </>
  )
}
