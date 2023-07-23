import Link from "next/link"
import Image from "next/image"
import React from "react"
import { SearchResult } from "@/types"

type Props = {
  searchResults: SearchResult[]
}

export default function SearchResults({ searchResults = [] }: Props) {
  if (searchResults.length > 0) {
    return (
      <div className="dropdown-content absolute right-0 z-50 overflow-hidden bg-gray-500 duration-300 ease-linear">
        <div className="flex flex-col  ">
          {searchResults.map((result) => (
            <Link href={`/anime/${result.id}`} key={result.id}>
              <div className="flex h-24 w-72 gap-2  border-b border-dashed bg-[#33353c] p-4">
                <Image
                  width={40}
                  height={55}
                  src={result.image}
                  alt={result.title}
                />
                <div className="flex w-full flex-col justify-between text-left">
                  <h3 className="text-base text-white">{result.title}</h3>
                  <h3 className="text-sm text-white/70">
                    {result.releaseDate}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
  return null
}
