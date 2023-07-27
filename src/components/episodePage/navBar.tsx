"use client"

import { extractEpisodeNumber } from "@/lib/utils"
import { episodeListAtom } from "../detailsPage/EpisodeLIst"
import { useAtomValue } from "jotai"
import { StepBack, StepForward } from "lucide-react"
import { useParams } from "next/navigation"

export default function NavBar() {
  const epArr = useAtomValue(episodeListAtom)

  const { episode_id } = useParams()
  const epNumber = extractEpisodeNumber(episode_id)

  if (typeof epNumber === "number") {
    console.log(epNumber)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 h-40 bg-primary-foreground">
      <StepBack />
    </div>
  )
}
