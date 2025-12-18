"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import type TCategory from "@/types/categories/categories";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuBarProps = {
  categories?: TCategory[];
  isVertical?: boolean;
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
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Controlled open menu state
  const [openMenu, setOpenMenu] = useState<string | undefined>(undefined);

  // Hover tracking for trigger + content
  const hoverRef = useRef<{ trigger: boolean; content: boolean }>({
    trigger: false,
    content: false,
  });

  // Close submenu on route change
  useEffect(() => {
    setOpenMenu(undefined);
  }, [pathname]);

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
    {
      title: "Categories",
      href: "/category",
      subMenus: categories.map(({ name, slug }) => ({
        title: name,
        href: `/shop?category=${slug}`,
      })),
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Hover handlers
  const handleMouseEnterTrigger = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverRef.current.trigger = true;
    setOpenMenu(key);
  };

  const handleMouseLeaveTrigger = () => {
    hoverRef.current.trigger = false;
    closeTimer.current = setTimeout(() => {
      if (!hoverRef.current.trigger && !hoverRef.current.content) {
        setOpenMenu(undefined);
      }
    }, 150);
  };

  const handleMouseEnterContent = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverRef.current.content = true;
    setOpenMenu(key);
  };

  const handleMouseLeaveContent = () => {
    hoverRef.current.content = false;
    closeTimer.current = setTimeout(() => {
      if (!hoverRef.current.trigger && !hoverRef.current.content) {
        setOpenMenu(undefined);
      }
    }, 150);
  };

  return (
    <Menubar
      value={openMenu}
      onValueChange={(val) => setOpenMenu(val ?? undefined)}
      onMouseLeave={handleMouseLeaveTrigger}
      className={clsx(
        "w-full bg-primary text-primary-foreground border-none shadow-none rounded-none",
        isVertical
          ? "flex flex-col items-start gap-4 p-4"
          : "flex justify-center items-center gap-x-8"
      )}
    >
      {menuLinks.map((menu) => {
        const visibility = menu.displayOnSmallScreenOnly
          ? "flex md:hidden"
          : "flex";

        const baseLinkClass = clsx(
          "flex items-center text-sm font-medium transition-all border-b-2 border-transparent pb-1",
          isActive(menu.href) && "border-white",
          !isActive(menu.href) && "hover:border-white/50"
        );

        // ---------- NO SUBMENU ----------
        if (!menu.subMenus) {
          return (
            <MenubarMenu key={menu.href} value={menu.href}>
              <MenubarTrigger
                asChild
                className={`${visibility} px-1.5 cursor-pointer`}
              >
                <Link
                  href={menu.href}
                  className={baseLinkClass}
                  onClick={onMenuItemClick}
                >
                  {menu.icon}
                  {menu.title}
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          );
        }

        // ---------- WITH SUBMENU ----------
        const isOpen = openMenu === menu.title;

        return (
          <MenubarMenu key={menu.title} value={menu.title}>
            <MenubarTrigger
              onMouseEnter={() => handleMouseEnterTrigger(menu.title)}
              onMouseLeave={handleMouseLeaveTrigger}
              className={clsx(
                "flex items-center gap-1 text-sm font-medium cursor-pointer px-1.5",
                "border-b-2 pb-1 transition-all",
                isOpen
                  ? "border-white"
                  : "border-transparent hover:border-white/50",
                visibility
              )}
            >
              {menu.title}
              <ChevronDownIcon
                className={clsx(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </MenubarTrigger>

            <MenubarContent
              onMouseEnter={() => handleMouseEnterContent(menu.title)}
              onMouseLeave={handleMouseLeaveContent}
              align="center"
              sideOffset={6}
              className="min-w-[220px] p-2 rounded-md bg-white shadow-lg border"
            >
              {menu.subMenus.map((sub) => (
                <MenubarItem
                  key={sub.href}
                  className="p-0 focus:bg-transparent"
                >
                  <Link
                    href={sub.href}
                    onClick={() => {
                      setOpenMenu(undefined);
                      onMenuItemClick?.();
                    }}
                    className="block w-full px-3 py-1.5 text-sm rounded-sm transition-colors text-gray-700 hover:bg-black/5"
                  >
                    {sub.title}
                  </Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
