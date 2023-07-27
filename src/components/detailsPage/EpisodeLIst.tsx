'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { EpisodeList } from "@/types"
import { useParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function EpisodeList({episodeList, children}: {episodeList: EpisodeList, children: ReactNode}){
  const params = useParams()
  const pathname = usePathname()
    return (
        <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll z-50">
          <SheetHeader>
            <SheetTitle>Pick your poison</SheetTitle>
            <SheetDescription>
              choosing will redirect you to episode page
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
            {episodeList.map((obj) => {
              const isActive = pathname.startsWith(`/${params.id}/watch/${obj.id}`)
              return (

              <Link
                href={`/${params.id}/watch/${obj.id}`}
                key={obj.id}
                className={cn('p-4 border flex justify-center items-center rounded-lg hover:bg-secondary', {
                  ['bg-secondary']: isActive
                })}
              >
                {obj.number}
              </Link>
              )
})}
          </div>
        </SheetContent>
      </Sheet>
    )
}