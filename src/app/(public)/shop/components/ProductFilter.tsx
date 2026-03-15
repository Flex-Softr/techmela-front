import EcButton from "@/components/EcButton/EcButton";
import Box from "@/components/ui/ec/Box";
import CollapsibleFilterSection from "@/components/ui/ec/CollapsibleFilterSection";
import { useDebounce } from "@/hooks/useDebounce";
import TCategory from "@/types/categories/categories";
import { useRouter, useSearchParams } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import CategorySelector from "./filters/CategorySelector";
import PriceRangeSlider from "./priceRange/PriceRange";

type ProductFilterProps = {
  searchParams: Record<string, string | string[] | undefined>;
  categories: TCategory[];
  sheetCloseRef: RefObject<HTMLButtonElement | null>;
  minPrice: number;
  maxPrice: number;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  searchParams,
  categories,
  sheetCloseRef,
  minPrice,
  maxPrice,
}) => {
  const [csSearchParams, setCsSearchParams] =
    useState<Record<string, string | string[] | undefined>>(searchParams);

  const [priceFilterInitialState, setPriceFilterInitialState] = useState<
    number[]
  >([
    Number(searchParams.minPrice) || minPrice,
    Number(searchParams.maxPrice) || maxPrice,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const debouncedPrice = useDebounce(priceFilterInitialState, 500);

  const router = useRouter();

  const searchParamsHook = useSearchParams();
  const isClearingRef = useRef<boolean>(false);

  // Sync state with URL params when they change externally (e.g. Navbar)
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
    setSelectedCategories((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(initialSelected)) {
        return initialSelected;
      }
      return prev;
    });

    // Sync Price
    const minP = Number(searchParams.minPrice) || minPrice;
    const maxP = Number(searchParams.maxPrice) || maxPrice;
    setPriceFilterInitialState((prev) => {
      if (prev[0] !== minP || prev[1] !== maxP) {
        return [minP, maxP];
      }
      return prev;
    });

    // Sync csSearchParams
    setCsSearchParams(searchParams);
  }, [searchParams, minPrice, maxPrice]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    // Preserve existing params, consolidating multiples to comma-separated
    // We use a Set to get unique keys to iterate over
    const currentKeys = Array.from(new Set(searchParamsHook.keys()));

    currentKeys.forEach((key) => {
      // Skip managed keys that we will set explicitly below
      if (["minPrice", "maxPrice", "category", "page", "offset"].includes(key))
        return;

      const values = searchParamsHook.getAll(key);
      const uniqueValues = Array.from(new Set(values));
      if (uniqueValues.length > 0) {
        params.set(key, uniqueValues.join(","));
      }
    });

    // Add minPrice and maxPrice first if they differ from original defaults
    if (
      priceFilterInitialState[0] !== minPrice ||
      priceFilterInitialState[1] !== maxPrice
    ) {
      params.set("minPrice", priceFilterInitialState[0].toString());
      params.set("maxPrice", priceFilterInitialState[1].toString());
    }

    // Append all categories as a single comma-separated parameter
    if (selectedCategories.length) {
      // Use Set to ensure uniqueness just in case
      const uniqueCategories = Array.from(new Set(selectedCategories));
      params.set("category", uniqueCategories.join(","));
    }

    // Update the URL with the filters applied
    router.push(`/shop?${params.toString()}`);

    // Close the sheet/drawer if it's open
    // if (sheetCloseRef.current) {
    //   sheetCloseRef.current.click();
    // }
  };

  const handleClearAllFilters = () => {
    isClearingRef.current = true;
    setCsSearchParams({});
    setPriceFilterInitialState([minPrice, maxPrice]);
    setSelectedCategories([]); // Clear all categories
    sheetCloseRef?.current?.click();
    router.push("/shop"); // Reset URL to base
  };

  // Auto-apply filters
  useEffect(() => {
    if (isClearingRef.current) {
      isClearingRef.current = false;
      return;
    }
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice, selectedCategories]);

  return (
    <Box className="bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-border/50 p-0 lg:p-3 space-y-1">
      {/* Header with title + clear button */}
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
            initialState={priceFilterInitialState}
            setInitialState={setPriceFilterInitialState}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </CollapsibleFilterSection>

      <div className="h-px bg-border/40 mx-2" />

      <CategorySelector
        categories={categories}
        searchParams={csSearchParams}
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
};

export default ProductFilter;
