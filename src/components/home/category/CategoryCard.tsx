"use client";
import { getImageSrc } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="text-center mx-auto flex flex-col justify-center items-center group transition-all duration-300"
    >
      <div className="size-20 sm:size-24 md:size-32 rounded-full flex justify-center items-center bg-muted border border-border group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-300 overflow-hidden shadow-sm">
        <Image
          src={getImageSrc(category?.image?.src)}
          alt={category?.image?.alt || category.name}
          width={80}
          height={80}
          className="mx-auto transition-all object-contain p-3 w-full h-full"
        />
      </div>
      <span className="mt-2 text-xs md:text-sm font-bold block text-foreground group-hover:text-primary transition-colors line-clamp-1 px-1">
        {category.name}
      </span>
      {category.productCount !== undefined && (
        <span className="text-[10px] md:text-xs text-foreground font-medium bg-muted px-2 py-0.5 rounded-full mt-1">
          {category.productCount} টি পণ্য
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
