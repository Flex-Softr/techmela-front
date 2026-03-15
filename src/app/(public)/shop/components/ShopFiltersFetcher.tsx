import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import ShopFilters from "./ShopFilters";

const ShopFiltersFetcher = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
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
  const priceRange = priceRangeResponse?.data || {
    minPrice: 0,
    maxPrice: 10000,
  };

  return (
    <ShopFilters
      searchParams={searchParams}
      categories={categories}
      minPrice={priceRange.minPrice}
      maxPrice={priceRange.maxPrice}
    />
  );
};

export default ShopFiltersFetcher;
