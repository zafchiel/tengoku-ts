"use client"

import { useState, ChangeEvent } from "react"
import { Search } from "lucide-react"
import axios from "axios"
import AwesomeDebouncePromise from "awesome-debounce-promise"
import { SearchResult } from "@/types"
import SearchResults from "./searchResults"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[] | []>([])

  const fetchPreview = (term: string) =>
    axios.get(`https://api.consumet.org/anime/gogoanime/${term}`)
  const fetchDebounced = AwesomeDebouncePromise(fetchPreview, 1000)

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    const {
      data: { results },
    }: { data: { results: SearchResult[] } } = await fetchDebounced(
      e.target.value
    )
    if (!results) setSearchResults([])
    setSearchResults(results)
  }

  return (
    <div className="dropdown relative inline-block">
      <div className="relative flex items-center justify-center gap-2">
        <form>
          <button className="pointer-events-none absolute right-0 flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent outline-none duration-200 ease-linear ">
            <Search />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInput}
            className="h-9 w-9 cursor-pointer border-white bg-transparent pr-7 outline-none duration-500 ease-in-out focus:w-40 focus:rounded-none focus:border-b"
          />
        </form>
      </div>
      <SearchResults searchResults={searchResults} />
    </div>
  )
}
