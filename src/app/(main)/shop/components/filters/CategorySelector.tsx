import GenericFilterPropsSelector from "@/components/ui/ec/GenericFilterPropsSelector";
import TCategory from "@/types/categories/categories";
import { Dispatch, SetStateAction } from "react";

const CategorySelector = ({
  categories,
  searchParams,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: TCategory[];
  searchParams: Record<string, string | string[] | undefined>;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) => {
  // Sync is now handled centrally by parent ProductFilter.tsx

  return (
    <GenericFilterPropsSelector
      filterBy="category"
      title="Filter by category"
      selectedValues={selectedCategories}
      setSelectedValues={setSelectedCategories}
      items={categories}
      searchParams={searchParams}
      headerClassName="bg-gray-50 text-gray-900 font-medium border border-gray-200 shadow-sm text-sm"
    />
  );
};

export default CategorySelector;
