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

export default function EpisodeList({episodeList}: {episodeList: EpisodeList}){
  const params = useParams()
  const pathname = usePathname()
    return (
        <Sheet>
        <SheetTrigger asChild>
          <Button className="md:w-3/4 m-4 w-full">Watch Now</Button>
        </SheetTrigger>
        <SheetContent className="overflow-scroll">
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
                className={cn('p-4 p-4 border flex justify-center items-center rounded-lg hover:bg-secondary', {
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