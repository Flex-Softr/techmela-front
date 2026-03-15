import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";

export const metadata: Metadata = {
  title: "শপ",
};

const ShopPage = async () => {
  // fetch concurently
  const [categoriesResponse, priceRangeResponse] = await Promise.all([
    serverSideFetcher<TPaginatedData<TCategory[]>>({
      url: "/categories?isActive=true",
      tags: ["categories"],
    }),
    serverSideFetcher<{ minPrice: number; maxPrice: number }>({
      url: "/products/price-range",
      tags: ["priceRange"],
    }),
  ]);

  const categories = categoriesResponse?.data?.data || ([] as TCategory[]);
  const priceRange = priceRangeResponse?.data;

  return (
    <ShopContent
      categories={categories}
      priceRange={priceRange || { minPrice: 0, maxPrice: 0 }}
    />
  );
};

export default ShopPage;
