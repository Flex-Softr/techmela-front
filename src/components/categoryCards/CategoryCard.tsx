"use client";
import { getImageSrc } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const handleCategoryView = () => {
    gtmEventHandler({
      event: "view_category",
      content_type: "product_category",
      contents: [{ id: category._id }],
    });
  };

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="text-center mx-auto flex flex-col justify-center items-center group transition-all duration-300"
      onClick={handleCategoryView}
    >
      <div className="size-20 md:size-28 rounded-md flex justify-center items-center group-hover:bg-gray-100 group-hover:scale-105 transition-all duration-300 overflow-hidden">
        <Image
          src={getImageSrc(category?.image?.src)}
          alt={category?.image?.alt || ""}
          width={80}
          height={80}
          className="mx-auto transition-all object-cover w-full"
        />
      </div>
      <span className="mt-2 text-xs md:text-base font-medium block text-gray-700 group-hover:text-primary transition-colors">
        {category.name}
      </span>
      {category.productCount !== undefined && (
        <span className="text-[10px] md:text-xs text-gray-400 font-normal">
          ({category.productCount} products)
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
