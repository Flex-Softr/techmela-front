import ContainerMax from "@/components/containerMax/ContainerMax";
import Box from "@/components/ui/ec/Box";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import ShopBanner from "@/components/ShopBanner/ShopBanner";

export default function ShopLoading() {
  return (
    <>
      <ShopBanner />
      <section className="relative pt-0 md:pt-2 px-2 h-full">
        <ContainerMax>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-2 md:mb-4">
            {/* Desktop Filters Skeleton */}
            <div className="hidden lg:block space-y-6">
              <Box className="p-4 space-y-4">
                <div className="h-6 w-32 rounded bg-gray-200 animate-pulse" />
                <div className="space-y-3 pt-4 border-t">
                  <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
                    </div>
                  ))}
                </div>
              </Box>
            </div>

            <div className="lg:col-span-3">
              {/* Mobile Filters Skeleton */}
              <div className="lg:hidden mb-4">
                <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm bg-white animate-pulse">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                </div>
              </div>

              <ProductGridSkeleton
                count={12}
                className="lg:grid-cols-3 mt-5 lg:mt-0"
                itemClassName="h-80"
              />
            </div>
          </div>
        </ContainerMax>
      </section>
    </>
  );
}
