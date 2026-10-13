import ShopBanner from "@/app/(public)/shop/components/ShopBanner";
import {
  SHOP_GRID_COLUMNS,
  SHOP_SKELETON_COUNT,
} from "@/app/(public)/shop/components/shopGrid.const";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Box from "@/components/ui/ec/Box";
import { cn } from "@/lib/utils";

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
                <div className="h-6 w-32 rounded bg-muted animate-pulse" />
                <div className="space-y-3 pt-4 border-t">
                  <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                  <div className="h-10 w-full rounded bg-muted animate-pulse" />
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              </Box>
            </div>

            <div className="lg:col-span-3">
              {/* Mobile Filters Skeleton */}
              <div className="lg:hidden mb-4">
                <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm bg-background animate-pulse">
                  <div className="h-5 w-24 bg-muted rounded" />
                </div>
              </div>

              <ProductGridSkeleton
                count={SHOP_SKELETON_COUNT}
                className={cn("mt-5 lg:mt-0", SHOP_GRID_COLUMNS)}
              />
            </div>
          </div>
        </ContainerMax>
      </section>
    </>
  );
}
