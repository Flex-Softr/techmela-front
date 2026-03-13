import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import { TTag } from "@/types/tags/tag";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";
// import CustomBreadcrumb from "./components/customBreadcrumb/CustomBreadcrumb";

export const metadata: Metadata = {
  title: "শপ",
};

const ShopPage = async () => {
  // fetch concurently
  const [categoriesResponse, tagsResponse, priceRangeResponse] =
    await Promise.all([
      serverSideFetcher<TPaginatedData<TCategory[]>>({
        url: "/categories?isActive=true",
        tags: ["categories"],
      }),
      serverSideFetcher<TTag[]>({
        url: "/tags",
        tags: ["tags"],
      }),
      serverSideFetcher<{ minPrice: number; maxPrice: number }>({
        url: "/products/price-range",
        tags: ["priceRange"],
      }),
    ]);

  const categories = categoriesResponse?.data?.data || ([] as TCategory[]);
  const tags = tagsResponse?.data || ([] as TTag[]);
  const priceRange = priceRangeResponse?.data;

  return (
    <ShopContent
      categories={categories}
      tags={tags}
      priceRange={priceRange || { minPrice: 0, maxPrice: 0 }}
    />
  );
};

export default ShopPage;
