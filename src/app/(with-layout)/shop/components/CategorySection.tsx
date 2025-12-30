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
    <section className="pt-4 md:pt-6">
      <ContainerMax>
        <SectionTitle title="Categories" />
        <SectionSubtitle text="Explore our wide range of products" />
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="mt-4"
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category._id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6 pt-2"
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
