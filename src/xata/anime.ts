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
  currentEpisodesNumber = 0
) {
  const xata = getXataClient();

  // Update anime record
  await xata.db.animes.update(anime.id, {
    totalEpisodes: anime.totalEpisodes,
    status: anime.status,
  });

  // Create missing episodes records
  const episodesCurrentlyNotInDB = anime.episodes.slice(currentEpisodesNumber);

  const episodesArray = await Promise.all(
    episodesCurrentlyNotInDB.map(async (ep) => {
      const res = await fetch(
        `https://api.consumet.org/anime/gogoanime/watch/${ep.id}`
      );
      const { sources } = await res.json();
      const defaultSource = sources.find(
        (s: SourceList) => s.quality === "default"
      );

      return {
        anime: anime.id,
        source: defaultSource.url,
        ...ep,
      };
    })
  );

  console.log(episodesArray);
  // xata.db.episodes.create(episodesArray);
}
