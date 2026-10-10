"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import type TCategory from "@/types/categories/categories";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MenuBarProps = {
  categories?: TCategory[];
  isVertical?: boolean;
  activePath?: string;
  onMenuItemClick?: () => void;
};

type MenuLink = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  displayOnSmallScreenOnly?: boolean;
  subMenus?: MenuLink[];
};

export default function MenuBar({
  categories = [],
  isVertical = false,
  onMenuItemClick,
}: MenuBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const mapCategoryToMenuLink = (cat: TCategory): MenuLink => ({
    title: cat.name,
    href: `/category/${cat.slug}`,
    subMenus:
      cat.children && cat.children.length > 0
        ? cat.children.map(mapCategoryToMenuLink)
        : undefined,
  });

  const categoryItems: MenuLink[] = categories.map(mapCategoryToMenuLink);

  const menuLinks: MenuLink[] = [
    { title: "Home", href: "/" },
    { title: "All Products", href: "/shop" },
  ];

  if (!isVertical && categoryItems.length > 5) {
    menuLinks.push({
      title: "All Categories",
      href: "/shop",
      subMenus: categoryItems,
    });
  } else {
    menuLinks.push(...categoryItems);
  }

  const isActive = (href: string) => {
    const decodedPathname = decodeURIComponent(pathname);

    if (decodedPathname === href) return true;
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

  const renderVerticalMenu = (menu: MenuLink, depth = 0) => {
    if (menu.subMenus && menu.subMenus.length > 0) {
      return (
        <Accordion
          key={menu.title + menu.href}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value={menu.title} className="border-b-0">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className={cn(
                  "flex flex-1 items-center justify-between py-2 font-medium transition-all hover:no-underline text-inherit text-sm hover:text-primary group/trigger",
                  depth > 0 ? "pl-0 pr-2" : "px-4 border-b border-border/50"
                )}
              >
                <span className="flex items-center gap-2">
                  {menu.icon}
                  {menu.title}
                </span>
                <span className="shrink-0 text-muted-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded border border-border/50">
                  <span className="group-data-[state=open]/trigger:hidden">
                    +
                  </span>
                  <span className="hidden group-data-[state=open]/trigger:inline">
                    −
                  </span>
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-1">
              <div
                className={cn(
                  "flex flex-col border-l-2 border-primary/10 ml-4",
                  depth === 0 ? "pl-3" : "pl-2"
                )}
              >
                {menu.subMenus.map((sub) => renderVerticalMenu(sub, depth + 1))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Link
        key={menu.title + menu.href}
        href={menu.href}
        onClick={onMenuItemClick}
        className={cn(
          "flex items-center gap-2 py-1.5 text-sm transition-colors hover:text-primary",
          depth === 0
            ? "font-medium border-b border-border/50 px-4"
            : "text-[13px] opacity-80 hover:opacity-100 pr-2",
          isActive(menu.href) && "font-bold text-primary opacity-100"
        )}
      >
        {menu.icon && (
          <span className="text-muted-foreground">{menu.icon}</span>
        )}
        {menu.title}
      </Link>
    );
  };

  if (isVertical) {
    return (
      <div className="flex flex-col w-full">
        {menuLinks.map((menu) => renderVerticalMenu(menu))}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // HORIZONTAL LAYOUT (Desktop) - Recursive Flyout
  // --------------------------------------------------------------------------
  const renderHorizontalMenuDropdown = (
    menu: MenuLink,
    level: number = 1,
    isRightSide: boolean = false
  ) => {
    const hasSubs = menu.subMenus && menu.subMenus.length > 0;

    if (level === 1) {
      return (
        <div key={menu.title} className="relative group/nav z-50">
          <Link
            href={menu.href}
            className={cn(
              "flex items-center gap-1.5 text-[15px] font-bold transition-colors hover:text-primary py-2.5 cursor-pointer border-b-2 border-transparent",
              isActive(menu.href)
                ? "text-primary border-primary"
                : "text-foreground hover:border-primary/50"
            )}
            onClick={onMenuItemClick}
          >
            {menu.title}
            {hasSubs && (
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/nav:rotate-180" />
            )}
          </Link>

          {hasSubs && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 hidden group-hover/nav:block animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-background border rounded-lg shadow-2xl p-2 w-[240px] flex flex-col gap-1">
                {menu.subMenus!.map((sub) =>
                  renderHorizontalMenuDropdown(sub, level + 1, isRightSide)
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Use level-specific group names to prevent all nested levels opening at once
    // Static map needed because Tailwind purges dynamically constructed class names
    const groupClasses: Record<number, { group: string; hover: string }> = {
      2: { group: "group/l2", hover: "group-hover/l2:block" },
      3: { group: "group/l3", hover: "group-hover/l3:block" },
      4: { group: "group/l4", hover: "group-hover/l4:block" },
    };
    const { group: groupClass, hover: hoverClass } =
      groupClasses[level] || groupClasses[4];

    return (
      <div key={menu.title} className={cn("relative shrink-0", groupClass)}>
        <Link
          href={menu.href}
          className={cn(
            "flex items-center justify-between px-3 py-2 text-[14px] text-foreground rounded-md hover:bg-primary/5 hover:text-primary transition-colors whitespace-nowrap",
            isActive(menu.href) && "bg-primary/5 text-primary font-bold"
          )}
          onClick={onMenuItemClick}
        >
          {menu.title}
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
              {menu.subMenus!.map((sub) =>
                renderHorizontalMenuDropdown(sub, level + 1, isRightSide)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="flex items-center justify-center gap-8">
      {menuLinks.map((menu, idx) => {
        if (menu.displayOnSmallScreenOnly) return null;
        const isRightSide = idx > menuLinks.length / 2;
        return renderHorizontalMenuDropdown(menu, 1, isRightSide);
      })}
    </nav>
  );
}
