import { cn } from "@/lib/utils";

type ProductGridSkeletonProps = {
  count?: number;
  className?: string;
  itemClassName?: string;
};

const ProductGridSkeleton = ({
  count = 10,
  className,
  itemClassName,
}: ProductGridSkeletonProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3",
        className
      )}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-background",
            itemClassName
          )}
        >
          <div className="animate-pulse">
            <div className="aspect-square w-full bg-muted/60" />
            <div className="space-y-2 p-2.5">
              <div className="h-3 w-4/5 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="mt-2 flex items-center justify-between">
                <div className="h-4 w-14 rounded bg-muted" />
                <div className="h-8 w-8 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
