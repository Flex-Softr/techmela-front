import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import dynamic from "next/dynamic";
import TGenericResponse from "@/types/response";

const CategorySection = dynamic(() => import("./CategorySection"));

const CategorySectionFetcher = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<TPaginatedData<TCategory[]>>>;
}) => {
  const categoryRes = await promise;

  const categories = categoryRes?.data?.data || [];

  return <CategorySection categories={categories} />;
};

export default CategorySectionFetcher;
