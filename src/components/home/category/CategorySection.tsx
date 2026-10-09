"use client";

import CategoryCard from "@/components/home/category/CategoryCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import TCategory from "@/types/categories/categories";
import { useState } from "react";

const CategorySection = ({ categories }: { categories: TCategory[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? categories : categories.slice(0, 16);

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-6 md:py-10">
      <div className="mb-6 px-4 text-center md:mb-8">
        <SectionTitle title="Featured Category" className="text-primary" />
        <SectionSubtitle text="Get Your Desired Product from Featured Category!" />
      </div>

      <ContainerMax>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
          {displayCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>

        {categories.length > 16 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full px-6 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-primary"
            >
              {showAll ? "Show Less" : "View All Categories"}
            </Button>
          </div>
        )}
      </ContainerMax>
    </section>
  );
};

export default CategorySection;
