"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import SearchBar from "./search"
import useScrollDirection from "@/hooks/useScrollDirection"
import ProfileButton from "./profileButton"

function Header() {
  const direction = useScrollDirection()

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between p-3 bg-gradient-to-b from-transparent to-transparent backdrop-blur-sm transition-all duration-500",
        {
          "-top-14": direction === "down",
        }
      )}
    >
      <div>
        <Link href="/">
          <h1 className="bg-gradient-to-r from-stone-500 via-neutral-200 to-stone-500 bg-clip-text text-4xl font-bold text-transparent">
            TENGOKU
          </h1>
        </Link>
      </div>

      <div className="flex gap-2">
        <nav className="relative flex items-center justify-around gap-3 text-xl font-medium text-white/75">
          <SearchBar />
        </nav>

        <ProfileButton />
      </div>
    </header>
  )
}

export default Header
