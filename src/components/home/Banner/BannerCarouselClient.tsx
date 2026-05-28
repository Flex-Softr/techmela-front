"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TSliders } from "@/types/sliders/slider";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useRef, useState } from "react";
import CarouselUi from "./CarouselUi";

type ClientBannerCarouselProps = {
  sliders: TSliders[];
};

const ClientBannerCarousel: React.FC<ClientBannerCarouselProps> = ({
  sliders,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!sliders || sliders.length === 0) {
    return null;
  }

  if (sliders.length === 1) {
    return (
      <div className="md:px-0">
        <CarouselUi slider={sliders[0]} />
      </div>
    );
  }

  return (
    <div
      className="relative group/banner md:px-0"
      onMouseEnter={() => {
        if (plugin.current) plugin.current?.stop();
      }}
      onMouseLeave={() => {
        if (plugin.current) {
          plugin.current?.play();
        }
      }}
    >
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true, duration: 40 }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-0">
          {sliders?.map((slider) => (
            <CarouselItem key={slider._id} className="pl-0">
              <CarouselUi slider={slider} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {sliders.length > 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <CarouselPrevious className="pointer-events-auto disabled:pointer-events-auto absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white text-primary border border-primary/50 h-8 w-8 md:h-11 md:w-11 shadow-xl transition-all flex items-center justify-center z-30 ring-2 ring-primary/5" />
            <CarouselNext className="pointer-events-auto disabled:pointer-events-auto absolute -right-2 md:-right-4 left-auto md:left-auto top-1/2 -translate-y-1/2 bg-white hover:bg-white text-primary border border-primary/50 h-8 w-8 md:h-11 md:w-11 shadow-xl transition-all flex items-center justify-center z-30 ring-2 ring-primary/5" />
          </div>
        )}
      </Carousel>

      {/* Pagination Dots */}
      {sliders.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 border border-white/20 shadow-sm",
                current === index
                  ? "w-8 bg-primary shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  : "w-2 bg-white/60 hover:bg-white/90"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientBannerCarousel;
