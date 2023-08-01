"use client"

import { cn, extractEpisodeNumber } from "@/lib/utils"
import EpisodeList from "../detailsPage/EpisodeLIst"
import { StepBack, StepForward } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { EpisodeListType } from "@/types"

type Props = {
  episodeList: EpisodeListType
}

export default function NavBar({ episodeList }: Props) {
  const { id, episode_id } = useParams()
  const router = useRouter()

  const epNumber = extractEpisodeNumber(episode_id)

  const nextEp =
    episode_id.slice(0, -epNumber.toString().length) + (epNumber + 1)
  const prevEp =
    episode_id.slice(0, -epNumber.toString().length) + (epNumber - 1)

  return (
    <div className="flex fixed bottom-0 inset-x-0 md:static w-full h-20 justify-around items-center">
      <StepBack
        size={34}
        onClick={() => router.push(`/${id}/watch/${prevEp}`)}
        className={cn("cursor-pointer", {
          "text-muted pointer-events-none":
            -1 === episodeList.findIndex((element) => element.id === prevEp),
        })}
      />
      <EpisodeList episodeList={episodeList}>
        <Button variant="ghost" className="text-xl font-semibold uppercase">
          Episodes
        </Button>
      </EpisodeList>
      <StepForward
        size={34}
        onClick={() => router.push(`/${id}/watch/${nextEp}`)}
        className={cn("cursor-pointer", {
          "text-muted pointer-events-none":
            -1 === episodeList.findIndex((element) => element.id === nextEp),
        })}
      />
    </div>
  )
}
