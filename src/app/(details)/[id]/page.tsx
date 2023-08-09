import { redirect } from "next/navigation";
import Image from "next/image";
import Description from "@/components/detailsPage/Description";
import EpisodeList from "@/components/detailsPage/EpisodeLIst";
import { Button } from "@/components/ui/button";
import { fetchAnimeInfo, fetchSource } from "@/lib/utils";
import { ProgressRecord, getXataClient } from "@/xata/xata";
import getBase64 from "@/lib/getBase64Image";
import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import FollowButton from "@/components/detailsPage/followButton";
import { insertNewAnime } from "@/xata/anime";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailsPage({ params }: Props) {
  const xata = getXataClient();
  // Search anime by slug
  const anime = await fetchAnimeInfo(params.id);

  const animeDB = await xata.db.animes.read(anime.id);

  if (!anime) redirect("/");

  if (animeDB === null) {
    await insertNewAnime(anime);
  }

  const imgBase64 = await getBase64(anime.image);

  const session = await getServerSession(authConfig);
  if (!session || !session.user) redirect("/api/auth/login");

  const progress = await xata.db.progress
    .filter({ anime: params.id, user: session?.user?.id })
    .getMany();

  return (
    <div className="w-full flex flex-col items-center pt-14">
      <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
      <div className="md:flex h-full">
        <div className="w-full h-full">
          <Image
            src={anime.image}
            placeholder="blur"
            blurDataURL={imgBase64}
            width={400}
            height={500}
            alt={anime.title}
            className="md:static md:h-auto fixed inset-0 h-screen w-full -z-20 object-cover"
          />
        </div>
        <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
          <div className="flex">
            <h1 className="text-4xl font-bold uppercase">{anime.title}</h1>
            <p className="ml-1">{anime.releaseDate}</p>
          </div>
          <p className="opacity-60 mb-2">{anime.otherName}</p>
          {anime.description && <Description paragraph={anime.description} />}

          <div className="grid grid-cols-4 md:flex flex-wrap items-center justify-center opacity-70 gap-3">
            {anime.genres.map((obj) => (
              <p key={obj}>{obj}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-3/4 gap-2 p-2">
        <EpisodeList episodeList={anime.episodes}>
          <Button className="w-full">Watch Now</Button>
        </EpisodeList>
        <FollowButton
          disabled={progress?.length !== 0}
          session={session}
          animeId={params.id}
        />
      </div>
    </div>
  );
}
