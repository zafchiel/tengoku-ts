"use client"

import { extractEpisodeNumber } from "@/lib/utils"
import { episodeListAtom } from "../detailsPage/EpisodeLIst"
import { useAtomValue } from "jotai"
import { StepBack, StepForward } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NavBar() {
  const { id, episode_id } = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const epArr = useAtomValue(episodeListAtom)
  const epNumber = extractEpisodeNumber(episode_id)

  useEffect(() => {
    if (typeof epNumber === "number") {
      const nextEp = episode_id.slice(0, -epNumber.toString().length) + (epNumber + 1)
      const prevEp = episode_id.slice(0, -epNumber.toString().length) + (epNumber - 1)

      console.log(nextEp)
      console.log(prevEp)
    }
  }, [])

  return (
    <div className="fixed bottom-0 inset-x-0 h-40 bg-primary-foreground">
      <StepBack onClick={() => router.push(`/${id}/`)} />
    </div>
  )
}
