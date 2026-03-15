"use client";
import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import Paginate from "@/components/ui/shared/paginate/Paginate";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import TCategory from "@/types/categories/categories";
import { TProduct } from "@/types/products/product";
import { useSearchParams } from "next/navigation";
import NoProductsFound from "./NoProductsFound";
import ProductFilterContent from "./ProductFilterContent";
import ShopBanner from "./ShopBanner";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";

type ShopContentProps = {
  categories: TCategory[];
  priceRange: { minPrice: number; maxPrice: number };
};

const ShopContent = ({ categories, priceRange }: ShopContentProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const offset = (currentPage - 1) * limit;

  // Convert searchParams to object for RTK query
  const queryParams: Record<string, string | string[]> = {
    sort: "-updatedAt",
    page: currentPage.toString(),
    limit: limit.toString(),
    offset: offset.toString(),
  };

  // Forward all meaningful search params to the API
  searchParams.forEach((value, key) => {
    // Skip params we handle manually or are UI-only
    if (["page", "limit", "offset", "best-selling"].includes(key)) return;

    const allValues = searchParams.getAll(key);
    queryParams[key] = allValues.length > 1 ? allValues : value;
  });

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(queryParams);

  const products = productData?.data || [];
  const meta = productData?.meta;
  const totalProducts = meta?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);
  const shouldShowPagination = totalPages > 1;

  // Transform searchParams for children components
  const searchParamsRecord: Record<string, string | string[] | undefined> = {};
  searchParams.forEach((value, key) => {
    const allValues = searchParams.getAll(key);
    searchParamsRecord[key] = allValues.length > 1 ? allValues : value;
  });

  return (
    <>
      <ShopBanner />
      <section className="relative pt-0 md:pt-2 px-2 h-full">
        <ContainerMax>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4">
            {/* Sidebar Filter */}
            <div className="hidden lg:block">
              <ProductFilterContent
                searchParams={searchParamsRecord}
                categories={categories}
                minPrice={priceRange?.minPrice || 0}
                maxPrice={priceRange?.maxPrice || 10000}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Mobile Filter */}
              <div className="lg:hidden mb-4">
                <ProductFilterContent
                  searchParams={searchParamsRecord}
                  categories={categories}
                  minPrice={priceRange?.minPrice || 0}
                  maxPrice={priceRange?.maxPrice || 10000}
                />
              </div>

              {isLoading || isFetching ? (
                <ProductGridSkeleton
                  count={6}
                  className="lg:grid-cols-3"
                  itemClassName="h-80"
                />
              ) : (
                <>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 justify-between mt-5">
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((product: TProduct, index: number) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          priority={index < 4}
                        />
                      ))
                    ) : (
                      <div className="col-span-full">
                        <NoProductsFound />
                      </div>
                    )}
                  </div>

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
