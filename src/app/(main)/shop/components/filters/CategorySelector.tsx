import GenericFilterPropsSelector from "@/components/ui/ec/GenericFilterPropsSelector";
import TCategory from "@/types/categories/categories";
import { Dispatch, SetStateAction, useEffect } from "react";

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
  // Initialize selected values from searchParams if internal state is empty (first load)
  useEffect(() => {
    const categoryParam = searchParams["category"];
    let initialSelected: string[] = [];

    if (categoryParam) {
      if (Array.isArray(categoryParam)) {
        initialSelected = categoryParam;
      } else {
        initialSelected = categoryParam.split(",");
      }
    }

    // Only set if we have values and current state is empty to avoid overwriting ongoing user input
    // But since we want URL to be source of truth on load...
    if (initialSelected.length > 0 && selectedCategories.length === 0) {
      setSelectedCategories(initialSelected);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

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
