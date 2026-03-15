import { Skeleton } from "@/components/ui/skeleton";

const CheckoutCartItemSkeleton = () => {
  return (
    <div className="flex items-start gap-3 pb-4 border-b last:border-b-0">
      <Skeleton className="w-16 h-16 flex-shrink-0 rounded-md" />
      <div className="flex-grow min-w-0 flex flex-col h-full justify-between gap-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex items-center border rounded-md w-max p-1 gap-2">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-6 h-6 rounded" />
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full gap-2 min-w-[80px]">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
    </div>
  );
};

export default CheckoutCartItemSkeleton;
