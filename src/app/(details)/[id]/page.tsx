import { redirect } from "next/navigation";
import Image from "next/image";
import Description from "@/components/detailsPage/Description";
import EpisodeList from "@/components/detailsPage/EpisodeLIst";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchAnimeInfo } from "@/lib/utils";
import getBase64 from "@/lib/getBase64Image";
import FollowButton from "@/components/detailsPage/followButton";
import { insertNewAnime } from "@/xata/anime";
import Link from "next/link";
import AnimeDetailsSection from "@/components/detailsPage/animeDetailsSection";
import { AlertCircle } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TriggerToastComponent from "@/components/detailsPage/triggerToastComponent";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailsPage({ params }: Props) {
  // Search anime by slug
  const anime = await fetchAnimeInfo(params.id);

  if (!anime) redirect("/");

  const imgBase64 = await getBase64(anime.image!);

  // const session = await getServerSession(authConfig);
  // let progress = null;
  // if (session?.user) {
  //   progress = await xata.db.progress
  //     .filter({ anime: params.id, user: session?.user?.id })
  //     .getFirst();
  // }

  return (
    <>
      <TriggerToastComponent />
      <div className="w-full flex flex-col items-center p-4 md:pt-14">
        <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
        <div className="md:flex h-full">
          <div>
            <Image
              src={anime.image!}
              placeholder="blur"
              blurDataURL={imgBase64}
              width={400}
              height={500}
              alt={"Anime image"}
              className="md:static fixed inset-0 h-screen md:h-auto w-full -z-20 object-cover"
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${params.id}/pics`}
                  className={buttonVariants({
                    variant: "destructive",
                    className: "font-light",
                  })}
                >
                  <AlertCircle className="w-8 h-8 mr-2" />
                  NSFW Pics
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                Random pictures from booru - may contain nudity!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <EpisodeList episodeList={anime.episodes!}>
            <Button className="w-full">Watch Now</Button>
          </EpisodeList>
          {/* <FollowButton
            isFollowed={progress !== null}
            session={session}
            animeId={anime.id}
          /> */}
        </div>
        <AnimeDetailsSection anime_id={params.id} />
      </div>
    </>
  );
}
