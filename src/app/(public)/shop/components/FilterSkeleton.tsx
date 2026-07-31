import Box from "@/components/ui/ec/Box";

const FilterSkeleton = () => {
  return (
    <Box className="bg-background lg:rounded-xl lg:shadow-sm lg:border lg:border-border/50 p-0 lg:p-3 space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="hidden lg:flex items-center justify-between px-3 pt-2 pb-3 border-b border-border/40 mb-2">
        <div className="h-3 bg-muted w-20 rounded" />
        <div className="h-3 bg-muted w-12 rounded" />
      </div>

      {/* Price Range Skeleton */}
      <div className="px-3 space-y-3">
        <div className="h-3 bg-muted w-24 rounded" />
        <div className="h-8 bg-muted w-full rounded" />
      </div>

      <div className="h-px bg-border/40 mx-2" />

      {/* Categories List Skeleton */}
      <div className="px-3 space-y-3">
        <div className="h-3 bg-muted w-28 rounded" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted rounded" />
              <div className="h-3 bg-muted w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterSkeleton;
