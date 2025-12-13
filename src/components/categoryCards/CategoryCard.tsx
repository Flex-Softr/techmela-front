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
    <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/6 mx-1 md:mx-5 border rounded-md">
      <button onClick={() => handleCategoryView()}>
        <Link
          href={`/shop?category=${category.slug}`}
          className="block text-center p-4"
        >
          <Image
            src={`${config.base_url}/${category?.image?.src} ` || ""} //TODO: Change image Path
            alt={category?.image?.alt || ""}
            width={200}
            height={200}
            className="w-20 h-20 mx-auto hover:scale-95 transition-all"
          />
          <span className="mt-2 font-bold block">{category.name}</span>
        </Link>
      </button>
    </CarouselItem>
  );
};

export default CategoryCard;
