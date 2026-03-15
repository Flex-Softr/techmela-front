import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CategorySection from "./CategorySection";

const CategorySectionFetcher = async () => {
  const categoryRes = await serverSideFetcher<TPaginatedData<TCategory[]>>({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });

  const categories = categoryRes?.data?.data || [];

  return <CategorySection categories={categories} />;
};

export default CategorySectionFetcher;
