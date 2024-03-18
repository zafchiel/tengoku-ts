"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AnimeInfo, SearchResult } from "@/types";
import { Button } from "@/components/ui/button";
import SearchResultCard from "@/components/mianPage/searchResultCard";
import { Loader2 } from "lucide-react";
import DetailsHoverCard from "@/components/ui/detailsHoverCard";
import { JIKAN_API_ANIME_URL } from "@/lib/constants";

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<AnimeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const currentPage = searchParams.get("page") ?? 1;
  // const [queryController, setQueryController] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!hasNextPage) return;
      setIsLoading(true);
      // if (queryController !== query) setSearchResults([]);
      try {
        const response = await axios.get<SearchResult>(JIKAN_API_ANIME_URL, {
          params: {
            q: query,
            limit: 5,
            page: currentPage,
            sfw: true,
          },
        });
        console.log(response.data);
        setSearchResults((prev) => [...prev, ...response.data.data]);
        if (!response.data.pagination.has_next_page) setHasNextPage(false);
        // setQueryController(query!);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const navigateToNextPage = useCallback(() => {
    router.replace(`/search?q=${query}&page=${Number(currentPage)! + 1}`, {
      scroll: false,
    });
  }, [query, currentPage, router]);

  return (
    <main className="md:pt-14 p-5">
      <h3 className="text-lg text-muted-foreground p-2">
        search results:
        <span className="text-3xl text-foreground font-light pl-2">
          {query}
        </span>
      </h3>
      <section className="w-full pb-14 md:pb-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {searchResults.map((anime, index) => (
          <DetailsHoverCard key={index} anime={anime}>
            <SearchResultCard anime={anime} />
          </DetailsHoverCard>
        ))}
      </section>
      <div className="p-3">
        <Button
          disabled={isLoading || !hasNextPage}
          onClick={() => navigateToNextPage()}
          className="w-full"
        >
          {!hasNextPage ? (
            <p>No More</p>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            <p>Load More</p>
          )}
        </Button>
      </div>
    </main>
  );
}
