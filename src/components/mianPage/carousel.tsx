"use client"

import Image from "next/image"

import { TopAiring } from "@/types"
import { atom, useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useEffect, useState } from "react"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

export const currentAnimeAtom = atom({} as TopAiring)

export default function MainCarousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // useHydrateAtoms([[currentAnimeAtom, topAiringAnime[0]]])
  const [currentAnime, setCurrentAnime] = useAtom(currentAnimeAtom)
  useEffect(() => {
    setCurrentAnime(topAiringAnime[currentIndex])
  }, [setCurrentAnime, topAiringAnime, currentIndex])

  return (
    <Carousel
      afterChange={(previousSlide, { currentSlide }): void => {
        if (previousSlide > currentSlide) {
          if (currentIndex == 0) {
            setCurrentIndex(5)
            return
          }
          setCurrentIndex((prev) => prev - 1)
        } else {
          if (currentIndex == 5) {
            setCurrentIndex(0)
            return
          }
          setCurrentIndex((prev) => prev + 1)
        }
      }}
      focusOnSelect={true}
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      ssr={true}
      partialVisbile={false}
    >
      {topAiringAnime.map((anime) => (
        <div key={anime.mal_id} className="relative aspect-[4/5]">
          <Image
            alt={anime.title}
            fill
            src={anime.images.webp.large_image_url}
            className=""
          />
          <p>{anime.title}</p>
        </div>
      ))}
    </Carousel>
  )
}
