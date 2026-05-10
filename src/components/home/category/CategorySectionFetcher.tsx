import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import CategorySection from "./CategorySection";
import TGenericResponse from "@/types/response";

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
