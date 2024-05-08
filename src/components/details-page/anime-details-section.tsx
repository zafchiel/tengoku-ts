import StatsCard from "./stats-card";
import { AnimeInfo } from "@/types";

type AnimeDetailsSectionProps = {
  animeInfo: AnimeInfo;
};

export default function AnimeDetailsSection({
  animeInfo,
}: AnimeDetailsSectionProps) {
  const airingInfo = animeInfo.season
    ? `${animeInfo.season} - ${animeInfo.year}`
    : animeInfo.aired.from
      ? new Date(animeInfo.aired.from).getFullYear().toString()
      : "unknown";

  return (
    <section
      id="stats"
      className="p-1 md:p-4 border flex gap-4 flex-wrap rounded-sm"
    >
      {/* <AnimePosters mal_id={animeInfo.mal_id} /> */}
      {animeInfo.score && (
        <StatsCard
          title="score"
          value={`${animeInfo.score}`}
          additional={`${animeInfo.scored_by?.toLocaleString()} users`}
        />
      )}
      {animeInfo.episodes ? (
        <StatsCard
          title="episodes"
          value={
            animeInfo.type === "Movie" || animeInfo.type === "Music"
              ? animeInfo.type
              : `${animeInfo.type} - ${animeInfo.episodes} ep`
          }
          additional={animeInfo.duration}
        />
      ) : (
        <StatsCard title="episodes" value="unknown" />
      )}
      <StatsCard
        title="season"
        value={airingInfo}
        additional={animeInfo.status}
      />
      <StatsCard title="rating" value={animeInfo.rating} />
    </section>
  );
}
