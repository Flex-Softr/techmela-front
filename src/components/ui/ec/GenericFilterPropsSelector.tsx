import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import BoxHeading from "./BoxHeading";

const GenericFilterPropsSelector = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
  // searchParams,
  // subcategories,
  // setSubcategories,
  headerClassName,
}: {
  filterBy?: string;
  title: string;
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  items: TCategory[];
  searchParams?: Record<string, string | string[] | undefined>;
  // subcategories: Record<string, string[]>;
  // setSubcategories: Dispatch<SetStateAction<Record<string, string[]>>>;
  headerClassName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  /** Helper to collect all nested child IDs recursively */
  const getAllChildIds = (category: TCategory): string[] => {
    const ids: string[] = [];
    if (category.subcategories?.length) {
      for (const child of category.subcategories) {
        ids.push(child.slug, ...getAllChildIds(child as unknown as TCategory));
      }
    }
    return ids;
  };

  /** Toggle single category id */
  const toggle = (slug: string, checked: boolean, category?: TCategory) => {
    let updated = [...selectedValues];

    if (checked) {
      updated.push(slug);
      // If selecting a parent, auto-select its children
      if (category && category.subcategories?.length) {
        const childSlugs = getAllChildIds(category);
        updated = Array.from(new Set([...updated, ...childSlugs]));
      }
    } else {
      updated = updated.filter((s) => s !== slug);
      // If unchecking a parent, also uncheck all children
      if (category && category.subcategories?.length) {
        const childSlugs = getAllChildIds(category);
        updated = updated.filter((id) => !childSlugs.includes(id));
      }
    }

    setSelectedValues(updated);
  };

  /**
   * Recursive render of category tree
   */
  const renderCategories = (categories: TCategory[], level = 0) => {
    return (
      <div className={cn("flex flex-col gap-2", level > 0 && "ml-6")}>
        {categories.map((cat) => {
          const isChecked = selectedValues.includes(cat.slug);

          return (
            <div key={cat.slug} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    toggle(cat.slug, Boolean(checked), cat)
                  }
                />
                <span className={cn("text-sm", level === 0 && "font-medium")}>
                  {cat.name} ({cat.productCount || 0})
                </span>
              </div>

              {cat.subcategories &&
                cat.subcategories.length > 0 &&
                renderCategories(
                  cat.subcategories as unknown as TCategory[],
                  level + 1
                )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-2">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div
          className={cn(
            "flex items-center justify-between bg-muted text-muted-foreground py-2 px-3 mx-2 rounded-md",
            headerClassName
          )}
        >
          <BoxHeading className="mb-0">{title}</BoxHeading>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0 hover:text-[#E6D0C4]"
            >
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="ml-4 space-y-2">
          {renderCategories(items)}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GenericFilterPropsSelector;
