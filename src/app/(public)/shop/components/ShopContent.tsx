"use client";

import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Paginate from "@/components/shared/paginate/Paginate";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { Suspense } from "react";
import FilterSkeleton from "./FilterSkeleton";
import ProductGrid from "./ProductGrid";

type ShopContentProps = {
  children: React.ReactNode;
};

const ShopContent = ({ children }: ShopContentProps) => {
  const { queryParams, currentPage, limit } = useQueryParams();

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

  return (
    <section className="relative pt-0 md:pt-2 px-2 h-full">
      <ContainerMax>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4">
          {/* Sidebar Filter */}
          <div className="hidden lg:block">
            <Suspense fallback={<FilterSkeleton />}>{children}</Suspense>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filter */}
            <div className="lg:hidden mb-4">
              <Suspense fallback={<FilterSkeleton />}>{children}</Suspense>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              isFetching={isFetching}
            />

            {!isLoading && !isFetching && shouldShowPagination && (
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

export default ShopContent;
