"use client"

import { useState, ChangeEvent } from "react"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deboundecSearchterm, setDeboundecSearchterm] = useState("")

  const debouncedInput = useDebounce<ChangeEvent<HTMLInputElement>>(
    (e) => setDeboundecSearchterm(e.target.value),
    1000
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedInput(e)
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
      {/* <SearchResults searchResults={searchResults} loading={loading} /> */}
    </div>
  )
}
