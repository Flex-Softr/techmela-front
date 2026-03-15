import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CategoryMenuBar from "../menuBar/CategoryMenuBar";

const CategoryMenuBarFetcher = async () => {
  const categoryRes = await serverSideFetcher<TPaginatedData<TCategory[]>>({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });

  const categories = categoryRes?.data?.data || [];

  return <CategoryMenuBar categories={categories} />;
};

export default CategoryMenuBarFetcher;
