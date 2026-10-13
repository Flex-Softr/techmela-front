"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SidebarCartItemSkeleton = () => {
  return (
    <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80">
      <div className="flex gap-3 items-start">
        <Skeleton className="size-16 sm:size-18 flex-shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <Skeleton className="h-6 w-18 rounded-lg" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCartItemSkeleton;
