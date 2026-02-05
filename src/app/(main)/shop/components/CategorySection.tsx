"use client";

import CategoryCard from "@/components/categoryCards/CategoryCard";
import ContainerMax from "@/components/containerMax/ContainerMax";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextPMiddle,
  CarouselPreviousPMiddle,
} from "@/components/ui/carousel";
import TCategory from "@/types/categories/categories";
import Autoplay from "embla-carousel-autoplay";

const CategorySection = ({ categories }: { categories: TCategory[] }) => {
  return (
    <section className="pt-2 md:pt-4">
      <ContainerMax>
        <SectionTitle title="Categories" />
        <SectionSubtitle text="Explore our wide range of products" />
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="mt-4 px-4 md:px-12"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category._id}
                className="basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4 pt-2"
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPreviousPMiddle />
          <CarouselNextPMiddle />
        </Carousel>
      </ContainerMax>
    </section>
  );
};

export default CategorySection;
