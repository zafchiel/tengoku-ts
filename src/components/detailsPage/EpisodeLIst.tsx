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
import { AnimeInfo } from "@/types"

export default function EpisodeList({episodeList}: {episodeList: AnimeInfo}){
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
            {episodeList.episodes.map((obj) => (
              <Link
                href={`/anime/watch/${obj.id}`}
                key={obj.id}
                className="p-4 border flex justify-center items-center rounded-lg hover:bg-secondary"
              >
                {obj.number}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    )
}