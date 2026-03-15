import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

type OptionNode = {
  label: string;
  value: string | number;
  count?: string | number;
  children?: OptionNode[];
};

// eslint-disable-next-line
type OnSelectChange = (value: string) => void;

type CommonSelectProps = {
  options: OptionNode[];
  value: string;
  onChange: OnSelectChange;
  placeholder?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
};

export default function CommonSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  size,
}: CommonSelectProps) {
  // Recursive rendering of parent + children
  const renderNodes = (nodes: OptionNode[], depth = 1): React.ReactNode =>
    nodes.map((node) => (
      <React.Fragment key={node.value}>
        <SelectItem
          value={String(node.value)}
          // Tailwind can't read dynamic class like pl-${depth * 4}
          // Use inline style or a small helper instead:
          style={{ paddingLeft: depth * 8 }} // 1rem per depth
          className="capitalize cursor-pointer pr-8 [&>span]:left-auto [&>span]:right-2"
        >
          {node.label} {node?.count ? `(${node?.count})` : null}
        </SelectItem>
        {node.children && renderNodes(node.children, depth + 1)}
      </React.Fragment>
    ));

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        disabled={disabled}
        className={cn(
          "w-auto focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer",
          size === "sm" && "h-8 px-2 text-xs",
          size === "lg" && "h-12 px-4 text-base",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{renderNodes(options)}</SelectContent>
    </Select>
  );
}
