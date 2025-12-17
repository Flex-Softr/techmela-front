"use client";

import { CarouselItem } from "@/components/ui/carousel";
import config from "@/config/config";
import TCategory from "@/types/categories/categories";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const handleCategoryView = () => {
    gtmEventHandler("view_category", {
      content_name: category.name,
      content_ids: [category._id],
      content_type: "Product category",
    });
  };

  return (
    <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/6 flex justify-center items-center p-0">
      <Link
        href={`/shop?category=${category.slug}`}
        className="text-center mx-auto flex flex-col justify-center items-center"
        onClick={handleCategoryView}
      >
        <div className="size-28 border border-border rounded-full p-2 flex justify-center items-center overflow-hidden">
          <Image
            src={`${config.base_url}/${category?.image?.src} ` || ""}
            alt={category?.image?.alt || ""}
            width={200}
            height={200}
            className="size-20 mx-auto hover:scale-90 transition-all object-contain rounded-full"
          />
        </div>
        <span className="mt-2 text-sm font-bold block">{category.name}</span>
      </Link>
    </CarouselItem>
  );
};

export default CategoryCard;
