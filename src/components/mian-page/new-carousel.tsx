"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'

export default function NewCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
  }, [Autoplay({
    stopOnMouseEnter: true,
    stopOnInteraction: false,
    delay: 1000,
  })]);

  return (
     <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}