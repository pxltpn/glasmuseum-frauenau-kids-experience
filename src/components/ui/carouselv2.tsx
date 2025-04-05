'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const btn_class = `border-[0.4vw] rounded-full absolute top-[50%] z-10 translate-y-[-50%]`;

type ButtonProps = {
  onClick: () => void; // Function type for the click handler
};

const Next = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${btn_class} right-[-6vw]`} onClick={onClick}>
      <ArrowRight size={'4vw'} />
    </button>
  );
};

const Prev = ({ onClick }: ButtonProps) => {
  return (
    <button className={`${btn_class} left-[-6vw]`} onClick={onClick}>
      <ArrowLeft size={'4vw'} />
    </button>
  );
};

type CarouseProps = {
  children: React.ReactNode; // Ensure `children` is valid React content
};

const Carousel = ({ children }: CarouseProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  });

  return (
    <section className="embla relative">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-[2vw] touch-pan-y touch-pinch-zoom">
          {children}
        </div>
      </div>
      <Next onClick={() => emblaApi?.scrollNext()} />
      <Prev onClick={() => emblaApi?.scrollPrev()} />
    </section>
  );
};

Carousel.displayName = 'Carousel';

type CarouselItemProps = {
  children: React.ReactNode; // Ensure `children` is valid React content
};

const CarouselItem = ({ children }: CarouselItemProps) => {
  return (
    <div className="flex-[0_0_calc(50%-1vw)] items-start rounded-lg">
      {children}
    </div>
  );
};

CarouselItem.displayName = 'CarouselItem';

export { Carousel, CarouselItem };
