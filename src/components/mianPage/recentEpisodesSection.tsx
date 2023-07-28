"use client"

import { RecentEpisodesResponseSchema } from "@/types"
import RecentEpisodeCard from "./recentEpisodeCard"
import { useState, useEffect } from "react"
import useAxios from "axios-hooks"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

type Props = {
  episodes: RecentEpisodesResponseSchema
}

export default function RecentEpisodesSection({ episodes }: Props) {
  const [recentEpisodes, setRecentEpisodes] = useState(episodes.results)
  const [currentPage, setCurrentPage] = useState(2)

  const [{ data, loading, error }] = useAxios({
    url: "https://api.consumet.org/anime/gogoanime/recent-episodes",
    params: { page: currentPage },
  })

  useEffect(() => {
    if (data === undefined) return

    setRecentEpisodes((prev) => [...prev, ...data.results])
  }, [currentPage])

  return (
    <>
      <h1 className="text-3xl p-5 font-bold">Recently added episodes</h1>

      <section className="w-full p-5 flex flex-wrap">
        {recentEpisodes.map((obj) => (
          <RecentEpisodeCard key={obj.episodeId} ep={obj} />
        ))}
      </section>
      <Button
        disabled={loading}
        onClick={() => {
          if (data.hasNextPage) setCurrentPage((prev) => prev + 1)
        }}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          <p>Load More</p>
        )}
      </Button>
    </>
  )
}
