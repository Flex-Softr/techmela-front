"use client";

import CategoryCard from "@/components/home/category/CategoryCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import TCategory from "@/types/categories/categories";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CategorySection = ({ categories }: { categories: TCategory[] }) => {
  if (!categories || categories.length === 0) return null;

  const displayCategories = categories.slice(0, 16);

  return (
    <section className="py-6 md:py-10">
      <div className="mb-6 px-4 text-center md:mb-8">
        <SectionTitle title="জনপ্রিয় ক্যাটাগরি" className="text-primary" />
        <SectionSubtitle text="পছন্দের ক্যাটাগরি থেকে খুঁজে নিন আপনার প্রয়োজনীয় গ্যাজেট" />
      </div>

      <ContainerMax>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
          {displayCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full px-7 border-primary/20 hover:bg-primary hover:text-primary-foreground text-primary font-medium transition-all duration-200 shadow-sm"
          >
            <Link href="/shop" className="flex items-center gap-1.5">
              <span>সব ক্যাটাগরি দেখুন</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </ContainerMax>
    </section>
  );
};

export default CategorySection;
