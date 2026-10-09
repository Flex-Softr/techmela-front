"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import TCategory from "@/types/categories/categories";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CategoryMenuBarProps = {
  categories?: TCategory[];
  onMenuItemClick?: () => void;
};

export default function CategoryMenuBar({
  categories = [],
  onMenuItemClick,
}: CategoryMenuBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    const decodedPathname = decodeURIComponent(pathname);

    if (href === "/" && decodedPathname === "/") return true;
    if (
      href === "/shop" &&
      decodedPathname === "/shop" &&
      !searchParams.toString()
    )
      return true;
    if (href.includes("?")) {
      const [hrefPath, hrefQuery] = href.split("?");
      const [paramKey, paramValue] = hrefQuery.split("=");
      return (
        decodedPathname === hrefPath &&
        searchParams.get(paramKey) === paramValue
      );
    }
    return href !== "/" && decodedPathname === href;
  };

  const menuLinks = [
    { title: "Home", href: "/" },
    { title: "All Products", href: "/shop" },
    { title: "Blog", href: "/blog" },
  ];

  // Recursive component for rendering category dropdowns
  const renderCategoryDropdown = (
    cat: TCategory,
    level: number = 1,
    isRightSide: boolean = false
  ) => {
    const hasSubs = cat.children && cat.children.length > 0;
    const href = `/category/${cat.slug}`;
    const active = isActive(href);

    if (level === 1) {
      // Top level category (on the navbar)
      return (
        <div key={cat._id} className="relative group/nav shrink-0">
          <Link
            href={href}
            className={cn(
              "flex items-center gap-1.5 px-4 pt-2 pb-0.5 text-[14px] font-bold transition-all hover:text-primary rounded-t-md whitespace-nowrap border-b-2",
              active
                ? "text-primary bg-primary/5 border-primary"
                : "text-foreground hover:bg-primary/5 border-transparent"
            )}
            onClick={onMenuItemClick}
          >
            {cat.name}
            {hasSubs && (
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/nav:rotate-180" />
            )}
          </Link>

          {hasSubs && (
            <div className="absolute left-0 top-full pt-0 hidden group-hover/nav:block animate-in fade-in zoom-in-95 duration-200 z-[100]">
              <div className="bg-background border rounded-lg shadow-2xl p-2 min-w-[220px] flex flex-col gap-1 mt-[1px]">
                {cat.children!.map((sub) =>
                  renderCategoryDropdown(sub, level + 1, isRightSide)
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Nested levels (inside a dropdown)
    // Use level-specific group names so hovering level 2 doesn't open level 3+4 simultaneously
    // Static map needed because Tailwind purges dynamically constructed class names
    const groupClasses: Record<number, { group: string; hover: string }> = {
      2: { group: "group/l2", hover: "group-hover/l2:block" },
      3: { group: "group/l3", hover: "group-hover/l3:block" },
      4: { group: "group/l4", hover: "group-hover/l4:block" },
    };
    const { group: groupClass, hover: hoverClass } =
      groupClasses[level] || groupClasses[4];

    return (
      <div key={cat._id} className={cn("relative shrink-0", groupClass)}>
        <Link
          href={href}
          className={cn(
            "flex items-center justify-between px-3 py-2 text-[13px] text-foreground rounded-md hover:bg-primary/5 hover:text-primary transition-colors whitespace-nowrap",
            active && "bg-primary/5 text-primary font-bold"
          )}
          onClick={onMenuItemClick}
        >
          {cat.name}
          {hasSubs && <ChevronRight className="h-4 w-4 ml-4" />}
        </Link>

        {hasSubs && (
          <div
            className={cn(
              "absolute top-0 hidden animate-in fade-in zoom-in-95 duration-200 z-[101]",
              hoverClass,
              isRightSide ? "right-full pr-1" : "left-full pl-1"
            )}
          >
            <div className="bg-background border rounded-lg shadow-2xl p-2 min-w-[200px] flex flex-col gap-1">
              {cat.children!.map((sub) =>
                renderCategoryDropdown(sub, level + 1, isRightSide)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="w-full relative">
      <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-1">
        {menuLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 px-4 pt-2 pb-0.5 text-[14px] font-bold transition-all hover:text-primary rounded-t-md whitespace-nowrap border-b-2",
                active
                  ? "text-primary bg-primary/5 border-primary"
                  : "text-foreground hover:bg-primary/5 border-transparent"
              )}
              onClick={onMenuItemClick}
            >
              {link.title}
            </Link>
          );
        })}

        {categories.map((cat, idx) => {
          const isRightSide = idx >= Math.floor(categories.length / 2);
          return renderCategoryDropdown(cat, 1, isRightSide);
        })}
      </div>
    </nav>
  );
}
