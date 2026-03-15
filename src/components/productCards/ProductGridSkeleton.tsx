import { cn } from "@/lib/utils";

type ProductGridSkeletonProps = {
  count?: number;
  className?: string;
  itemClassName?: string;
};

const ProductGridSkeleton = ({
  count = 8,
  className,
  itemClassName,
}: ProductGridSkeletonProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 justify-between",
        className
      )}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "border border-gray-200 rounded-lg overflow-hidden bg-background flex flex-col justify-between shadow-sm mx-auto h-full w-full sm:w-[300px]",
            itemClassName
          )}
        >
          <div className="flex flex-col gap-1.5 md:gap-3 p-1 md:p-3 relative animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full aspect-square bg-gray-200 rounded-md mb-2" />

            <div className="flex flex-col gap-2 xms:px-1 xls:px-1 sm:px-1 md:px-2">
              {/* Title Skeleton */}
              <div className="h-4 md:h-5 bg-gray-200 rounded-md w-3/4" />
              <div className="h-4 md:h-5 bg-gray-200 rounded-md w-1/2" />

              <div className="flex justify-between items-center mt-2">
                {/* Price Skeleton */}
                <div className="h-4 w-16 bg-gray-200 rounded-md" />
                {/* Stock Skeleton */}
                <div className="h-4 w-12 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="m-1 md:m-3 mt-0 p-1 md:p-0">
            <div className="h-9 w-full bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
