"use client";

import { Loader2, Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Separator } from "./separator";
import { type ChangeEvent, useEffect, useState } from "react";
import type { AnimeInfo } from "@/types";
import axios, { AxiosError } from "axios";
import DisplaySearchResults from "./display-search-results";
import { usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { JIKAN_API_URL } from "@/lib/constants";

const fetchSearchResults = async (searchTerm: string) => {
  try {
    console.log("Made request");
    const response = await axios.get<{ data: AnimeInfo[] }>(
      `${JIKAN_API_URL}/anime`,
      {
        params: {
          q: searchTerm,
          limit: 5,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.message);
  }
};

export default function SearchDialog() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<AnimeInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debouncedSearchText = useDebounce(searchText, 500);

  const pathName = usePathname();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoading(true);
    setSearchText(value);
  };

  useEffect(() => {
    if (debouncedSearchText) {
      setLoading(true);
      fetchSearchResults(debouncedSearchText)
        .then((results) => {
          if (results) {
            setSearchResults(results);
          } else {
            setSearchResults([]);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [debouncedSearchText]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Correct dependency array
  useEffect(() => {
    setIsDialogOpen(false);
  }, [pathName]);

  useEffect(() => {
    // Bind shortcut for opening search dialog
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle "/"
      if (e.key === "/") {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className="px-3 flex gap-2 items-center bg-secondary rounded"
        aria-label="Search for anime"
      >
        <SearchIcon size={18} />
        <kbd className="text-sm bg-background/80 text-muted-foreground rounded-sm px-2 py-1 shadow-[inset_0_-2px_#f9fafb1a,0_1px_2px_1px_#484848]">
          /
        </kbd>
        <span className="sr-only">Search for anime</span>
      </DialogTrigger>

      <DialogContent className="pr-10 top-[10%] left-1/2 translate-y-0">
        <DialogTitle>Search for anime</DialogTitle>
        <DialogHeader>
          <form action="/search" role="search">
            <div className="flex gap-2 items-center">
              <Label htmlFor="q">
                <SearchIcon />
              </Label>
              <Input
                name="q"
                id="q"
                type="search"
                placeholder="Search for anime title"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogHeader>

        {(searchResults.length > 0 || loading) && <Separator />}

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : searchResults.length === 0 ? (
          <p>Try searching for something else</p>
        ) : (
          <DisplaySearchResults searchResults={searchResults} />
        )}
      </DialogContent>
    </Dialog>
  );
}
