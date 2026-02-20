import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import { TTag } from "@/types/tags/tag";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";
// import CustomBreadcrumb from "./components/customBreadcrumb/CustomBreadcrumb";

export const metadata: Metadata = {
  title: "Shop",
  description: "Buy now",
};

const ShopPage = async () => {
  // Fetch categories as usual
  const { data: categoryResponse } = await serverSideFetcher<
    TPaginatedData<TCategory[]>
  >({
    url: "/categories?isActive=true",
    tags: ["allCategories"],
  });

  const categories = categoryResponse?.data || [];

  // Fetch tags as usual
  const { data: tagResponse } = await serverSideFetcher<TPaginatedData<TTag[]>>(
    {
      url: "/tags",
    }
  );

  const tags = tagResponse?.data || [];

  // Fetch price range
  const { data: priceRange } = await serverSideFetcher<{
    minPrice: number;
    maxPrice: number;
  }>({
    url: "/products/price-range",
    tags: ["priceRange"],
  });

  return (
    <ShopContent
      categories={categories}
      tags={tags}
      priceRange={priceRange || { minPrice: 0, maxPrice: 10000 }}
    />
  );
};

export default ShopPage;
