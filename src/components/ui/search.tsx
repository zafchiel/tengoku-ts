"use client";

import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { SearchResult } from "@/types";
import SearchResults from "./searchResults";
import { debounce } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (searchText.length < 3) setSearchResults([]);
    const fetchDataDebounced = debounce(fetchData, 1000);
    fetchDataDebounced(searchText);
  }, [searchText]);

  const fetchData = async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      return;
    }

    try {
      const { data } = await axios.get(
        `https://api.consumet.org/anime/gogoanime/${searchTerm}`
      );
      setSearchResults(data.results.slice(0, 6));
    } catch (error) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    setLoading(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchText}&page=1`);
  };

  return (
    <Popover>
      <div className="relative flex items-center justify-center gap-2">
        <form onSubmit={handleSubmit}>
          <PopoverTrigger asChild>
            <span>
              <button className="pointer-events-none absolute right-0 flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent outline-none duration-200 ease-linear ">
                <Search />
              </button>
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                className="h-9 w-9 cursor-pointer border-white bg-transparent pr-7 outline-none duration-500 ease-in-out focus:w-40 focus:rounded-none focus:border-b"
              />
            </span>
          </PopoverTrigger>
        </form>
      </div>
      {searchResults.length !== 0 ? (
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <SearchResults
            searchResults={searchResults}
            isLoading={loading}
            clearInput={() => setSearchText("")}
          />
        </PopoverContent>
      ) : searchText.length === 0 ? null : (
        <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <div className="z-50 overflow-hidden bg-popover duration-300 ease-linear p-5">
            <p>No matches</p>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
