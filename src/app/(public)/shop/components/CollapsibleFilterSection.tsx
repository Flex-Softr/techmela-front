"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type CollapsibleFilterSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
};

const CollapsibleFilterSection = ({
  title,
  children,
  className,
  headerClassName,
}: CollapsibleFilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn("", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group",
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
        <CollapsibleContent className="pt-2 pb-1">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleFilterSection;
