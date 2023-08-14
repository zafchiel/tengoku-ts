"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { CheckSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserProgressData } from "@/types"
import { useToast } from "../ui/use-toast"
import axios from "axios"

type Props = {
  userProgress: UserProgressData | null
  anime_id: string
  epNumber: number
  animeLength: number
}
export default function MarkAsWatchedButton({
  userProgress,
  anime_id,
  epNumber,
  animeLength,
}: Props) {
  const [markedAsWatched, setMarkedAsWatched] = useState(
    epNumber <= userProgress?.progress!
  )
  const { toast } = useToast()

  const handleButtonClick = async () => {
    if (!userProgress?.user_id) {
      toast({
        description: "You need to be logged in to mark episodes as watched",
      })
      return
    }
    // API call to fetch progress and update it
    try {
      const { data } = await axios.patch(`/api/user/markAsWatched`, {
        user_id: userProgress.user_id,
        progress_id: userProgress?.progress_id,
        anime_id,
        progress: epNumber,
        status: epNumber === animeLength ? "Completed" : "Watching",
      })
      setMarkedAsWatched(true)
      toast({
        description: "Episode marked as watched",
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button
      disabled={markedAsWatched}
      onClick={handleButtonClick}
      className={cn({
        "bg-muted-foreground": markedAsWatched,
      })}
    >
      <CheckSquare />
    </Button>
  )
}
