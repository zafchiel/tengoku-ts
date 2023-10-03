import { getXataClient } from "./xata";
import { AnimeInfo, SourceList } from "@/types";
import { fetchSource } from "@/lib/utils";

export async function insertNewAnime(anime: AnimeInfo) {
  const xata = getXataClient();

  const { episodes, ...rest } = anime;
  // Create anime record
  await xata.db.animes.create({ ...rest });

  // Create episodes records
  const eps = episodes.map(async (ep) => {
    const res = await fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${ep.id}`
    );
    const { sources } = await res.json();
    const defaultSource = sources.filter(
      (s: SourceList) => s.quality === "default"
    )[0];

    return {
      anime: anime.id,
      source: defaultSource.url,
      ...ep,
    };
  });
  Promise.all(eps).then((episodesArray) => {
    xata.db.episodes.create(episodesArray);
  });
}

export async function updateEpisodesInDb(
  anime: AnimeInfo,
  currentEpisodesNumber: number = 0
) {
  const xata = getXataClient();

  // Update anime record
  await xata.db.animes.update(anime.id, {
    totalEpisodes: anime.totalEpisodes,
    status: anime.status,
  });

  // Update episodes records
  const eps = anime.episodes.slice(currentEpisodesNumber - 1);

  eps.map(async (ep) => {
    const res = await fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${ep.id}`
    );
    const { sources } = await res.json();
    const defaultSource = sources.filter(
      (s: SourceList) => s.quality === "default"
    )[0];

    return {
      anime: anime.id,
      source: defaultSource.url,
      ...ep,
    };
  });
  Promise.all(eps).then((episodesArray) => {
    xata.db.episodes.create(episodesArray);
  });
}
