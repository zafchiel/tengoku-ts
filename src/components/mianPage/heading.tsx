"use client"

import { useAtom } from "jotai/react"
import { currentAnimeAtom } from "./carousel"

export default function MainHeading() {
  const [currentAnime] = useAtom(currentAnimeAtom)

  return (
    <section className="z-20 mt-20 flex h-3/5 w-full flex-col items-center justify-center p-5 ">
      <h1 className="mb-3 text-4xl font-bold md:text-6xl">
        {currentAnime.title}
      </h1>
    </section>
  )
}
