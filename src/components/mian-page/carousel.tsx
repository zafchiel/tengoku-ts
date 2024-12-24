"use client";

import type React from "react";
import { use, useCallback, useEffect } from "react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./carousel-dot-button";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import type { AnimeInfoFiltered } from "@/types";
import Slide from "./carousel-slide";
import ClassNames from "embla-carousel-class-names";
import { TopAiringContext } from "../providers/top-airing-context";

type PropType = {
	slides: AnimeInfoFiltered[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({
			stopOnInteraction: false,
			stopOnMouseEnter: true,
			delay: 2000,
		}),
		ClassNames(),
	]);
	const { setCurrentAnimeIndex } = use(TopAiringContext);

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
	}, [emblaApi, setCurrentAnimeIndex]);

	return (
		<section className="embla">
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
};

export default EmblaCarousel;
