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
  const [filters, setFilters] = useState<string>("");
  const [priceFilterInitialState, setPriceFilterInitialState] = useState<
    number[]
  >([
    Number(searchParams.minPrice) || minPrice,
    Number(searchParams.maxPrice) || maxPrice,
  ]);
  const [tagParams, setTagParams] = useState<string>("");
  const [categoryParams, setCategoryParams] = useState<string[]>([]); // Store multiple categories as an array
  const [subcategoryParams, setSubcategoryParams] = useState<
    Record<string, string[]>
  >({});

  const debouncedPrice = useDebounce(priceFilterInitialState, 500);

  const router = useRouter();

  useEffect(() => {
    let newSearchParams = "";

    // Append minPrice and maxPrice if they differ from original defaults
    const currentMin = priceFilterInitialState[0];
    const currentMax = priceFilterInitialState[1];

    if (currentMin !== minPrice || currentMax !== maxPrice) {
      newSearchParams = `minPrice=${currentMin}&maxPrice=${currentMax}`;
    }

    // Handle subcategoryParams
    if (Object.keys(subcategoryParams).length) {
      Object.entries(subcategoryParams).forEach(([, subcategories]) => {
        if (subcategories.length) {
          // Add only the subcategories to the query string
          newSearchParams = `${newSearchParams}&subCategory=${subcategories.join(
            ","
          )}`;
        }
      });
    }

    // Handle categoryParams excluding categories with selected subcategories
    const remainingCategories = categoryParams.filter(
      (category) => !subcategoryParams[category]?.length
    );
    if (remainingCategories.length) {
      remainingCategories.forEach((category) => {
        newSearchParams = `${newSearchParams}&category=${category}`;
      });
    }

    // Append tagParams if present
    if (tagParams) {
      newSearchParams = `${newSearchParams}&${tagParams}`;
    }

    setFilters(newSearchParams);
  }, [
    priceFilterInitialState,
    tagParams,
    categoryParams,
    subcategoryParams,
    minPrice,
    maxPrice,
  ]);

  const handleClearAllFilters = () => {
    setCsSearchParams({});
    setPriceFilterInitialState([minPrice, maxPrice]);
    setTagParams("");
    setCategoryParams([]); // Clear category
    setSubcategoryParams({}); // Clear all subcategories
    sheetCloseRef?.current?.click();
    router.push("/shop"); // Reset URL to base
  };

  const handleApplyFilters = () => {
    let newSearchParams = "";

    // Add minPrice and maxPrice first if they differ from original defaults
    if (
      priceFilterInitialState[0] !== minPrice ||
      priceFilterInitialState[1] !== maxPrice
    ) {
      newSearchParams = `minPrice=${priceFilterInitialState[0]}&maxPrice=${priceFilterInitialState[1]}`;
    }

    // Add subcategory if present, ignoring categoryParams
    if (Object.keys(subcategoryParams).length) {
      Object.entries(subcategoryParams).forEach(([, subcategories]) => {
        if (subcategories.length) {
          newSearchParams = `${newSearchParams}&subCategory=${subcategories.join(
            ","
          )}`;
        }
      });
    }

    // Add remaining categories without subcategories
    const remainingCategories = categoryParams.filter(
      (category) => !subcategoryParams[category]?.length
    );
    if (remainingCategories.length) {
      remainingCategories.forEach((category) => {
        newSearchParams = `${newSearchParams}&category=${category}`;
      });
    }

    // Add tags if available
    if (tagParams) {
      newSearchParams = `${newSearchParams}&${tagParams}`;
    }

    // Update the URL with the filters applied
    router.push(`/shop?${newSearchParams}`);

    // Close the sheet/drawer if it's open
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  // Auto-apply filters when debounced price changes
  useEffect(() => {
    // Only apply if the current debounced price is different from the search params
    const searchParamsMin = Number(searchParams.minPrice) || minPrice;
    const searchParamsMax = Number(searchParams.maxPrice) || maxPrice;

    if (
      debouncedPrice[0] !== searchParamsMin ||
      debouncedPrice[1] !== searchParamsMax
    ) {
      handleApplyFilters();
    }
  }, [debouncedPrice]); // eslint-disable-line react-hooks/exhaustive-deps

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
          setCategoryParams={setCategoryParams}
          setSubcategoryParams={setSubcategoryParams}
        />
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <EcButton
          className="flex-1 font-bold text-white bg-primary hover:bg-primary/90"
          onClick={() => handleApplyFilters()}
          disabled={!filters}
        >
          Find
        </EcButton>
        <EcButton
          className="flex-1 font-bold bg-gray-100 hover:bg-gray-300 hover:text-black"
          onClick={handleClearAllFilters}
          variant="ghost"
          disabled={!Object.keys(searchParams).length}
        >
          Clear
        </EcButton>
      </div>
    </Box>
  );
};

export default ProductFilter;
