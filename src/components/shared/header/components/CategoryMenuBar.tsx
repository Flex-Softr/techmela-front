"use client";

import { clsx, type ClassValue } from "clsx";
import { ChevronDown } from "lucide-react";
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
    // Decode the pathname because Next.js usePathname() returns URL-encoded string
    // which won't match Bengali slugs directly (e.g. %E0%A6%87... vs ইতিহাস...)
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
    { title: "হোম", href: "/" },
    { title: "সকল বই", href: "/shop" },
    { title: "ব্লগ", href: "/blog" },
    { title: "প্রশ্নোত্তর", href: "/questions" },
    { title: "ফ্রি পিডিএফ", href: "/free-pdfs" },
  ];

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

        {categories.map((cat) => {
          const hasSubs = cat.subcategories && cat.subcategories.length > 0;
          const href = `/category/${cat.slug}`;
          const active = isActive(href);

          return (
            <div key={cat._id} className="relative group shrink-0">
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
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </Link>

              {hasSubs && (
                <div className="absolute left-0 top-full pt-0 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200 z-[100]">
                  <div className="bg-white border rounded-lg shadow-2xl p-2 min-w-[220px] flex flex-col gap-1 mt-[1px]">
                    {cat.subcategories?.map((sub) => {
                      const subHref = `/category/${sub.slug}`;
                      const subActive = isActive(subHref);

                      return (
                        <Link
                          key={sub.slug}
                          href={subHref}
                          className={cn(
                            "block px-3 py-2 text-[13px] text-gray-700 rounded-md hover:bg-primary/5 hover:text-primary transition-colors whitespace-nowrap",
                            subActive && "bg-primary/5 text-primary font-bold"
                          )}
                          onClick={onMenuItemClick}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
