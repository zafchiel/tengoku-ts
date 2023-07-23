"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import type { TopAiring } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { atom, useAtom, useSetAtom } from "jotai"

import "swiper/css"
import slugify from "@/lib/utils"

export const currentAnimeAtom = atom({} as TopAiring)

export default function MainCarousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const setCurrentAnime = useSetAtom(currentAnimeAtom)

  useEffect(() => {
    setCurrentAnime(topAiringAnime[currentIndex])
  }, [])

  return (
    <section className="z-50  h-full w-full lg:w-3/5">
      <Swiper
        onSlideChange={(S) => {
          setCurrentAnime(topAiringAnime[S.realIndex])
        }}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
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
            <Link href={`/anime/${slugify(obj.title)}`}>
              <div className="relative h-full w-full overflow-hidden rounded-md shadow-md">
                <Image
                  width={300}
                  height={400}
                  src={obj.images.webp.large_image_url}
                  alt={obj.title}
                  className="aspect-[3/4] rounded-lg "
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
