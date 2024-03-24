import Image from "next/image";
import getBase64 from "@/lib/getBase64Image";
import AnimeDetailsSection from "@/components/detailsPage/animeDetailsSection";
import { JIKAN_API_ANIME_URL } from "@/lib/constants";
import axios from "axios";
import { AnimeInfo } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type DetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  let anime: AnimeInfo | null = null;
  
  // Search anime by slug
  try {
    anime = await axios
      .get<{ data: AnimeInfo }>(JIKAN_API_ANIME_URL + `/${params.id}`)
      .then((res) => res.data.data);
    
  } catch (error) {
    console.log(error);
  }

  if (!anime) return (
    <main className="container px-1 md:py-24">

    <Alert variant="destructive" className="max-w-xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Anime not found. Please try searching again.
      </AlertDescription>
    </Alert>
    </main>
  )

  const imgBase64 = await getBase64(anime.images.webp.large_image_url);

  return (
    <>
      <main className="container px-1 md:pt-14">
        <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
        <div className="md:flex">
          <div>
            <Image
              src={anime.images.webp.large_image_url}
              placeholder="blur"
              blurDataURL={imgBase64}
              width={400}
              height={500}
              alt={"Anime poster for " + anime.title}
              className="md:static fixed inset-0 h-screen md:h-auto w-full -z-20 object-cover"
            />
          </div>
          <div className="flex flex-col justify-start p-4 md:max-w-md lg:max-w-xl">
            <div className="flex">
              <h1 className="text-4xl font-bold uppercase">{anime.title}</h1>
              <p className="ml-1">{anime.year}</p>
            </div>
            <p className="opacity-60 mb-2">{anime.title_japanese}</p>
            <p className="grow">{anime.synopsis ?? "No synposis"}</p>

            <div className="flex flex-wrap items-center justify-center opacity-70 gap-3">
              {anime.genres.map((genre) => (
                <p key={genre.name}>{genre.name}</p>
              ))}
            </div>
          </div>
        </div>
        <AnimeDetailsSection animeInfo={anime} />
      </main>
    </>
  );
}
