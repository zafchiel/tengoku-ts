import { getXataClient } from "./xata";
import { AnimeInfo } from "@/types";
import { fetchSource } from "@/lib/utils";

export async function insertNewAnime(anime: AnimeInfo) {
  const xata = getXataClient();

  const { episodes, ...rest } = anime;
  // Create anime record
  console.log({ ...rest });
  await xata.db.animes.create({ ...rest });

  // Create episodes records
  const eps = episodes.map((ep) => {
    const res = fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${ep.id}`,
    ).then((res) => {
      return res.json();
    });
    return {
      anime_id: anime.id,
      sources: res,
      ...ep,
    };
  });
}

export async function updateEpisodesInDb(
  anime: AnimeInfo,
  currentEpisodesNumber: number = 0,
) {
  const xata = getXataClient();

  // Update anime record
  await xata.db.animes.update(anime.id, {
    totalEpisodes: anime.totalEpisodes,
    status: anime.status,
  });

  // Update episodes records
  const eps = anime.episodes
    .slice(currentEpisodesNumber - 1)
    .map((ep) => ({ anime_id: anime.id, ...ep }));
  const epsArr = await xata.db.episodes.create([...eps]);
}
