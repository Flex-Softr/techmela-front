import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export type TGenericItem = {
  slug: string;
  name: string;
  productCount?: number;
  subcategories?: TGenericItem[];
  [key: string]: unknown; // Allow any extra fields (e.g. isActive, _id)
};

const GenericFilterPropsSelector = ({
  title,
  selectedValues,
  setSelectedValues,
  items,
  headerClassName,
}: {
  title: string;
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  items: TGenericItem[];
  headerClassName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  /** Helper to collect all nested child slugs recursively */
  const getAllChildSlugs = (item: TGenericItem): string[] => {
    const slugs: string[] = [];
    if (item.subcategories?.length) {
      for (const child of item.subcategories) {
        slugs.push(child.slug, ...getAllChildSlugs(child));
      }
    }
    return slugs;
  };

  /** Toggle single item slug */
  const toggle = (slug: string, checked: boolean, item?: TGenericItem) => {
    let updated = [...selectedValues];

    if (checked) {
      updated.push(slug);
      if (item && item.subcategories?.length) {
        const childSlugs = getAllChildSlugs(item);
        updated = Array.from(new Set([...updated, ...childSlugs]));
      }
    } else {
      updated = updated.filter((s) => s !== slug);
      if (item && item.subcategories?.length) {
        const childSlugs = getAllChildSlugs(item);
        updated = updated.filter((id) => !childSlugs.includes(id));
      }
    }

    setSelectedValues(updated);
  };

  const renderItems = (items: TGenericItem[], level = 0) => {
    return (
      <div className={cn("flex flex-col gap-0.5", level > 0 && "ml-5 mt-0.5")}>
        {items.map((item) => {
          const isChecked = selectedValues.includes(item.slug);

          return (
            <div key={item.slug} className="flex flex-col">
              <label
                className={cn(
                  "flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors group",
                  "hover:bg-primary/5",
                  isChecked && "bg-primary/5"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) =>
                    toggle(item.slug, Boolean(checked), item)
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
                  {item.name}
                  {(item.productCount !== undefined) && (
                    <span className="ml-1 text-[10px] text-muted-foreground font-normal">
                      ({item.productCount})
                    </span>
                  )}
                </span>
              </label>

              {item.subcategories &&
                item.subcategories.length > 0 &&
                renderItems(item.subcategories, level + 1)}
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
          {renderItems(items)}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GenericFilterPropsSelector;
