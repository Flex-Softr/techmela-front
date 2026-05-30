"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type TCategory from "@/types/categories/categories";

// Utility for class merging hiding inline if not imported
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MenuBarProps = {
  categories?: TCategory[];
  isVertical?: boolean;
  activePath?: string; // Accepted for compatibility with NavLinks usage
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

  const menuLinks: MenuLink[] = [
    { title: "হোম", href: "/" },
    { title: "সকল বই", href: "/shop" },
    { title: "ব্লগ", href: "/blog" },
    { title: "প্রশ্নোত্তর", href: "/questions" },
    {
      title: "অর্ডার ট্র্যাক",
      href: "/track-your-order",
      displayOnSmallScreenOnly: true,
    },
  ];

  const categoryItems: MenuLink[] = categories.map((cat) => ({
    title: cat.name,
    href: `/category/${cat.slug}`,
    subMenus: (cat.subcategories || []).map((sub) => ({
      title: sub.name,
      href: `/category/${sub.slug}`,
    })),
  }));

  // Consolidate categories if there are many
  if (!isVertical && categoryItems.length > 5) {
    menuLinks.push({
      title: "সকল বিভাগ",
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

  // --------------------------------------------------------------------------
  // VERTICAL LAYOUT (Mobile / Sidebar)
  // --------------------------------------------------------------------------
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
            <AccordionTrigger
              className={cn(
                "py-2.5 font-medium hover:no-underline text-inherit transition-colors text-sm hover:text-primary",
                depth > 0 ? "pl-0" : "px-4 border-b border-border/50"
              )}
            >
              <span className="flex items-center gap-2">
                {menu.icon}
                {menu.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={cn(
                  "flex flex-col gap-1 border-l-2 border-primary/10 ml-4 my-1",
                  depth === 0 ? "pl-4" : "pl-3"
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
          "flex items-center gap-2 py-2.5 text-sm transition-colors hover:text-primary",
          depth === 0
            ? "font-medium border-b border-border/50 px-4"
            : "text-[14px] py-2 opacity-80 hover:opacity-100",
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
  // HORIZONTAL LAYOUT (Desktop)
  // --------------------------------------------------------------------------
  return (
    <nav className="flex items-center justify-center gap-8">
      {menuLinks.map((menu) => {
        if (menu.displayOnSmallScreenOnly) return null;

        const hasSubs = menu.subMenus && menu.subMenus.length > 0;
        const isMega = menu.title === "সকল বিভাগ" && hasSubs;

        return (
          <div key={menu.title} className="relative group z-50">
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
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </Link>

            {hasSubs && (
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 top-full pt-1 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200",
                  isMega
                    ? "w-[90vw] md:w-[700px] lg:w-[900px] xl:w-[1000px]"
                    : "w-[240px]"
                )}
              >
                <div
                  className={cn(
                    "bg-white border rounded-lg shadow-2xl p-4",
                    isMega
                      ? "grid grid-cols-2 md:grid-cols-4 gap-6"
                      : "flex flex-col gap-1"
                  )}
                >
                  {menu.subMenus?.map((sub) => {
                    const hasInnerSubs =
                      sub.subMenus && sub.subMenus.length > 0;

                    if (isMega) {
                      return (
                        <div key={sub.title} className="flex flex-col gap-2">
                          <Link
                            href={sub.href}
                            className="text-[14px] font-bold text-primary hover:underline"
                            onClick={onMenuItemClick}
                          >
                            {sub.title}
                          </Link>
                          {hasInnerSubs && (
                            <div className="flex flex-col gap-1 border-l border-gray-100 pl-3 ml-1">
                              {sub.subMenus?.map((inner) => (
                                <Link
                                  key={inner.title}
                                  href={inner.href}
                                  className="text-[13px] text-primary hover:text-primary hover:underline transition-colors"
                                  onClick={onMenuItemClick}
                                >
                                  {inner.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className={cn(
                          "block px-3 py-2 text-[14px] text-primary rounded-md hover:bg-primary/5 hover:text-primary transition-colors",
                          isActive(sub.href) &&
                            "bg-primary/5 text-primary font-bold"
                        )}
                        onClick={onMenuItemClick}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
