import { RecentEpisodesResponseSchema } from "@/types"
import RecentEpisodeCard from "./recentEpisodeCard"

type Props = {
  episodes: RecentEpisodesResponseSchema
}

export default function RecentEpisodesSection({ episodes }: Props) {
  return (
    <>
      <h1 className="text-3xl p-5 font-bold">Recently added episodes</h1>

      <section className="w-full p-5 flex flex-wrap">
        {episodes.results.map((obj) => (
          <RecentEpisodeCard key={obj.episodeId} ep={obj} />
        ))}
      </section>
    </>
  )
}
