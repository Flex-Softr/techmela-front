"use client";

import NoProductsFound from "@/app/(public)/shop/components/NoProductsFound";
import ContainerMax from "@/components/containerMax/ContainerMax";
import ProductCard from "@/components/productCards/ProductCard";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import Paginate from "@/components/ui/shared/paginate/Paginate";
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
      <section className="relative py-4 md:py-8 bg-gray-50/30">
        <ContainerMax>
          {isLoading || isFetching ? (
            <ProductGridSkeleton count={limit} />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 justify-between">
                {products.map((product: TProduct, index: number) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    priority={index < 4}
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
