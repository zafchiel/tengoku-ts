import { getXataClient } from "./xata"
import { AnimeInfo } from "@/types"
import { fetchSource } from "@/lib/utils"

export async function insertNewAnime(anime: AnimeInfo) {
  const xata = getXataClient()

  const { episodes, ...rest } = anime
  // Create anime record
  await xata.db.animes.create({ ...rest })

  // Create episodes records
  const eps = episodes.map((ep) => ({ anime_id: anime.id, ...ep }))
  const epsArr = await xata.db.episodes.create([...eps])

  // Create souces records
  epsArr.map((ep) => {
    fetchSource(ep.id).then((res) => {
      res.map(async (srcObj) => {
        try {
          await xata.db.sources.create({ episode_id: ep.id, ...srcObj })
        } catch (error) {
          console.log(error)
        }
      })
    })
  })
}
