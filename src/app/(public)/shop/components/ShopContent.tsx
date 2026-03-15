"use client";
import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import Paginate from "@/components/ui/shared/paginate/Paginate";
import {
  useGetAllProductsQuery,
  useGetBestSellingProductsQuery,
} from "@/redux/features/products/productApi";
import TCategory from "@/types/categories/categories";
import { TProduct } from "@/types/products/product";
import { TTag } from "@/types/tags/tag";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NoProductsFound from "./NoProductsFound";
import ProductFilterContent from "./ProductFilterContent";
import ShopBanner from "./ShopBanner";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";

type ShopContentProps = {
  categories: TCategory[];
  tags: TTag[];
  priceRange: { minPrice: number; maxPrice: number };
};

const ShopContent = ({ categories, tags, priceRange }: ShopContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bestSellingParam = searchParams.get("best-selling") === "true";
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : 12;
  const offset = (currentPage - 1) * limit;

  // Check if any meaningful filters (besides best-selling/page/limit/offset) are active
  const UI_ONLY_KEYS = new Set(["best-selling", "page", "limit", "offset"]);
  const hasOtherFilters = Array.from(searchParams.keys()).some(
    (key) => !UI_ONLY_KEYS.has(key)
  );

  // Use best-selling endpoint ONLY when best-selling=true and NO other filters are active.
  // If the user has also applied e.g. a category, treat it as a regular filtered query.
  const useBestSelling = bestSellingParam && !hasOtherFilters;

  // Auto-clean the URL: remove best-selling=true when other filters are active
  useEffect(() => {
    if (bestSellingParam && hasOtherFilters) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("best-selling");
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    }
  }, [bestSellingParam, hasOtherFilters, router, searchParams]);

  // Convert searchParams to object for RTK query
  const queryParams: Record<string, string | string[]> = {};
  queryParams["sort"] = "-updatedAt";

  // Always forward all meaningful search params to the API (excluding UI-only flags).
  searchParams.forEach((value, key) => {
    if (key === "best-selling") return; // UI-only flag, skip
    const allValues = searchParams.getAll(key);
    if (allValues.length > 1) {
      queryParams[key] = allValues;
    } else {
      queryParams[key] = value;
    }
  });

  // Ensure page/limit/offset are always set correctly
  queryParams.page = currentPage.toString();
  queryParams.limit = limit.toString();
  queryParams.offset = offset.toString();

  // Choose hook based on useBestSelling
  const {
    data: regularData,
    isLoading: isRegularLoading,
    isFetching: isRegularFetching,
  } = useGetAllProductsQuery(queryParams, {
    skip: useBestSelling,
  });

  const {
    data: bestSellingData,
    isLoading: isBestSellingLoading,
    isFetching: isBestSellingFetching,
  } = useGetBestSellingProductsQuery(queryParams, {
    skip: !useBestSelling,
  });

  const isLoading =
    isRegularLoading ||
    isBestSellingLoading ||
    isRegularFetching ||
    isBestSellingFetching;
  const productData = useBestSelling ? bestSellingData : regularData;
  const products = productData?.data || [];
  const meta = productData?.meta;

  const totalProducts = meta?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);
  const shouldShowPagination = totalPages > 1;

  // Transform searchParams to Record<string, string | string[] | undefined> for children components
  // ProductFilterContent/CustomPagination expect this type
  const searchParamsRecord: Record<string, string | string[] | undefined> = {};
  searchParams.forEach((value, key) => {
    const allValues = searchParams.getAll(key);
    if (allValues.length > 1) {
      searchParamsRecord[key] = allValues;
    } else {
      searchParamsRecord[key] = value;
    }
  });

  return (
    <>
      <ShopBanner />
      <section className="relative pt-0 md:pt-2 px-2 h-full">
        <ContainerMax>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4">
            <div className="hidden lg:block">
              <ProductFilterContent
                searchParams={searchParamsRecord}
                tags={tags}
                categories={categories}
                minPrice={priceRange?.minPrice || 0}
                maxPrice={priceRange?.maxPrice || 10000}
              />
            </div>
            <div className="lg:col-span-3">
              <div className="lg:hidden mb-4">
                <ProductFilterContent
                  searchParams={searchParamsRecord}
                  tags={tags}
                  categories={categories}
                  minPrice={priceRange?.minPrice || 0}
                  maxPrice={priceRange?.maxPrice || 10000}
                />
              </div>
              {isLoading ? (
                <ProductGridSkeleton
                  count={6}
                  className="lg:grid-cols-3"
                  itemClassName="h-80"
                />
              ) : (
                <>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 justify-between mt-5">
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((product: TProduct) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    ) : (
                      <div className="col-span-full">
                        <NoProductsFound />
                      </div>
                    )}
                  </div>
                  {/* Always show pagination if needed */}
                  {shouldShowPagination && (
                    <Paginate
                      totalItems={totalProducts}
                      currentPage={currentPage}
                      limit={limit}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </ContainerMax>
      </section>
    </>
  );
};

export default ShopContent;
