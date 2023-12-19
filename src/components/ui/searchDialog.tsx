"use client";

import { Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Separator } from "./separator";
import { ChangeEvent, useEffect, useState } from "react";
import type { SearchResult } from "@/types";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/lib/apiUrl";
import DisplaySearchResults from "./displaySearchResults";
import { usePathname } from "next/navigation";

const fetchSearchResults = async (searchTerm: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/${searchTerm}`);
    return data.results;
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.message);
  }
};

export default function SearchDialog() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pathName = usePathname();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);

    fetchSearchResults(value)
      .then((results) => setSearchResults(results.slice(0, 5)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsDialogOpen(false);
  }, [pathName]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <SearchIcon />
      </DialogTrigger>

      <DialogContent className="pr-10">
        <DialogHeader>
          <form action="/search">
            <div className="flex gap-2 items-center">
              <Label htmlFor="q">
                <SearchIcon />
              </Label>
              <Input
                name="q"
                id="q"
                placeholder="Anime Title"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </DialogHeader>

        <Separator />
        {searchResults.length > 0 ? (
          <DisplaySearchResults searchResults={searchResults} />
        ) : (
          <div>
            <p>No luck</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
