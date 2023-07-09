"use client"

import { TopAiring } from "@/types"
import { atom, useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

export const currentAnimeAtom = atom({} as TopAiring)

export default function Carousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring[]
}) {
  useHydrateAtoms([[currentAnimeAtom, topAiringAnime[0]]])

  // const [currentAnime, setCurrentAnime] = useAtom(currentAnimeAtom)
  // setCurrentAnime(topAiringAnime[0])
  return <div>Carousel</div>
}
