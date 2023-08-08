import { getXataClient } from "@/xata/xata";

export async function getUserProgress(user_id: string) {
  const xata = getXataClient();
  const progress = await xata.db.progress
    .filter({
      user: user_id,
    })
    .select(["*", "anime.title", "anime.totalEpisodes"])
    .getMany();

  return progress;
}
