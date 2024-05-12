import axios from "axios";
import type { Recommendation } from "@/types";
import { JIKAN_API_URL } from "@/lib/constants";

type RecommendationsSectionProps = {
  animeId: string | number;
};

export default async function RecommendationsSection({
  animeId,
}: RecommendationsSectionProps) {
  let recommendations: Recommendation[] = [];
  try {
    recommendations = (
      await axios
        .get<{
          data: Recommendation[];
        }>(`https://api.jikan.moe/v4/anime/30831/recommendations`)
        .then((res) => res.data.data)
    ).slice(0, 5);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <pre>{JSON.stringify(recommendations, null, 2)}</pre>
    </div>
  );
}
