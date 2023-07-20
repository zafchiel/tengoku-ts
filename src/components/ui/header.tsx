import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import Link from "next/link"
import React from "react"
import SearchBar from "./search"

const headerVariants = cva(
  "fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between p-3 ",
  {
    variants: {
      variant: {
        default: "bg-[#040217]",
        transparent:
          "bg-gradient-to-b from-transparent to-transparent backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface HeaderProps {
  variant: "default" | "transparent"
}

function Header({ variant }: HeaderProps) {
  return (
    <header className={cn(headerVariants({ variant }))}>
      <div>
        <Link href="/">
          <h1 className="bg-gradient-to-r from-stone-500 via-neutral-200 to-stone-500 bg-clip-text text-4xl font-bold text-transparent">
            TENGOKU
          </h1>
        </Link>
      </div>

      <nav className="relative flex items-center justify-around gap-3 text-xl font-medium text-white/75">
        <SearchBar />
      </nav>
    </header>
  )
}

export default Header

Header.defaultProps = {
  isTransparent: false,
}
