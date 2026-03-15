"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TCategory from "@/types/categories/categories";
import { X } from "lucide-react";
import { useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import ProductFilter from "./ProductFilter";

const ProductFilterContent = ({
  searchParams,
  categories,
  minPrice,
  maxPrice,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  categories: TCategory[];
  minPrice: number;
  maxPrice: number;
}) => {
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  // Count active filters
  const activeFilterCount = (() => {
    const keys = Object.keys(searchParams).filter(
      (key) =>
        !["page", "limit", "offset", "minPrice", "maxPrice"].includes(key) &&
        searchParams[key] !== undefined &&
        searchParams[key] !== ""
    );

    let count = keys.length;

    if (
      (searchParams.minPrice !== undefined && searchParams.minPrice !== "") ||
      (searchParams.maxPrice !== undefined && searchParams.maxPrice !== "")
    ) {
      count += 1;
    }

    return count;
  })();

  const filterContent = (
    <ProductFilter
      searchParams={searchParams}
      categories={categories}
      sheetCloseRef={sheetCloseRef}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
  );

  return (
    <>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center px-4 py-5 border-2 border-primary/10 hover:border-primary/30 transition-all rounded-xl shadow-sm bg-white"
            >
              <div className="flex items-center gap-2.5">
                <FaBarsStaggered className="text-primary w-4 h-4" />
                <span className="font-semibold text-gray-700">
                  ফিল্টার করুন
                </span>
              </div>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full h-5 w-5 animate-in zoom-in duration-300">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[360px] p-0 flex flex-col"
          >
            {/* Header with close button */}
            <SheetHeader className="px-4 py-3 border-b shrink-0">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-base font-bold flex items-center gap-2">
                  <FaBarsStaggered className="text-primary w-4 h-4" />
                  ফিল্টার করুন
                </SheetTitle>
                <SheetClose asChild>
                  <button
                    ref={sheetCloseRef}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Close filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </SheetClose>
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {filterContent}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">{filterContent}</div>
    </>
  );
};

export default ProductFilterContent;
