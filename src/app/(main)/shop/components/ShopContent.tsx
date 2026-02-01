"use client";

import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import Box from "@/components/ui/ec/Box";
import Paginate from "@/components/ui/shared/paginate/Paginate";
import {
  useGetAllProductsQuery,
  useGetFeaturedProductsQuery,
} from "@/redux/features/products/productApi";
import TCategory from "@/types/categories/categories";
import { TProduct } from "@/types/products/product";
import { TTag } from "@/types/tags/tag";
import { useSearchParams } from "next/navigation";
import CategorySection from "./CategorySection";
import NoProductsFound from "./NoProductsFound";
import ProductFilterContent from "./ProductFilterContent";

type ShopContentProps = {
  categories: TCategory[];
  tags: TTag[];
  priceRange: { minPrice: number; maxPrice: number };
};

const ShopContent = ({ categories, tags, priceRange }: ShopContentProps) => {
  const searchParams = useSearchParams();
  const flashSaleParam = searchParams.get("flashSale") === "true";
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  // Convert searchParams to object for RTK query
  const queryParams: Record<string, string | string[]> = {};

  if (!flashSaleParam) {
    searchParams.forEach((value, key) => {
      // Handle multiple values for same key if necessary, though useSearchParams mostly gives single or getAll
      // For simplicity with RTK, we pass what we have.
      // Our API handles arrays if passed.
      // If there are multiple values (e.g. category=A&category=B), searchParams.getAll('category') gives array.
      const allValues = searchParams.getAll(key);
      if (allValues.length > 1) {
        queryParams[key] = allValues;
      } else {
        queryParams[key] = value;
      }
    });

    // Ensure page/limit/offset are correct
    queryParams.page = currentPage.toString();
    queryParams.limit = limit.toString();
    queryParams.offset = offset.toString();
  } else {
    // For flash sale, we might only need page/limit/offset
    queryParams.page = currentPage.toString();
    queryParams.limit = limit.toString();
    queryParams.offset = offset.toString();
  }

  // Choose hook based on flashSale param
  const {
    data: regularData,
    isLoading: isRegularLoading,
    isFetching: isRegularFetching,
  } = useGetAllProductsQuery(queryParams, {
    skip: flashSaleParam,
  });

  const {
    data: flashSaleData,
    isLoading: isFlashLoading,
    isFetching: isFlashFetching,
  } = useGetFeaturedProductsQuery(queryParams, {
    skip: !flashSaleParam,
  });

  const isLoading =
    isRegularLoading || isFlashLoading || isRegularFetching || isFlashFetching;
  const productData = flashSaleParam ? flashSaleData : regularData;
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
    <section className="relative pt-0 md:pt-2 px-2 h-full">
      <ContainerMax>
        {!searchParams.get("category") && !flashSaleParam && (
          <CategorySection categories={categories} />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:my-4">
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
              <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 justify-between">
                {[...Array(6)].map((_, i) => (
                  <Box
                    key={i}
                    className="h-80 w-full animate-pulse bg-gray-100 rounded-lg"
                  />
                ))}
              </div>
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
  );
};

export default ShopContent;
