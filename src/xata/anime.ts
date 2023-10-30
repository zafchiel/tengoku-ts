import { getXataClient } from "./xata";
import { AnimeInfo, SourceList } from "@/types";

export async function insertNewAnime(anime: AnimeInfo) {
  try {
    const xata = getXataClient();

    const { episodes, ...rest } = anime;
    // Create anime record
    await xata.db.animes.create({ ...rest });

    // Create episodes records
    const episodesArray = await Promise.all(
      episodes.map(async (ep) => {
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

    xata.db.episodes.create(episodesArray);
  } catch (error) {
    console.error(`Failed to insert ${anime.id}: ${error}`);
  }
}

export async function updateEpisodesInDb(
  anime: AnimeInfo,
  currentEpisodesNumber = 0
) {
  try {
    const xata = getXataClient();

    // Update anime record
    await xata.db.animes.update(anime.id, {
      totalEpisodes: anime.totalEpisodes,
      status: anime.status,
    });

    // Create missing episodes records
    const episodesCurrentlyNotInDB = anime.episodes.slice(
      currentEpisodesNumber
    );

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

    xata.db.episodes.create(episodesArray);
  } catch (error) {
    console.error(
      `Failed to update episodes in DB for anime ${anime.id}: ${error}`
    );
  }
}
