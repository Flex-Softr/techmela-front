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
      title="বই বিভাগ"
      selectedValues={selectedCategories}
      setSelectedValues={setSelectedCategories}
      items={categories}
      searchParams={searchParams}
    />
  );
};

export default CategorySelector;
