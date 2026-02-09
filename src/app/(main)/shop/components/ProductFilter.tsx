import EcButton from "@/components/EcButton/EcButton";
import Box from "@/components/ui/ec/Box";
import CollapsibleFilterSection from "@/components/ui/ec/CollapsibleFilterSection";
import { useDebounce } from "@/hooks/useDebounce";
import TCategory from "@/types/categories/categories";
import { TTag } from "@/types/tags/tag";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useState } from "react";
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

  const handleApplyFilters = () => {
    let newSearchParams = "";

    // Add minPrice and maxPrice first if they differ from original defaults
    if (
      priceFilterInitialState[0] !== minPrice ||
      priceFilterInitialState[1] !== maxPrice
    ) {
      newSearchParams = `minPrice=${priceFilterInitialState[0]}&maxPrice=${priceFilterInitialState[1]}`;
    }

    // Append all categories as a single comma-separated parameter
    if (selectedCategories.length) {
      // Use Set to ensure uniqueness just in case
      const uniqueCategories = Array.from(new Set(selectedCategories));
      newSearchParams = `${newSearchParams}&category=${uniqueCategories.join(",")}`;
    }

    // Add tags if available
    if (tagParams) {
      newSearchParams = `${newSearchParams}&${tagParams}`;
    }

    // Update the URL with the filters applied
    router.push(`/shop?${newSearchParams}`);

    // Close the sheet/drawer if it's open
    // if (sheetCloseRef.current) {
    //   sheetCloseRef.current.click();
    // }
  };

  const handleClearAllFilters = () => {
    setCsSearchParams({});
    setPriceFilterInitialState([minPrice, maxPrice]);
    setTagParams("");
    setSelectedCategories([]); // Clear all categories
    sheetCloseRef?.current?.click();
    router.push("/shop"); // Reset URL to base
  };

  // Auto-apply filters when any filter state changes
  useEffect(() => {
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
