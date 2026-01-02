"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { TProduct } from "@/types/products/product";
import { TSliders } from "@/types/sliders/slider";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import CarouselUi from "./CarouselUi";

type ClientBannerCarouselProps = {
  sliders: TSliders[];
  bannerSideProducts: TProduct[]; // Ensure this is an array of TProduct
};

const ClientBannerCarousel: React.FC<ClientBannerCarouselProps> = ({
  sliders,
  bannerSideProducts, // Directly destructuring bannerSideProducts
}) => {
  const plugin = useRef(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any
  );

  if (!sliders || sliders.length === 0) {
    return null;
  }

  return (
    <Carousel plugins={[plugin.current]} className="">
      <CarouselContent>
        {sliders?.map((slider) => (
          <CarouselItem key={slider._id}>
            <CarouselUi
              bannerSideProducts={bannerSideProducts}
              slider={slider}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ClientBannerCarousel;
