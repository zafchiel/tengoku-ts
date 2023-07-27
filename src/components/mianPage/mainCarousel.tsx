"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Keyboard } from "swiper/modules"
import type { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { atom, useSetAtom } from "jotai"

import "swiper/css"
import slugify from "@/lib/utils"
import Progressbar from "./progressBar"
import { Skeleton } from "../ui/skeleton"

export const currentAnimeAtom = atom({} as TopAiring)

export default function MainCarousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring[]
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const setCurrentAnime = useSetAtom(currentAnimeAtom)

  useEffect(() => {
    setCurrentAnime(topAiringAnime[0])
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Skeleton className="h-80 w-52" />

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
          delay: 7000,
          disableOnInteraction: false,
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
            <Link href={`/${slugify(obj.title)}`}>
              <div className="relative h-full aspect-[4/5] w-full overflow-hidden rounded-md shadow-md">
                <Image
                  width={300}
                  height={400}
                  src={obj.images.webp.large_image_url}
                  alt={obj.title}
                  className="w-full h-full rounded-lg"
                />
                <div className="absolute bottom-0  left-0 w-full rounded-b-lg bg-black/50 p-3">
                  <h1 className="z-10 text-xl font-medium text-white">
                    {obj.title.replaceAll('"', "")}
                  </h1>
                  <div className="flex gap-2 text-gray-300">
                    {obj.genres.map((e, index) => (
                      <p key={index}>{e.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
