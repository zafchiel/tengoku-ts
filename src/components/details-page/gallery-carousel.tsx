"use client";

import type React from "react";
import { useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "../ui/carousel-dot-button";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../ui/carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import Image from "next/image";
import "./gallery-carousel.css";

type Props = {
  slides: string[];
};

export default function GalleryCarousel({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        delay: 6000,
      }),
      ClassNames({
        snapped: "embla__slide--snapped",
        inView: "",
        loop: "",
        draggable: "",
        dragging: "",
      }),
    ]
  );

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
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={slide + index}>
              <Image src={slide} alt={slide} width={400} height={500} />
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
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
