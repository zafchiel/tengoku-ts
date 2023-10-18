"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResult } from "@/types";
import SearchResultCard from "@/components/mianPage/searchResultCard";

export default function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchParams = useSearchParams()!;
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(
          `https://api.consumet.org/anime/gogoanime/${query}`
        );
        setSearchResults(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className="w-full pb-14 md:pb-5 md:pt-14 p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
      {searchResults.map((e) => (
        <SearchResultCard key={e.id} ep={e} />
      ))}
    </main>
  );
}
