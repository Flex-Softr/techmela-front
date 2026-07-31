"use client";

import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Paginate from "@/components/shared/paginate/Paginate";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import ProductGrid from "./ProductGrid";
import ProductSorter from "./ProductSorter";
import { ShopFiltersProvider, useShopFilters } from "./ShopFiltersContext";

type ShopContentProps = {
  children?: React.ReactNode;
  minPrice?: number;
  maxPrice?: number;
  defaultSelectedCategories?: string[];
  syncDefaultCategoriesToUrl?: boolean;
  hideSidebar?: boolean;
};

const ShopContentInner = ({
  children,
  hideSidebar,
}: {
  children?: React.ReactNode;
  hideSidebar?: boolean;
}) => {
  const { queryParams, currentPage, limit } = useShopFilters();
  const { data: productData, isLoading } = useGetAllProductsQuery(queryParams);

  const products = productData?.data || [];
  const meta = productData?.meta;
  const totalProducts = meta?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / limit);
  const shouldShowPagination = totalPages > 1;

  return (
    <section className="relative pt-0 md:pt-2 px-2 h-full">
      <ContainerMax>
        <div
          className={
            hideSidebar
              ? "my-2 md:mb-4"
              : "grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4"
          }
        >
          {/* Sidebar Filter – desktop only */}
          {!hideSidebar && <div className="hidden lg:block">{children}</div>}

          {/* Main Content */}
          <div className={hideSidebar ? "w-full" : "lg:col-span-3"}>
            {/* Filter trigger shows above content on mobile */}
            {!hideSidebar && <div className="lg:hidden mb-4">{children}</div>}

            <ProductSorter />
            {isLoading ? (
              <ProductGridSkeleton
                count={10}
                className={
                  hideSidebar
                    ? "lg:grid-cols-5"
                    : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }
              />
            ) : (
              <ProductGrid
                products={products}
                gridClassName={
                  hideSidebar
                    ? "lg:grid-cols-5"
                    : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }
              />
            )}

            {!isLoading && shouldShowPagination && (
              <Paginate
                totalItems={totalProducts}
                currentPage={currentPage}
                limit={limit}
              />
            )}
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

const ShopContent = ({
  children,
  minPrice,
  maxPrice,
  defaultSelectedCategories,
  syncDefaultCategoriesToUrl,
  hideSidebar,
}: ShopContentProps) => {
  return (
    <ShopFiltersProvider
      minPrice={minPrice}
      maxPrice={maxPrice}
      defaultCategories={defaultSelectedCategories}
      syncDefaultCategoriesToUrl={syncDefaultCategoriesToUrl}
    >
      <ShopContentInner hideSidebar={hideSidebar}>{children}</ShopContentInner>
    </ShopFiltersProvider>
  );
};

export default ShopContent;
