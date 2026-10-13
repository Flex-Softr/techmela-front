"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { usePathname } from "next/navigation";

const SORT_OPTIONS = [
  { value: "-updatedAt", label: "ডিফল্ট সাজান" },
  { value: "price", label: "দাম: কম থেকে বেশি" },
  { value: "-price", label: "দাম: বেশি থেকে কম" },
];

const ProductSorter = () => {
  const { setParam, queryParams } = useQueryParams();
  const { data: productData } = useGetAllProductsQuery(queryParams);

  const totalProducts = productData?.meta?.total ?? 0;
  const currentSort = (queryParams.sort as string) || "-updatedAt";

  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith("/category/");

  const handleSortChange = (value: string) => {
    setParam({ sort: value, page: "1" });
  };

  return (
    <div className="flex items-center justify-between gap-3 mb-5 px-1">
      {!isCategoryPage && (
        <p className="text-sm text-muted-foreground">
          মোট{" "}
          <span className="font-bold text-foreground">{totalProducts}</span> টি পণ্য
        </p>
      )}

      <div className="ml-auto">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[170px] h-9 bg-background border border-border rounded-lg text-sm font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary/50 focus:outline-none transition-all hover:border-primary/30">
            <SelectValue placeholder="সাজান" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSorter;
