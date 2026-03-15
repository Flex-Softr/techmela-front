"use client";

import EcButton from "@/components/EcButton/EcButton";
import { Button } from "@/components/ui/button";
import Box from "@/components/ui/ec/Box";
import CollapsibleFilterSection from "@/components/ui/ec/CollapsibleFilterSection";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryParams, type QueryKeys } from "@/hooks/useQueryParams";
import TCategory from "@/types/categories/categories";
import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import CategorySelector from "./CategorySelector";
import PriceRangeSlider from "./PriceRange";

type ShopFiltersProps = {
  searchParams: Record<string, string | string[] | undefined>;
  categories: TCategory[];
  minPrice: number;
  maxPrice: number;
};

const ShopFilters = ({
  searchParams,
  categories,
  minPrice,
  maxPrice,
}: ShopFiltersProps) => {
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const { setParam, resetParams } = useQueryParams();
  const isClearingRef = useRef<boolean>(false);

  // Local state for UI components initialized from props to prevent mount-time sync transitions
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categoryParam = searchParams["category"];
    if (!categoryParam) return [];
    return Array.isArray(categoryParam)
      ? categoryParam
      : categoryParam.split(",");
  });

  const [priceFilterState, setPriceFilterState] = useState<number[]>(() => [
    Number(searchParams.minPrice) || minPrice,
    Number(searchParams.maxPrice) || maxPrice,
  ]);
  const debouncedPrice = useDebounce(priceFilterState, 500);

  // Sync state with URL params
  useEffect(() => {
    if (isClearingRef.current) return;

    // Sync Categories
    const categoryParam = searchParams["category"];
    let initialSelected: string[] = [];
    if (categoryParam) {
      initialSelected = Array.isArray(categoryParam)
        ? categoryParam
        : categoryParam.split(",");
    }

    // Only update if actually different to prevent circular updates
    setSelectedCategories((prev) => {
      const sortedPrev = [...prev].sort();
      const sortedNew = [...initialSelected].sort();
      if (JSON.stringify(sortedPrev) === JSON.stringify(sortedNew)) return prev;
      return initialSelected;
    });

    // Sync Price
    const minParam = Number(searchParams.minPrice) || minPrice;
    const maxParam = Number(searchParams.maxPrice) || maxPrice;

    setPriceFilterState((prev) => {
      if (prev[0] === minParam && prev[1] === maxParam) return prev;
      return [minParam, maxParam];
    });
  }, [searchParams, minPrice, maxPrice]);

  // Handle filter application
  useEffect(() => {
    if (isClearingRef.current) {
      isClearingRef.current = false;
      return;
    }

    const isPriceDefault =
      debouncedPrice[0] === minPrice && debouncedPrice[1] === maxPrice;
    const isCategoryEmpty = selectedCategories.length === 0;

    const newParams: Partial<Record<QueryKeys, string>> = {
      minPrice: isPriceDefault ? "" : debouncedPrice[0].toString(),
      maxPrice: isPriceDefault ? "" : debouncedPrice[1].toString(),
      category: isCategoryEmpty
        ? ""
        : Array.from(new Set(selectedCategories)).join(","),
    };

    setParam(newParams);
  }, [debouncedPrice, selectedCategories, minPrice, maxPrice, setParam]);

  const handleClearAllFilters = () => {
    isClearingRef.current = true;
    setPriceFilterState([minPrice, maxPrice]);
    setSelectedCategories([]);
    sheetCloseRef?.current?.click();
    resetParams();
  };

  // Count active filters for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchParams.category) count += 1;
    if (searchParams.minPrice || searchParams.maxPrice) count += 1;
    return count;
  }, [searchParams]);

  const filterContent = (
    <Box className="bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-border/50 p-0 lg:p-3 space-y-1">
      {/* Header with title + clear button (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-between px-3 pt-2 pb-3 border-b border-border/40 mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          ফিল্টার করুন
        </p>
        <button
          onClick={handleClearAllFilters}
          disabled={!Object.keys(searchParams).length}
          className="text-xs text-red-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
        >
          সব মুছুন
        </button>
      </div>

      <CollapsibleFilterSection title="মূল্য পরিসীমা">
        <div className="px-1">
          <PriceRangeSlider
            initialState={priceFilterState}
            setInitialState={setPriceFilterState}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </CollapsibleFilterSection>

      <div className="h-px bg-border/40 mx-2" />

      <CategorySelector
        categories={categories}
        searchParams={searchParams}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Mobile-only clear button at bottom */}
      <div className="lg:hidden px-2 pt-3 pb-1 border-t border-border/40 mt-2">
        <EcButton
          className="w-full font-bold bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors text-sm"
          onClick={handleClearAllFilters}
          variant="outline"
          disabled={!Object.keys(searchParams).length}
        >
          সব ফিল্টার মুছুন
        </EcButton>
      </div>
    </Box>
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

export default ShopFilters;
