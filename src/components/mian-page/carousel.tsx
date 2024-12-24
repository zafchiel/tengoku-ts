"use client";

import type React from "react";
import { use, useCallback, useEffect, useState } from "react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./carousel-dot-button";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { AnimeInfoFiltered } from "@/types";
import Slide from "./carousel-slide";
import ClassNames from "embla-carousel-class-names";
import { TopAiringContext } from "../providers/top-airing-context";
import Progressbar from "./progress-bar";

import "./carousel.css";

type Props = {
	slides: AnimeInfoFiltered[];
};

export default function EmblaCarousel({ slides }: Props) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, align: "start" },
		[
			Autoplay({
				stopOnInteraction: false,
				stopOnMouseEnter: true,
				delay: 10000,
			}),
			ClassNames({
				snapped: "embla__slide--snapped",
				inView: "",
				loop: "",
				draggable: "",
				dragging: "",
			}),
		],
	);
	const { setCurrentAnimeIndex } = use(TopAiringContext);
	const [progressBarWidth, setProgressBarWidth] = useState(0);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick,
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi, onNavButtonClick);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("select", (ep) => {
			setCurrentAnimeIndex(ep.selectedScrollSnap());
		});

		let interval: number | null = null;

		emblaApi.on("autoplay:timerset", (ep) => {
			if (interval) {
				clearInterval(interval);
			}

			const totalDelay = ep.plugins().autoplay.timeUntilNext() ?? 0;

			interval = setInterval(() => {
				const currentTimeUntilNext = ep.plugins().autoplay.timeUntilNext() ?? 0;
				const percentage = 100 - (currentTimeUntilNext / totalDelay) * 100;
				setProgressBarWidth(percentage);
				console.log(percentage);
			}, 10) as unknown as number;
		});

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [emblaApi, setCurrentAnimeIndex]);

	return (
		<section className="embla">
			<Progressbar barWidth={progressBarWidth} />
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((slide, index) => (
						<div className="embla__slide" key={slide.mal_id}>
							<Slide anime={slide} first={index === 0} />
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>

				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={_}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex ? " embla__dot--selected" : "",
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
