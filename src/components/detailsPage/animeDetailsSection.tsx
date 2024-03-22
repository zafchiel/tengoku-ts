import AnimePosters from "./animePosters";
import DetailedInfo from "./detailedInfo";
import { AnimeInfo } from "@/types";

type AnimeDetailsSectionProps = {
  animeInfo: AnimeInfo;
};

export default function 
AnimeDetailsSection({ animeInfo }: AnimeDetailsSectionProps) {

  return (
    <section className="w-full flex gap-3 mt-8">
      <AnimePosters mal_id={animeInfo.mal_id} />
      <DetailedInfo info={animeInfo} />
    </section>
  );
}
