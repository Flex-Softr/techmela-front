"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SidebarCartItemSkeleton = () => {
  return (
    <div className="flex gap-3 relative py-3 px-2 bg-background rounded-xl shadow-sm border border-border">
      <Skeleton className="w-16 h-16 flex-shrink-0 rounded-md" />
      <div className="flex-1 flex flex-col justify-center gap-2 min-w-0">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <div className="absolute right-2 bottom-3">
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default SidebarCartItemSkeleton;
