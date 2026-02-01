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
import { TTag } from "@/types/tags/tag";
import { useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import ProductFilter from "./ProductFilter";

const ProductFilterContent = ({
  searchParams,
  tags,
  categories,
  minPrice,
  maxPrice,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  tags: TTag[];
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

    // Count price range as one if either minPrice or maxPrice is present
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
      tags={tags}
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
              className="w-full flex justify-between items-center px-4 py-6 border-2 border-primary/10 hover:border-primary/30 transition-all rounded-xl shadow-sm bg-white"
            >
              <div className="flex items-center gap-3">
                <FaBarsStaggered className="text-primary w-5 h-5" />
                <span className="font-semibold text-gray-700">Filters</span>
              </div>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full h-6 w-6 animate-in zoom-in duration-300">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[400px] p-0 flex flex-col"
          >
            <SheetHeader className="p-6 border-b shrink-0">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <FaBarsStaggered className="text-primary" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6">
              {filterContent}
              <SheetClose asChild>
                <button ref={sheetCloseRef} className="hidden" />
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">{filterContent}</div>
    </>
  );
};

export default ProductFilterContent;
