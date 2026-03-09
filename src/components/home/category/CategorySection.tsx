"use client";

import ContainerMax from "@/components/containerMax/ContainerMax";
import CategoryCard from "@/components/home/category/CategoryCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";

const CategorySection = ({ categories }: { categories: TCategory[] }) => {
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

  return (
    <section className="pt-4 md:pt-6">
      <div className="bg-primary/5 py-2 md:py-3 px-4 md:mb-4 text-center border border-primary/10 shadow-sm">
        <SectionTitle
          title="আমাদের গ্রন্থ বিভাগ"
          className="text-primary mb-2"
        />
        <SectionSubtitle
          text="পছন্দের ক্যাটাগরি অনুযায়ী বই খুঁজুন"
          className="text-primary/70 max-w-2xl mx-auto"
        />
      </div>

      <ContainerMax>
        <div
          className="relative group/category px-1 md:px-0"
          onMouseEnter={() => {
            if (plugin?.current) plugin?.current?.stop?.();
          }}
          onMouseLeave={() => {
            if (plugin && plugin?.current) {
              plugin?.current?.play?.();
            }
          }}
        >
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2 md:-ml-3 py-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category._id}
                  className="basis-1/4 sm:basis-1/4 md:basis-1/6 lg:basis-1/8 xl:basis-[12.5%] pl-2 md:pl-3"
                >
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {categories.length > 3 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
                <CarouselPrevious className="pointer-events-auto relative -left-2 md:-left-4 bg-white hover:bg-white text-primary border border-primary/50 h-8 w-8 md:h-10 md:w-10 shadow-lg transition-all flex items-center justify-center ring-2 ring-primary/5" />
                <CarouselNext className="pointer-events-auto relative -right-2 md:-right-4 left-auto md:left-auto bg-white hover:bg-white text-primary border border-primary/50 h-8 w-8 md:h-10 md:w-10 shadow-lg transition-all flex items-center justify-center ring-2 ring-primary/5" />
              </div>
            )}
          </Carousel>

          {/* Pagination Dots */}
          {categories.length > 5 && (
            <div className="flex justify-center items-center gap-2 mt-2">
              {api?.scrollSnapList().map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 border border-primary/10",
                    current === index
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-primary/40 md:bg-primary/20 md:hover:bg-primary/40"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </ContainerMax>
    </section>
  );
};

export default CategorySection;
