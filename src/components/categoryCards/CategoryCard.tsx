"use client";

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
    <Link
      href={`/shop?category=${category.slug}`}
      className="text-center mx-auto flex flex-col justify-center items-center"
      onClick={handleCategoryView}
    >
      <div className="size-28 border border-border rounded-md flex justify-center items-center hover:scale-105 transition-all duration-300">
        <Image
          src={`${config.base_url}/${category?.image?.src} ` || ""}
          alt={category?.image?.alt || ""}
          width={200}
          height={200}
          className="mx-auto transition-all object-contain rounded-md"
        />
      </div>
      <span className="mt-2 text-sm font-bold block">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
