"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { CheckSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserProgressData } from "@/types"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import { useSession } from "next-auth/react"

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
  const { data: session } = useSession()

  const handleButtonClick = async () => {
    if (!session?.user?.id) {
      toast({
        description: "You need to be logged in to mark episodes as watched",
      })
      return
    }
    // API call to fetch progress and update it
    try {
      const { data } = await axios.patch(`/api/user/markAsWatched`, {
        user_id: session?.user?.id,
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
      variant="outline"
      disabled={markedAsWatched}
      onClick={handleButtonClick}
      className={cn("w-full p-4 uppercase font-semibold", {
        "bg-muted-foreground": markedAsWatched,
      })}
    >
      Mark as watched to this point
    </Button>
  )
}
