"use client"

import { ProgressRecord } from "@/xata/xata"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { Session } from "next-auth"
import axios from "axios"
import { ButtonHTMLAttributes, useState } from "react"
import { useToast } from "../ui/use-toast"

type Props = {
  session: Session | null
  animeId: string
  isFollowed: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function FollowButton({
  session,
  animeId,
  isFollowed,
  ...rest
}: Props) {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed)
  const { toast } = useToast()
  const handleClick = async () => {
    if (!session) return
    try {
      const { data } = await axios.post("/api/anime/follow", {
        user: session.user?.id,
        anime: animeId,
      })

      toast({
        title: "Successfully followed anime",
        description: "check your progress on profile page",
      })
      setIsFollowedState(true)
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again later",
      })
    }
  }
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={isFollowedState}
      {...rest}
    >
      <Heart />
    </Button>
  )
}
