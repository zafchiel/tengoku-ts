"use client"

import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { EpisodeListType } from "@/types"
import { useParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { EpisodesRecord } from "@/xata/xata"

type Props = {
  episodeList: EpisodeListType | EpisodesRecord[]
  children: ReactNode
}

export default function EpisodeList({ episodeList, children }: Props) {
  const params = useParams()
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-scroll z-50">
        <SheetHeader>
          <SheetTitle>Pick your poison</SheetTitle>
          <SheetDescription>
            choosing will redirect you to episode page
          </SheetDescription>
        </SheetHeader>
        {episodeList.length === 0 ? (
          <p>There are no episodes yet, Come back later!</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
            {episodeList.map((obj) => {
              const isActive = pathname.startsWith(
                `/${params.id}/watch/${obj.id}`
              )
              return (
                <Link
                  href={`/${params.id}/watch/${obj.id}`}
                  key={obj.id}
                  className={cn(
                    "p-4 border flex justify-center items-center rounded-lg hover:bg-foreground hover:text-background bg-background visited:bg-muted",
                    {
                      ["!bg-foreground !text-background"]: isActive,
                    }
                  )}
                >
                  {obj.number}
                </Link>
              )
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
