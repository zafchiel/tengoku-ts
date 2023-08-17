import Link from "next/link";
import Player from "@/components/episodePage/player";
import NavBar from "@/components/episodePage/navBar";
import { extractNameAndEpisode, fetchSource } from "@/lib/utils";
import { getXataClient } from "@/xata/xata";
import { redirect } from "next/navigation";
import { insertNewAnime, updateEpisodesInDb } from "@/xata/anime";
import { fetchAnimeInfo } from "@/lib/utils";
import MarkAsWatchedButton from "@/components/episodePage/markAsWatchedButton";

type Props = {
  params: {
    id: string;
    episode_id: string;
  };
};

export default async function EpisodePage({ params }: Props) {
  // Fetch anime info for episode list
  const anime = await fetchAnimeInfo(params.id);

  const xata = getXataClient();
  const animeDB = await xata.db.animes.read(anime.id);

  if (animeDB) {
    const episodesInDB = await xata.db.episodes
      .filter({ anime_id: anime.id })
      .getAll();
    if (episodesInDB.length !== anime.totalEpisodes) {
      await updateEpisodesInDb(anime, animeDB.totalEpisodes!);
    }
  }

  if (!animeDB) {
    await insertNewAnime(anime);
  }

  const sourcesArray = await fetchSource(params.episode_id);
  if (!sourcesArray) redirect(`/${params.id}`);

  const { name, episode } = extractNameAndEpisode(params.episode_id);

  return (
    <>
      <div className="flex items-center flex-col justify-center w-full overflow-x-hidden">
        <Player
          animeLength={anime.totalEpisodes}
          anime_id={anime.id}
          epNumber={episode}
          urls={sourcesArray}
        />
        <NavBar episodeList={anime.episodes} params={params} />
        <section className="mt-3 p-2 w-full">
          <h3 className="text-2xl uppercase font-semibold">
            <Link href={`/${params.id}`}>{name}</Link>
          </h3>
          <p>EP:&nbsp;{episode}</p>
        </section>
        <section>
          <MarkAsWatchedButton
            animeLength={anime.totalEpisodes}
            anime_id={anime.id}
            epNumber={episode}
          />
        </section>
      </div>
    </>
  );
}
