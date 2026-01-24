"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import BoxHeading from "./BoxHeading";

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
    <div className={cn("py-2", className)}>
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
        <CollapsibleContent className="space-y-2 ml-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleFilterSection;
