"use client";
import GenericFilterPropsSelector, {
  TGenericItem,
} from "../GenericFilterPropsSelector";
import TBrand from "@/types/brands/brands";
import { useShopFilters } from "../ShopFiltersContext";

const BrandSelectorWrapper = ({ brands }: { brands: TBrand[] }) => {
  const { selectedBrands, setSelectedBrands } = useShopFilters();

  return (
    <GenericFilterPropsSelector
      title="Brand"
      items={brands as unknown as TGenericItem[]}
      selectedValues={selectedBrands}
      setSelectedValues={setSelectedBrands}
    />
  );
};

export default BrandSelectorWrapper;
