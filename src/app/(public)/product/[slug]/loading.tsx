import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Box from "@/components/ui/ec/Box";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <ContainerMax>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Image Gallery Skeleton */}
          <Box className="shadow-none ring-2 md:mt-5 p-4">
            <Skeleton className="w-full aspect-square rounded-xl" />
            <div className="flex gap-2 mt-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md shrink-0" />
              ))}
            </div>
          </Box>

          {/* Product Info Skeleton */}
          <Box className="space-y-6 shadow-none ring-0 mt-5">
            {/* Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Price */}
            <Skeleton className="h-10 w-1/3" />

            {/* Chips / Meta */}
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Variations */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-20" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-16" />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-12 flex-1 rounded-md" />
              <Skeleton className="h-12 flex-1 rounded-md" />
            </div>
          </Box>

          {/* Details Section Skeleton */}
          <div className="col-span-1 md:col-span-2 px-3 md:mt-5 space-y-8">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>

          {/* Related Products Skeleton */}
          <div className="col-span-1 md:col-span-2 mt-5">
            <Skeleton className="h-8 w-48 mb-6 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
}
