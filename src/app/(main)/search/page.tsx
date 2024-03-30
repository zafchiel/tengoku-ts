"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AnimeInfo, PaginationInfoType, SearchResult } from "@/types";
import SearchResultCard from "@/components/mianPage/search-result-card";
import DetailsHoverCard from "@/components/ui/details-hover-card";
import { JIKAN_API_ANIME_URL } from "@/lib/constants";
import { PaginationComponent } from "@/components/mianPage/pagination-component";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<AnimeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationInfo, setPaginatonInfo] = useState<PaginationInfoType>();

  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const currentPage = searchParams.get("page") ?? 1;
  // const [queryController, setQueryController] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (paginationInfo?.has_next_page === false) return;
      setIsLoading(true);
      try {
        const response = await axios.get<SearchResult>(JIKAN_API_ANIME_URL, {
          params: {
            q: query,
            limit: 20,
            page: currentPage,
            sfw: true,
          },
        });
        setSearchResults(response.data.data);
        setPaginatonInfo(response.data.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, paginationInfo]);

  return (
    <main className="md:pt-14 p-5">
      <h3 className="text-lg text-muted-foreground p-2">
        search results:
        <span className="text-3xl text-foreground font-light pl-2">
          {query}
        </span>
      </h3>
      <div className="p-3 grid place-items-center">
        {paginationInfo ? (
          <PaginationComponent
            query={query}
            activePage={Number(currentPage)}
            paginationInfo={paginationInfo}
          />
        ) : (
          <Skeleton className="w-24 h-10" />
        )}
      </div>

      <section className="w-full pb-14 md:pb-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className="h-full aspect-[4/5] w-400px" />
            ))
          : searchResults.map((anime, index) => (
              <DetailsHoverCard key={index} anime={anime}>
                <SearchResultCard anime={anime} />
              </DetailsHoverCard>
            ))}
      </section>

      <div className="p-3 grid place-items-center">
        {paginationInfo && (
          <PaginationComponent
            query={query}
            activePage={Number(currentPage)}
            paginationInfo={paginationInfo}
          />
        )}
      </div>
    </main>
  );
}
