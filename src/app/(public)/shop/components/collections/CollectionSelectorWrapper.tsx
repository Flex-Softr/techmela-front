"use client";
import GenericFilterPropsSelector, { TGenericItem } from "../GenericFilterPropsSelector";
import TCollection from "@/types/collections/collections";
import { useShopFilters } from "../ShopFiltersContext";

const CollectionSelectorWrapper = ({ collections }: { collections: TCollection[] }) => {
  const { selectedCollections, setSelectedCollections } = useShopFilters();

  return (
    <GenericFilterPropsSelector
      title="কালেকশন"
      items={collections as unknown as TGenericItem[]}
      selectedValues={selectedCollections}
      setSelectedValues={setSelectedCollections}
    />
  );
};

export default CollectionSelectorWrapper;
