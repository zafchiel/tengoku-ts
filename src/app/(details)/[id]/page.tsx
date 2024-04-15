import getBase64 from "@/lib/get-base64-image";
import AnimeDetailsSection from "@/components/detailsPage/anime-details-section";
import { JIKAN_API_URL } from "@/lib/constants";
import axios from "axios";
import { AnimeInfo } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import HeadingSection from "@/components/detailsPage/details-heading-section";
import ListingButtons from "@/components/detailsPage/listing-buttons";
import { cn } from "@/lib/utils";

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
      .get<{ data: AnimeInfo }>(JIKAN_API_URL + `/anime/${params.id}`)
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
      <main className="container space-y-4 px-2 md:px-4 md:pt-14 md:mt-10">
        <div className="fixed -z-10 bg-black/80 inset-0 w-full h-screen md:hidden"></div>
        <HeadingSection animeInfo={anime} imgBase64={imgBase64!} />
        <div className="w-full md:max-w-xl" >
          <ListingButtons animeId={anime.mal_id} maxEpisodes={anime.episodes} />
        </div>
        <AnimeDetailsSection animeInfo={anime} />
      </main>
    </>
  );
}
