import axios from "axios";
import type { Recommendation } from "@/types";
import { JIKAN_API_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

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
        }>(`${JIKAN_API_URL}/anime/${animeId}/recommendations`)
        .then((res) => res.data.data)
    ).slice(0, 6);
  } catch (error) {
    console.log(error);
  }
  return (
    <section id="recommendations" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">Recommendations</h3>
      <p className="text-muted-foreground">
        These anime were voted as simillar by community
      </p>
      <hr className="mb-2" />

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 px-2">
          {recommendations.map((recommendation) => (
            <Link
              key={recommendation.url}
              href={`/anime/${recommendation.entry.mal_id}`}
            >
              <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
                <Image
                  width={400}
                  height={500}
                  src={recommendation.entry.images.webp.large_image_url}
                  alt={recommendation.entry.title}
                  className="w-full h-full rounded-lg hover:scale-105 duration-200 ease-linear"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background to-transparent px-2 pb-1 pt-10">
                  <p className="font-semibold">{recommendation.entry.title}</p>
                  <div className="flex flex-col text-gray-300">
                    <p>
                      Votes:&nbsp;
                      <span className="font-semibold">
                        {recommendation.votes}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-2">There are no recommendations yet.</p>
      )}
    </section>
  );
}
