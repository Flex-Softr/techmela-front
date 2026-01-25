"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";
import { FaUserCircle } from "react-icons/fa";
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
  subMenus?: { title: string; href: string }[];
};

export default function MenuBar({
  categories = [],
  isVertical = false,
  onMenuItemClick,
}: MenuBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const menuLinks: MenuLink[] = [
    {
      title: "My Account",
      href: "/my-account",
      displayOnSmallScreenOnly: true,
      icon: <FaUserCircle className="mr-2 text-xl" />,
    },
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    {
      title: "Track Your Order",
      href: "/track-your-order",
      displayOnSmallScreenOnly: true,
    },
    ...categories.map(({ name, slug, subcategories }) => {
      if (subcategories.length > 0) {
        return {
          title: name,
          href: `/shop?category=${slug}`,
          subMenus: subcategories.map(({ name, slug }) => ({
            title: name,
            href: `/shop?category=${slug}`,
          })),
        };
      }
      return {
        title: name,
        href: `/shop?category=${slug}`,
      };
    }),
  ];

  const isActive = (href: string) => {
    // For exact path match (e.g., "/", "/my-account")
    if (pathname === href) return true;

    // For paths with query parameters (e.g., "/shop?category=footwear")
    if (href.includes("?")) {
      const [hrefPath, hrefQuery] = href.split("?");
      const [paramKey, paramValue] = hrefQuery.split("=");

      return pathname === hrefPath && searchParams.get(paramKey) === paramValue;
    }

    // For base paths (e.g., "/shop" matches "/shop/anything")
    return href !== "/" && pathname.startsWith(href);
  };

  // --------------------------------------------------------------------------
  // VERTICAL LAYOUT (Mobile / Sidebar)
  // --------------------------------------------------------------------------
  if (isVertical) {
    return (
      <div className="flex flex-col w-full">
        {menuLinks.map((menu) => {
          // In vertical mode, we show everything, including "displayOnSmallScreenOnly"

          // Submenus -> Accordion
          if (menu.subMenus && menu.subMenus.length > 0) {
            return (
              <Accordion
                key={menu.title}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={menu.title} className="border-b-0">
                  <AccordionTrigger className="py-2 font-medium hover:no-underline text-inherit transition-colors pl-3 text-sm hover:text-primary">
                    {menu.icon} {menu.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-6 border-l ml-3 border-white/20">
                      {menu.subMenus.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onMenuItemClick}
                          className={cn(
                            "block text-sm text-inherit transition-colors hover:text-primary opacity-80 hover:opacity-100",
                            isActive(sub.href) && "font-bold opacity-100"
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }

          // Standard Links
          return (
            <Link
              key={menu.title}
              href={menu.href}
              onClick={onMenuItemClick}
              className={cn(
                "flex items-center gap-2 py-3 text-sm font-medium transition-colors border-b border-border last:border-0 pl-3 hover:text-primary",
                isActive(menu.href) ? "font-bold opacity-100" : "opacity-90"
              )}
            >
              {menu.icon}
              {menu.title}
            </Link>
          );
        })}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // HORIZONTAL LAYOUT (Desktop / BottomHeader)
  // --------------------------------------------------------------------------
  return (
    <nav className="flex items-center justify-center gap-6">
      {menuLinks.map((menu) => {
        // Skip mobile-only items in desktop view
        if (menu.displayOnSmallScreenOnly) return null;

        // Submenus -> Custom Dropdown
        if (menu.subMenus && menu.subMenus.length > 0) {
          return (
            <div key={menu.title} className="relative group z-50">
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary py-2 cursor-pointer",
                  isActive(menu.href)
                    ? "text-primary font-bold"
                    : "text-foreground"
                )}
                onClick={() => {
                  if (onMenuItemClick) onMenuItemClick();
                }}
              >
                {menu.title}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </span>

              {/* Dropdown Content */}
              <div className="absolute left-0 top-full pt-2 w-[220px] hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-white border rounded-md shadow-lg p-2 flex flex-col gap-1">
                  {menu.subMenus.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onMenuItemClick}
                      className={cn(
                        "block px-3 py-2 text-sm text-gray-700 rounded-sm hover:bg-gray-100 hover:text-primary transition-colors",
                        isActive(sub.href) &&
                          "bg-gray-50 text-primary font-medium"
                      )}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        // Standard Links
        return (
          <Link
            key={menu.title}
            href={menu.href}
            onClick={onMenuItemClick}
            className={cn(
              "text-sm font-medium transition-all hover:text-primary py-2 border-b-2 border-transparent",
              isActive(menu.href)
                ? "text-primary border-primary font-bold"
                : "text-foreground hover:border-primary/50"
            )}
          >
            {menu.icon}
            {menu.title}
          </Link>
        );
      })}
    </nav>
  );
}
