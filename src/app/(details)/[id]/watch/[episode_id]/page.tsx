import Link from "next/link";
import NavBar from "@/components/episodePage/navBar";
import {
  extractEpisodeNumber,
  extractNameAndEpisode,
  fetchSource,
} from "@/lib/utils";
import { getXataClient } from "@/xata/xata";
import { redirect } from "next/navigation";
import { insertNewAnime, updateEpisodesInDb } from "@/xata/anime";
import { fetchAnimeInfo } from "@/lib/utils";
import MarkAsWatchedButton from "@/components/episodePage/markAsWatchedButton";
import HLSPlayer from "@/components/episodePage/hslPlayer";

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
  const animeRecordInDB = await xata.db.animes.read(anime.id);

  if (animeRecordInDB && anime.status !== "Completed") {
    const episodesInDB = await xata.db.episodes
      .filter({ anime: animeRecordInDB.id })
      .getAll();
    if (episodesInDB.length !== anime.totalEpisodes) {
      await updateEpisodesInDb(anime, episodesInDB.length);
    }
  }

  if (!animeRecordInDB) {
    await insertNewAnime(anime);
  }

  const sourcesArray = await fetchSource(params.episode_id);
  if (sourcesArray.length < 1) redirect(`/${params.id}`);

  const defaultQualitySource = sourcesArray.filter(
    (source) => source.quality === "default"
  )[0];

  if (!defaultQualitySource) redirect(`/${params.id}`);

  const epNumber = extractEpisodeNumber(params.episode_id);

  const { name, episode } = extractNameAndEpisode(params.episode_id);

  return (
    <>
      <div className="flex items-center flex-col justify-center w-full overflow-x-hidden md:pt-14 px-1 md:px-4">
        <HLSPlayer
          title={anime.title + " - Ep: " + epNumber}
          poster={anime.image}
          src={defaultQualitySource.url}
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
            animeStatus={anime.status}
            animeLength={anime.totalEpisodes}
            anime_id={anime.id}
            epNumber={episode}
          />
        </section>
      </div>
    </>
  );
}
