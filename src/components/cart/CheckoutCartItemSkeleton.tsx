import { Skeleton } from "@/components/ui/skeleton";

const CheckoutCartItemSkeleton = () => {
  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200/70">
      <div className="flex gap-3 items-start">
        <Skeleton className="size-16 sm:size-20 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItemSkeleton;
