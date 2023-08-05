"use client"

import { ProgressRecord } from "@/xata/xata"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { Session } from "next-auth"
import axios from "axios"
import { ButtonHTMLAttributes, HTMLAttributes } from "react"

type Props = {
  session: Session | null
  animeId: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function FollowButton({ session, animeId, ...rest }: Props) {
  const handleClick = async () => {
    if (!session) return
    try {
      const { data } = await axios.post("/api/anime/follow", {
        user: session.user?.id,
        anime: animeId,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button variant="secondary" onClick={handleClick} {...rest}>
      <Heart />
    </Button>
  )
}
