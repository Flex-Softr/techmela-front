"use client";

import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Paginate from "@/components/shared/paginate/Paginate";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import ProductGrid from "./ProductGrid";
import ProductSorter from "./ProductSorter";
import { ShopFiltersProvider, useShopFilters } from "./ShopFiltersContext";

type ShopContentProps = {
  children: React.ReactNode;
  minPrice?: number;
  maxPrice?: number;
  defaultSelectedCategories?: string[];
  syncDefaultCategoriesToUrl?: boolean;
};

const ShopContentInner = ({ children }: { children: React.ReactNode }) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4">
          {/* Sidebar Filter – desktop only */}
          <div className="hidden lg:block">{children}</div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter trigger shows above content on mobile */}
            <div className="lg:hidden mb-4">{children}</div>

            <ProductSorter />
            {isLoading ? (
              <ProductGridSkeleton
                count={6}
                className="lg:grid-cols-3"
                itemClassName="h-80"
              />
            ) : (
              <ProductGrid products={products} />
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
}: ShopContentProps) => {
  return (
    <ShopFiltersProvider
      minPrice={minPrice}
      maxPrice={maxPrice}
      defaultCategories={defaultSelectedCategories}
      syncDefaultCategoriesToUrl={syncDefaultCategoriesToUrl}
    >
      <ShopContentInner>{children}</ShopContentInner>
    </ShopFiltersProvider>
  );
};

export default ShopContent;
