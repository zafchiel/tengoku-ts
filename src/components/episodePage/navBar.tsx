"use client"

import { cn, extractEpisodeNumber } from "@/lib/utils"
import EpisodeList, { episodeListAtom } from "../detailsPage/EpisodeLIst"
import { useAtomValue } from "jotai"
import { StepBack, StepForward } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"

export default function NavBar() {
  const { id, episode_id } = useParams()
  const router = useRouter()

  const epArr = useAtomValue(episodeListAtom)
  const epNumber = extractEpisodeNumber(episode_id)

  const nextEp =
    episode_id.slice(0, -epNumber.toString().length) + (epNumber + 1)
  const prevEp =
    episode_id.slice(0, -epNumber.toString().length) + (epNumber - 1)

  return (
    <div className="flex w-full h-20 justify-around items-center">
      <StepBack
        size={34}
        onClick={() => router.push(`/${id}/watch/${prevEp}`)}
        className={cn("cursor-pointer", {
          "text-muted pointer-events-none":
            -1 === epArr.findIndex((element) => element.id === prevEp),
        })}
      />
      <EpisodeList>
        <Button variant="ghost" className="text-xl">
          Episodes
        </Button>
      </EpisodeList>
      <StepForward
        size={34}
        onClick={() => router.push(`/${id}/watch/${nextEp}`)}
        className={cn("cursor-pointer", {
          "text-muted pointer-events-none":
            -1 === epArr.findIndex((element) => element.id === nextEp),
        })}
      />
    </div>
  )
}
