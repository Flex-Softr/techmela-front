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
      <div className="size-20 sm:size-24 md:size-32 rounded-full flex justify-center items-center bg-gray-50 border border-gray-100 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:scale-105 transition-all duration-300 overflow-hidden shadow-sm">
        <Image
          src={getImageSrc(category?.image?.src)}
          alt={category?.image?.alt || category.name}
          width={80}
          height={80}
          className="mx-auto transition-all object-contain p-3 w-full h-full"
        />
      </div>
      <span className="mt-2 text-xs md:text-sm font-bold block text-gray-800 group-hover:text-primary transition-colors line-clamp-1 px-1">
        {category.name}
      </span>
      {category.productCount !== undefined && (
        <span className="text-[10px] md:text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full mt-1">
          {category.productCount} টি বই
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
