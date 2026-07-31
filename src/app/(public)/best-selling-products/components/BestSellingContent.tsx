"use client";

import NoProductsFound from "@/app/(public)/shop/components/NoProductsFound";
import ProductCard from "@/components/productCards/ProductCard";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Paginate from "@/components/shared/paginate/Paginate";
import { useGetBestSellingProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/products/product";
import { useSearchParams } from "next/navigation";

const BestSellingContent = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetBestSellingProductsQuery({
    limit,
    page: currentPage,
  });

  const products = productData?.data || [];
  const meta = productData?.meta;
  const totalProducts = meta?.total ?? 0;
  const totalPages = meta?.totalPage ?? 1;
  const shouldShowPagination = totalPages > 1;

  return (
    <>
      <section className="relative py-4 md:py-8 bg-muted/30">
        <ContainerMax>
          {isLoading || isFetching ? (
            <ProductGridSkeleton count={limit} />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3">
                {products.map((product: TProduct, index: number) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    priority={index < 5}
                  />
                ))}
              </div>
              {shouldShowPagination && (
                <Paginate
                  totalItems={totalProducts}
                  currentPage={currentPage}
                  limit={limit}
                />
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <NoProductsFound />
            </div>
          )}
        </ContainerMax>
      </section>
    </>
  );
};

export default BestSellingContent;
