import EcButton from "@/components/EcButton/EcButton";
import Box from "@/components/ui/ec/Box";
import CollapsibleFilterSection from "@/components/ui/ec/CollapsibleFilterSection";
import { useDebounce } from "@/hooks/useDebounce";
import TCategory from "@/types/categories/categories";
import { TTag } from "@/types/tags/tag";
import { useRouter, useSearchParams } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import CategorySelector from "./filters/CategorySelector";
import PriceRangeSlider from "./priceRange/PriceRange";

type ProductFilterProps = {
  searchParams: Record<string, string | string[] | undefined>;
  tags: TTag[];
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
  const [tagParams, setTagParams] = useState<string>("");
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

    // Add tags if available
    if (tagParams) {
      const parts = tagParams.split("=");
      if (parts.length === 2) {
        params.set(parts[0], parts[1]);
      }
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
    setTagParams("");
    setSelectedCategories([]); // Clear all categories
    sheetCloseRef?.current?.click();
    router.push("/shop"); // Reset URL to base
  };

  // Auto-apply filters when any filter state changes
  useEffect(() => {
    if (isClearingRef.current) {
      isClearingRef.current = false;
      return;
    }
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice, selectedCategories, tagParams]);

  return (
    <Box className="bg-white p-0 lg:p-5 space-y-8 lg:rounded-lg lg:shadow-sm lg:border lg:border-gray-100">
      <div className="space-y-4">
        <CollapsibleFilterSection
          title="Filter by price"
          headerClassName="bg-gray-50 text-gray-900 font-medium border border-gray-200 shadow-sm text-sm"
        >
          <PriceRangeSlider
            initialState={priceFilterInitialState}
            setInitialState={setPriceFilterInitialState}
            min={minPrice}
            max={maxPrice}
          />
        </CollapsibleFilterSection>
      </div>

      <div className="space-y-4">
        <CategorySelector
          categories={categories}
          searchParams={csSearchParams}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t">
        {/* Find button removed for auto-apply */}
        <EcButton
          className="flex-1 font-bold bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={handleClearAllFilters}
          variant="outline"
          disabled={!Object.keys(searchParams).length}
        >
          Clear
        </EcButton>
      </div>
    </Box>
  );
};

export default ProductFilter;
