'use client';

import { useState, useEffect } from 'react';
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
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCanScrollNext(emblaApi.canScrollNext());
        setCanScrollPrev(emblaApi.canScrollPrev());
      };

      emblaApi.on('select', onSelect);
      onSelect(); // Check slides on initialization

      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <section className="embla relative">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-[2vw] touch-pan-y touch-pinch-zoom">
          {children}
        </div>
      </div>
      {canScrollNext && (
        <Next
          onClick={() => {
            emblaApi?.scrollNext();
          }}
        />
      )}
      {canScrollPrev && (
        <Prev
          onClick={() => {
            emblaApi?.scrollPrev();
          }}
        />
      )}
    </section>
  );
};

Carousel.displayName = 'Carousel';

type CarouselItemProps = {
  children: React.ReactNode; // Ensure `children` is valid React content
  onClick?: () => void; // Optional click handler
};

const CarouselItem = ({ children, ...props }: CarouselItemProps) => {
  return (
    <div className="flex-[0_0_calc(50%-1vw)] items-start rounded-lg" {...props}>
      {children}
    </div>
  );
};

CarouselItem.displayName = 'CarouselItem';

export { Carousel, CarouselItem };
