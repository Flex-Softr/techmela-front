import TCategory from "@/types/categories/categories";
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
  const { data: categories = [] } = await serverSideFetcher<TCategory[]>({
    url: "/categories?isActive=true",
    tags: ["allCategories"],
  });

  // Fetch tags as usual
  const { data: tags = [] } = await serverSideFetcher<TTag[]>({
    url: "/tags",
  });

  // Fetch price range
  const { data: priceRange } = await serverSideFetcher<{
    minPrice: number;
    maxPrice: number;
  }>({
    url: "/products/price-range",
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
