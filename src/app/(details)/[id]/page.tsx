import { redirect } from "next/navigation";
import Image from "next/image";
import Description from "@/components/detailsPage/Description";
import EpisodeList from "@/components/detailsPage/EpisodeLIst";
import { Button, buttonVariants } from "@/components/ui/button";
import slugify, { fetchAnimeInfo } from "@/lib/utils";
import { getXataClient } from "@/xata/xata";
import getBase64 from "@/lib/getBase64Image";
import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import FollowButton from "@/components/detailsPage/followButton";
import { insertNewAnime } from "@/xata/anime";
import Link from "next/link";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailsPage({ params }: Props) {
  const xata = getXataClient();
  // Search anime by slug
  const anime = await fetchAnimeInfo(params.id);

  if (!anime) redirect("/");

  const animeRecordInDB = await xata.db.animes.read(anime.id);

  if (!animeRecordInDB) {
    await insertNewAnime(anime);
  }

  const imgBase64 = await getBase64(anime.image!);

  const session = await getServerSession(authConfig);
  let progress = null;
  if (session?.user) {
    progress = await xata.db.progress
      .filter({ anime: params.id, user: session?.user?.id })
      .getFirst();
  }

  // Fetch more detailed info from jikan
  let animeMalID: number;
  let detailedAnimeInfo: any;
  let animePics = [];
  let relatedAnime = [];
  try {
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        q: params.id,
        limit: 1,
      },
    });
    if (data.data) {
      detailedAnimeInfo = data.data[0];

      // Fetch anime posters
      const {
        data: { data: animePicturesData },
      } = await axios.get(
        `https://api.jikan.moe/v4/anime/${detailedAnimeInfo.mal_id}/pictures`,
      );
      animePics = animePicturesData;

      // Fetch anime relations
      // const {
      //   data: { data: animeRelations },
      // } = await axios.get(
      //   `https://api.jikan.moe/v4/anime/${animeMalID}/relations`,
      // );
      // relatedAnime = animeRelations
      //   .filter((obj: any) => obj.relation !== "Adaptation")
      //   .map((obj: any) => obj.entry);
      // console.log(relatedAnime[0].name);
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <div className="w-full flex flex-col items-center p-4 md:pt-14">
        <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
        <div className="md:flex h-full">
          <div className="w-full h-full">
            <Image
              src={anime.image!}
              placeholder="blur"
              blurDataURL={imgBase64}
              width={400}
              height={500}
              alt={"Anime image"}
              className="md:static md:h-auto fixed inset-0 h-screen w-full -z-20 object-cover"
            />
          </div>
          <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
            <div className="flex">
              <h1 className="text-4xl font-bold uppercase">
                {anime.title as string}
              </h1>
              <p className="ml-1">{anime.releaseDate}</p>
            </div>
            <p className="opacity-60 mb-2">{anime.otherName}</p>
            {anime.description && <Description paragraph={anime.description} />}

            <div className="grid grid-cols-4 md:flex flex-wrap items-center justify-center opacity-70 gap-3">
              {anime.genres!.map((obj) => (
                <p key={obj}>{obj}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-3/4 gap-2 p-2">
          <Link
            href={`/${params.id}/pics`}
            className={buttonVariants({ variant: "outline", className: "p-2" })}
          >
            Pics
          </Link>
          <EpisodeList episodeList={anime.episodes!}>
            <Button className="w-full">Watch Now</Button>
          </EpisodeList>
          <FollowButton
            isFollowed={progress !== null}
            session={session}
            animeId={anime.id}
          />
        </div>
        <section className="w-full flex gap-3">
          {detailedAnimeInfo && (
            <div className="flex p-2 w-full min-h-full rounded-md shadow-sm">
              {animePics.length > 1 && (
                <>
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-bold uppercase">Posters</h2>
                    <div className="flex flex-col gap-2">
                      {animePics?.map((obj: any) => (
                        <Image
                          key={obj.webp.large_image_url}
                          src={obj.webp.large_image_url}
                          width={300}
                          height={500}
                          alt="image"
                        />
                      ))}
                    </div>
                  </div>
                  <Separator orientation="vertical" className="mx-4" />
                </>
              )}

              <div className="relative text-3xl">
                <p className="text-9xl absolute top-32 left-52 font-extrabold text-muted-foreground -z-10 opacity-30">
                  {detailedAnimeInfo.title_japanese}
                </p>
                <div className="">
                  <span className="text-muted-foreground">rating:</span>{" "}
                  {detailedAnimeInfo.score}
                </div>
                <div className="">
                  <span className="text-muted-foreground">season:</span>{" "}
                  {detailedAnimeInfo.season} + {detailedAnimeInfo.year}
                </div>
                <div className="">
                  <span className="text-muted-foreground">episodes:</span>{" "}
                  {detailedAnimeInfo.episodes}
                </div>
                <div className="flex gap-1">
                  <span className="text-muted-foreground">studios: </span>

                  {detailedAnimeInfo.studios.map((obj: any) => (
                    <p>{obj.name + ", "}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/*{relatedAnime.length > 0 && (*/}
          {/*  <div>*/}
          {/*    <h2 className="text-3xl uppercase">Related</h2>*/}
          {/*    <div>*/}
          {/*      {relatedAnime.map((obj: any) => (*/}
          {/*        <Link key={obj.url} href={slugify(obj.name)}>*/}
          {/*          {obj.name}*/}
          {/*        </Link>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </section>
      </div>
    </>
  );
}
