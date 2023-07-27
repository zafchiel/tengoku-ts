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
import { ReactNode, useEffect } from "react"
import { atom, useAtom } from "jotai"

export const episodeListAtom = atom([] as EpisodeListType)

type Props = {
  episodeList?: EpisodeListType
  children: ReactNode
}

export default function EpisodeList({ episodeList, children }: Props) {
  const [epArr, setApArr] = useAtom(episodeListAtom)

  const params = useParams()
  const pathname = usePathname()

  useEffect(() => {
    if (episodeList) setApArr(episodeList)
  }, [])

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
        {epArr.length === 0 ? (
          <p>There are no episodes yet, Come back later!</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
            {epArr.map((obj) => {
              const isActive = pathname.startsWith(
                `/${params.id}/watch/${obj.id}`
              )
              return (
                <Link
                  href={`/${params.id}/watch/${obj.id}`}
                  key={obj.id}
                  className={cn(
                    "p-4 border flex justify-center items-center rounded-lg hover:bg-secondary",
                    {
                      ["bg-secondary"]: isActive,
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
