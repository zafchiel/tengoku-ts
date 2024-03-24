import AnimePosters from "./animePosters";
import StatsCard from "./stats-card";
import { AnimeInfo } from "@/types";

type AnimeDetailsSectionProps = {
  animeInfo: AnimeInfo;
};

export default function 
AnimeDetailsSection({ animeInfo }: AnimeDetailsSectionProps) {

  return (
    <section className="p-4 border mt-4 flex gap-4 flex-wrap">
      {/* <AnimePosters mal_id={animeInfo.mal_id} /> */}
      <StatsCard title="score" value={animeInfo.score.toString()} additional={`${animeInfo.scored_by.toLocaleString()} users`} />
      <StatsCard title="episodes" value={`${animeInfo.type} - ${animeInfo.episodes}`} additional={animeInfo.duration} />
      <StatsCard title="season" value={`${animeInfo.season} - ${animeInfo.year}`} additional={animeInfo.status} />
      <StatsCard title="rating" value={animeInfo.rating} />
    </section>
  );
}
