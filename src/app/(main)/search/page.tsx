"use client";

import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SearchResult } from "@/types";
import { Button } from "@/components/ui/button";
import SearchResultCard from "@/components/mianPage/searchResultCard";
import { Loader2 } from "lucide-react";
import DetailsHoverCard from "@/components/ui/detailsHoverCard";

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const ref = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams()!;
  const query = searchParams.get("query");
  const currentPage = searchParams.get("page");
  const [queryController, setQueryController] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      if (!hasNextPage) {
        console.log("No More :3");
        return;
      }
      if (queryController !== query) setSearchResults([]);
      try {
        const { data } = await axios.get(
          `https://api.consumet.org/anime/gogoanime/${query}?page=${currentPage}`
        );
        setSearchResults((prev) => [...prev, ...data.results]);
        if (!data.hasNextPage) setHasNextPage(false);
        setQueryController(query!);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, hasNextPage, queryController]);

  const navigateToNextPage = useCallback(() => {
    router.replace(`/search?query=${query}&page=${Number(currentPage)! + 1}`, {
      scroll: false,
    });
  }, [query, currentPage, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting === true && isLoading === false)
          if (hasNextPage) {
            navigateToNextPage();
          }
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
  }, [ref, isLoading, navigateToNextPage, hasNextPage]);

  return (
    <main>
      <section className="w-full pb-14 md:pb-5 md:pt-14 p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {searchResults.map((e) => (
          <DetailsHoverCard key={e.id} anime_id={e.id}>
            <SearchResultCard ep={e} />
          </DetailsHoverCard>
        ))}
      </section>
      <div className="p-3">
        <Button
          ref={ref}
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
