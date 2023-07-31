"use client"

import { RecentEpisodesResponseSchema } from "@/types"
import RecentEpisodeCard from "./recentEpisodeCard"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import axios from "axios"

type Props = {
  episodes: RecentEpisodesResponseSchema
}

export default function RecentEpisodesSection({ episodes }: Props) {
  const [recentEpisodes, setRecentEpisodes] = useState(episodes.results)
  const [currentPage, setCurrentPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)

  const ref = useRef<HTMLButtonElement | null>(null)

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  }

  
  const fetchMoreEpisodes = async () => {
    setLoading(true)
    if(!hasNextPage) {
      console.log('No More :3')
      return
    }
    try {
      const {data} = await axios.get('https://api.consumet.org/anime/gogoanime/recent-episodes', {params: {page: currentPage}})
      setRecentEpisodes((prev) => [...prev, ...data.results])
      setCurrentPage((prev) => prev + 1)
      if(!data.hasNextPage) setHasNextPage(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if(entry.isIntersecting === true && loading === false) fetchMoreEpisodes()
    }, observerOptions)

    if(ref.current) observer.observe(ref.current)

    return () => {
      if(ref.current) observer.unobserve(ref.current)
    }
  }, [ref, observerOptions])


  return (
    <>
      <h1 className="text-3xl p-5 font-bold">Recently added episodes</h1>

      <section  className="w-full p-5 flex flex-wrap">
        {recentEpisodes.map((obj) => (
          <RecentEpisodeCard key={obj.episodeId} ep={obj} />
        ))}
      </section>
      <div className="p-3">
        <Button
        ref={ref}
          disabled={loading}
          onClick={() => fetchMoreEpisodes()}
          className="w-full"
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
      </div>
    </>
  )
}
