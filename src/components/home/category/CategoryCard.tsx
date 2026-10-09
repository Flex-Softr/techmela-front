"use client";
import { getImageSrc } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = category?.image?.src ? getImageSrc(category.image.src) : null;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="bg-card rounded-2xl border border-border/80 shadow-sm p-3 sm:p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 cursor-pointer group w-full h-full min-h-[112px] sm:min-h-[124px]"
    >
      <div className="h-10 w-10 sm:h-11 sm:w-11 mb-2.5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={category?.image?.alt || category.name}
            width={44}
            height={44}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="size-10 rounded-xl bg-accent/60 flex items-center justify-center text-primary">
            <LayoutGrid className="size-5 stroke-[1.75]" />
          </div>
        )}
      </div>
      <span className="text-[12px] sm:text-[13px] font-medium leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 px-0.5">
        {category.name}
      </span>
      {category.productCount !== undefined && (
        <span className="mt-1 text-[10px] text-muted-foreground font-normal">
          {category.productCount} items
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
