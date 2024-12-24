"use client";

import { use, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Keyboard } from "swiper/modules";
import Progressbar from "./progress-bar";
import { Skeleton } from "../ui/skeleton";
import { TopAiringContext } from "../providers/top-airing-context";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import SwiperSlideCard from "./swiper-slide-card";
import type { AnimeInfoFiltered } from "@/types";

type MainCarouselProps = {
	topAiring: AnimeInfoFiltered[];
};

export default function MainCarousel({ topAiring }: MainCarouselProps) {
	const [progressBarWidth, setProgressBarWidth] = useState(0);
	const { setCurrentAnimeIndex } = use(TopAiringContext);

	if (topAiring.length < 1)
		return <Skeleton className="w-full lg:w3/4 h-96 lg:pt-52 mx-10" />;

	return (
		<section className="lg:pt-52 w-full lg:w-3/5">
			<Progressbar barWidth={progressBarWidth} />
			<Swiper
				onAutoplayTimeLeft={(S, timeleft, percentage) =>
					setProgressBarWidth(100 - percentage * 100)
				}
				onSlideChange={(S) => {
					setCurrentAnimeIndex(S.realIndex);
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
				{topAiring.map((anime, index) => (
					<SwiperSlide key={anime.mal_id}>
						<SwiperSlideCard anime={anime} first={index === 0} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
