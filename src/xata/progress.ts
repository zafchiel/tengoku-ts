import { getXataClient } from "@/xata/xata";

export async function getUserProgress(user_id: string) {
  const xata = getXataClient();
  const progress = await xata.db.progress
    .filter({
      user: user_id,
    })
    .select(["*", "anime.title", "anime.totalEpisodes", "anime.image"])
    .getMany();

  return progress;
}

export async function getAnimeProgress(user_id: string, anime_id: string) {
  const xata = getXataClient();
  const animeProgress = await xata.db.progress
    .filter({ anime: anime_id, user: user_id })
    .getFirst();
  return animeProgress;
}
