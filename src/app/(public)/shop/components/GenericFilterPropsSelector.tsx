import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const GenericFilterPropsSelector = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
  headerClassName,
}: {
  filterBy?: string;
  title: string;
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  items: TCategory[];
  searchParams?: Record<string, string | string[] | undefined>;
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
      if (category && category.subcategories?.length) {
        const childSlugs = getAllChildIds(category);
        updated = Array.from(new Set([...updated, ...childSlugs]));
      }
    } else {
      updated = updated.filter((s) => s !== slug);
      if (category && category.subcategories?.length) {
        const childSlugs = getAllChildIds(category);
        updated = updated.filter((id) => !childSlugs.includes(id));
      }
    }

    setSelectedValues(updated);
  };

  const renderCategories = (categories: TCategory[], level = 0) => {
    return (
      <div className={cn("flex flex-col gap-0.5", level > 0 && "ml-5 mt-0.5")}>
        {categories.map((cat) => {
          const isChecked = selectedValues.includes(cat.slug);

          return (
            <div key={cat.slug} className="flex flex-col">
              <label
                className={cn(
                  "flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors group",
                  "hover:bg-primary/5",
                  isChecked && "bg-primary/5"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    toggle(cat.slug, Boolean(checked), cat)
                  }
                  className="shrink-0"
                />
                <span
                  className={cn(
                    "text-sm leading-snug transition-colors",
                    level === 0
                      ? "font-medium"
                      : "font-normal text-muted-foreground",
                    isChecked && "text-primary font-semibold"
                  )}
                >
                  {cat.name}
                  <span className="ml-1 text-[10px] text-muted-foreground font-normal">
                    ({cat.productCount || 0})
                  </span>
                </span>
              </label>

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
    <div className="">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors",
              "hover:bg-primary/5 text-left",
              headerClassName
            )}
          >
            <span className="text-sm font-semibold text-foreground">
              {title}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 pb-1">
          {renderCategories(items)}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GenericFilterPropsSelector;
