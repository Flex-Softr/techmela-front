import { TGenericItem } from "../GenericFilterPropsSelector";
import TCategory from "@/types/categories/categories";
import GenericFilterPropsSelector from "../GenericFilterPropsSelector";
import { useShopFilters } from "../ShopFiltersContext";

const CategorySelector = ({ categories }: { categories: TCategory[] }) => {
  const {
    selectedCategories: contextSelected,
    setSelectedCategories: contextSet,
  } = useShopFilters();

  return (
    <GenericFilterPropsSelector
      title="ক্যাটাগরি"
      items={categories as unknown as TGenericItem[]}
      selectedValues={contextSelected}
      setSelectedValues={contextSet}
    />
  );
};

export default CategorySelector;
