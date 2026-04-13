"use client";

import EcButton from "@/components/shared/EcButton/EcButton";
import { Button } from "@/components/ui/button";
import Box from "@/components/ui/ec/Box";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useShopFilters } from "./ShopFiltersContext";
import CollapsibleFilterSection from "./CollapsibleFilterSection";
import TCategory from "@/types/categories/categories";
import TBrand from "@/types/brands/brands";
import TCollection from "@/types/collections/collections";
import CategorySelector from "./categories/CategorySelector";
import BrandSelectorWrapper from "./brands/BrandSelectorWrapper";
import CollectionSelectorWrapper from "./collections/CollectionSelectorWrapper";
import PriceRangeSliderWrapper from "./price-range/PriceRangeSliderWrapper";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

type ShopFiltersProps = {
  categories: TCategory[];
  brands: TBrand[];
  collections: TCollection[];
  priceRange: { minPrice: number; maxPrice: number };
};

const ShopFilters = ({
  categories,
  brands,
  collections,
  priceRange,
}: ShopFiltersProps) => {
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const {
    stockStatus,
    setStockStatus,
    clearAllFilters,
    activeFilterCount,
    queryParams,
  } = useShopFilters();

  const { data: productData } = useGetAllProductsQuery(queryParams);
  const totalProducts = productData?.meta?.total ?? 0;

  const filterContent = (
    <Box className="bg-white lg:rounded-xl lg:border lg:border-border/50 p-0 lg:p-3 space-y-1 font-hind-siliguri">
      {/* Header with title + clear button (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-between px-3 pt-2 pb-2.5 border-b border-border/40">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          ফিল্টার করুন
        </p>
        <button
          onClick={clearAllFilters}
          disabled={activeFilterCount === 0}
          className="text-xs text-red-500 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
        >
          সব মুছুন
        </button>
      </div>

      <div className="pt-0 lg:pt-2">
        <CollapsibleFilterSection title="মূল্য পরিসীমা">
          <div className="px-1">
            <PriceRangeSliderWrapper
              min={priceRange.minPrice}
              max={priceRange.maxPrice}
            />
          </div>
        </CollapsibleFilterSection>
      </div>

      <CategorySelector categories={categories} />

      <BrandSelectorWrapper brands={brands} />

      <CollectionSelectorWrapper collections={collections} />

      <CollapsibleFilterSection title="স্টক স্ট্যাটাস">
        <div className="px-2 py-1 space-y-2">
          {[
            { label: "স্টকে আছে", value: "in_stock" },
            { label: "স্টক শেষ", value: "out_of_stock" },
            { label: "অল্প আছে", value: "low_stock" },
          ].map((status) => (
            <label
              key={status.value}
              className="flex items-center gap-3 cursor-pointer group px-2 py-2 rounded-md hover:bg-primary/5 transition-all"
              onClick={() => {
                if (stockStatus === status.value) {
                  setStockStatus("");
                } else {
                  setStockStatus(status.value);
                }
              }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    "size-5 rounded-full border-2 transition-all flex items-center justify-center",
                    stockStatus === status.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 group-hover:border-primary/50"
                  )}
                >
                  {stockStatus === status.value && (
                    <div className="size-2.5 rounded-full bg-primary animate-in zoom-in duration-200" />
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "text-sm font-medium text-gray-700 transition-colors",
                  stockStatus === status.value && "text-primary font-semibold"
                )}
              >
                {status.label}
              </span>
            </label>
          ))}
        </div>
      </CollapsibleFilterSection>

      {/* Mobile-only clear button at bottom */}
      <div className="lg:hidden px-2 pt-3 pb-1 border-t border-border/40 mt-2">
        <EcButton
          className="w-full font-bold bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors text-sm"
          onClick={() => {
            clearAllFilters();
            sheetCloseRef.current?.click();
          }}
          variant="outline"
          disabled={activeFilterCount === 0}
        >
          সব ফিল্টার মুছুন
        </EcButton>
      </div>
    </Box>
  );

  return (
    <>
      <div className="block lg:hidden font-hind-siliguri">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center px-4 py-5 border-2 border-primary/10 hover:border-primary/30 transition-all rounded-md bg-white"
            >
              <div className="flex items-center gap-2.5">
                <FaBarsStaggered className="text-primary w-4 h-4" />
                <span className="font-semibold text-gray-700">
                  ফিল্টার করুন
                </span>
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <div
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearAllFilters();
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
                  >
                    <X className="size-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      মুছুন
                    </span>
                  </div>
                )}
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full h-5 w-5 animate-in zoom-in duration-300">
                    {activeFilterCount}
                  </span>
                )}
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[360px] p-0 flex flex-col font-hind-siliguri"
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
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {filterContent}
            </div>

            {/* Mobile Sticky Footer */}
            <div className="p-4 border-t bg-white shrink-0">
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex justify-between items-center px-6"
                onClick={() => sheetCloseRef.current?.click()}
              >
                <span>ফলাফল দেখুন</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs">
                  {totalProducts} টি বই
                </span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:block">{filterContent}</div>
    </>
  );
};

export default ShopFilters;
