"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Keyboard } from "swiper/modules"
import type { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { useSetAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { atomWithStorage } from "jotai/utils"
import slugify from "@/lib/utils"
import Progressbar from "./progressBar"
import { Skeleton } from "../ui/skeleton"

import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/keyboard"
import "swiper/css/navigation"
import SwiperSlideCard from "./swiperSlideCard"

export const currentAnimeAtom = atomWithStorage("currentAnime", {} as TopAiring)

export default function MainCarousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring[]
}) {
  useHydrateAtoms([[currentAnimeAtom, topAiringAnime[0]]])
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const setCurrentAnime = useSetAtom(currentAnimeAtom)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Skeleton className="w-full lg:w3/4 h-96 lg:pt-52" />

  return (
    <section className="lg:pt-52 w-full lg:w-3/5">
      <Progressbar barWidth={progressBarWidth} />
      <Swiper
        onAutoplayTimeLeft={(S, timeleft, percentage) =>
          setProgressBarWidth(100 - percentage * 100)
        }
        onSlideChange={(S) => {
          setCurrentAnime(topAiringAnime[S.realIndex])
        }}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Keyboard]}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
            centeredSlides: true,
          },
          1280: {
            centeredSlides: false,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        {topAiringAnime.map((obj) => (
          <SwiperSlide key={obj.mal_id}>
            <SwiperSlideCard obj={obj} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
