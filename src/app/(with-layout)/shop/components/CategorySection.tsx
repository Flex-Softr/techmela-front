"use client";

import CategoryCard from "@/components/categoryCards/CategoryCard";
import ContainerMax from "@/components/containerMax/ContainerMax";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
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
              <CategoryCard key={category._id} category={category} />
            ))}
          </CarouselContent>
        </Carousel>
      </ContainerMax>
    </section>
  );
};

export default CategorySection;
