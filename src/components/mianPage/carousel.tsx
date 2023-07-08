"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Keyboard } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import { TopAiring } from "@/types"

export default function Carousel({
  topAiringAnime,
}: {
  topAiringAnime: TopAiring
}) {
  const [progressBarWidth, setProgressBarWidth] = useState(1)

  //   const handleChangeSlideIndex = (index) => {
  //     handleSlideChange(index)
  //   }

  const onAutoplayTimeLeft = (s, time, progress) => {
    setProgressBarWidth(100 - progress * 100)
  }

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-navigation-size": "3rem",
        }}
        navigation={true}
        height={600}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        spaceBetween={15}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        loop={true}
        modules={[Autoplay, Navigation, Keyboard]}
        // onSlideChange={(e) => handleChangeSlideIndex(e.realIndex)}
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
        {topAiringAnime.map((obj, index) => (
          <SwiperSlide key={obj.mal_id}>
            <Link href={`/details/${obj.mal_id}`}>
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
    </>
  )
}
