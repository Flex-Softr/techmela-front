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
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import TBrand from "@/types/brands/brands";
import TCategory from "@/types/categories/categories";
import TCollection from "@/types/collections/collections";
import { X } from "lucide-react";
import { useRef } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import BrandSelectorWrapper from "./brands/BrandSelectorWrapper";
import CategorySelector from "./categories/CategorySelector";
import CollapsibleFilterSection from "./CollapsibleFilterSection";
import CollectionSelectorWrapper from "./collections/CollectionSelectorWrapper";
import PriceRangeSliderWrapper from "./price-range/PriceRangeSliderWrapper";
import { useShopFilters } from "./ShopFiltersContext";

type ShopFiltersProps = {
  categories: TCategory[];
  brands: TBrand[];
  collections: TCollection[];
  priceRange: { minPrice: number; maxPrice: number };
  hideCategorySection?: boolean;
};

const ShopFilters = ({
  categories,
  brands,
  collections,
  priceRange,
  hideCategorySection = false,
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
    <Box className="bg-background lg:rounded-xl lg:border lg:border-border/50 p-0 lg:p-3 space-y-1">
      {/* Header with title + clear button (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-between px-3 pt-2 pb-2.5 border-b border-border/40">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Filters
        </p>
        <button
          onClick={clearAllFilters}
          disabled={activeFilterCount === 0}
          className="text-xs text-destructive hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="pt-0 lg:pt-2">
        <CollapsibleFilterSection title="Price range">
          <div className="px-1">
            <PriceRangeSliderWrapper
              min={priceRange.minPrice}
              max={priceRange.maxPrice}
            />
          </div>
        </CollapsibleFilterSection>
      </div>

      {!hideCategorySection && <CategorySelector categories={categories} />}

      <BrandSelectorWrapper brands={brands} />

      <CollectionSelectorWrapper collections={collections} />

      <CollapsibleFilterSection title="Stock status">
        <div className="px-2 py-1 space-y-2">
          {[
            { label: "In stock", value: "in_stock" },
            { label: "Out of stock", value: "out_of_stock" },
            { label: "Low stock", value: "low_stock" },
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
                      : "border-border group-hover:border-primary/50"
                  )}
                >
                  {stockStatus === status.value && (
                    <div className="size-2.5 rounded-full bg-primary animate-in zoom-in duration-200" />
                  )}
                </div>
              </div>
              <span
                className={cn(
                  "text-sm font-medium text-foreground transition-colors",
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
          className="w-full font-bold bg-background border border-destructive/25 text-destructive hover:bg-destructive/10 hover:border-destructive transition-colors text-sm"
          onClick={() => {
            clearAllFilters();
            sheetCloseRef.current?.click();
          }}
          variant="outline"
          disabled={activeFilterCount === 0}
        >
          Clear all filters
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
              className="w-full flex justify-between items-center px-4 py-5 border-2 border-primary/10 hover:border-primary/30 transition-all rounded-md bg-background"
            >
              <div className="flex items-center gap-2.5">
                <FaBarsStaggered className="text-primary w-4 h-4" />
                <span className="font-semibold text-foreground">Filters</span>
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
                    className="flex items-center gap-1 px-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/15 transition-colors border border-destructive/20"
                  >
                    <X className="size-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Clear
                    </span>
                  </div>
                )}
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 animate-in zoom-in duration-300">
                    {activeFilterCount}
                  </span>
                )}
              </div>
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
                  Filters
                </SheetTitle>
                <SheetClose asChild>
                  <button
                    ref={sheetCloseRef}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
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
            <div className="p-4 border-t bg-background shrink-0">
              <Button
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex justify-between items-center px-6"
                onClick={() => sheetCloseRef.current?.click()}
              >
                <span>Show results</span>
                <span className="bg-background/20 px-2 py-0.5 rounded-lg text-xs">
                  {totalProducts} products
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
