import Link from "next/link"
import Image from "next/image"
import React from "react"
import { SearchResult } from "@/types"

type Props = {
  searchResults: SearchResult[]
  isLoading: boolean
}

export default function SearchResults({
  searchResults = [],
  isLoading,
}: Props) {
  if (searchResults.length > 0) {
    if (isLoading)
      return (
        <div className="dropdown-content absolute right-0 z-50 overflow-hidden bg-gray-500 duration-300 ease-linear">
          <div className="w-60 h-80 flex justify-center items-center">
            <svg className="h-10 w-10 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-transparent"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                className="fill-white"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          </div>
        </div>
      )
    return (
      <div className="dropdown-content absolute right-0 z-50 overflow-hidden bg-gray-500 duration-300 ease-linear">
        <div className="flex flex-col  ">
          {searchResults.map((result) => (
            <Link href={`/${result.id}`} key={result.id}>
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
