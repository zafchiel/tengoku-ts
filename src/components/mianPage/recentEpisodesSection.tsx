"use client";

import { RecentEpisode } from "@/types";
import RecentEpisodeCard from "./recentEpisodeCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function RecentEpisodesSection() {
  const [recentEpisodes, setRecentEpisodes] = useState<RecentEpisode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const ref = useRef<HTMLButtonElement | null>(null);

  const fetchMoreEpisodes = useCallback(async () => {
    setLoading(true);
    if (!hasNextPage) {
      console.log("No More :3");
      return;
    }
    try {
      const { data } = await axios.get(
        "https://api.consumet.org/anime/gogoanime/recent-episodes",
        { params: { page: currentPage } }
      );
      setRecentEpisodes((prev) => [...prev, ...data.results]);
      setCurrentPage((prev) => prev + 1);
      if (!data.hasNextPage) setHasNextPage(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting === true && loading === false)
          fetchMoreEpisodes();
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7,
      }
    );

    const refElement = ref.current;

    if (refElement) observer.observe(refElement);

    return () => {
      if (refElement) observer.unobserve(refElement);
    };
  }, [ref, loading, fetchMoreEpisodes]);

  return (
    <>
      <h1 className="text-3xl p-5 font-bold">Recently added episodes</h1>

      <section className="w-full p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
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
  );
}
