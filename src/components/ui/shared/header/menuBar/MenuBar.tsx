// MenuBar.tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import TCategory from "@/types/categories/categories";
import Link from "next/link";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

const MenuBar = ({
  categories,
  isVertical = false,
  onMenuItemClick,
  activePath,
}: {
  categories?: TCategory[];
  isVertical?: boolean;
  onMenuItemClick?: () => void;
  activePath?: string;
}) => {
  const menuLinks = [
    {
      title: "My-Account",
      href: "/my-account",
      displayOnSmallScreenOnly: true,
      icon: <FaUserCircle className="mr-2 text-2xl" />,
    },
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Shop",
      href: "/shop",
    },
    {
      title: "Track your order",
      href: "/track-your-order",
      displayOnSmallScreenOnly: true,
    },
    {
      title: "Categories",
      href: "/category",
      subMenus: categories?.map(({ name, slug }) => ({
        title: name,
        href: `/shop?category=${slug}`,
      })),
    },
  ];

  return (
    <div className="w-full">
      <Menubar
        className={`${
          isVertical
            ? "flex flex-col items-start space-y-2 h-auto p-4"
            : "flex flex-row justify-center items-center h-auto p-0"
        } bg-primary text-primary-foreground border-none shadow-none rounded-none`}
      >
        {menuLinks.map((menuItem) => {
          const visibilityClass = menuItem.displayOnSmallScreenOnly
            ? "flex md:hidden"
            : "flex";

          const isActive = activePath === menuItem.href;
          // Base styles for links
          const linkBaseClass = `flex items-center text-base font-medium transition-colors duration-200 !text-primary-foreground ${
            isActive ? "text-red-500 font-bold" : ""
          }`;

          if (!menuItem.subMenus?.length) {
            return (
              <MenubarMenu key={menuItem.href}>
                <MenubarTrigger
                  asChild
                  className={`cursor-pointer bg-transparent data-[state=open]:bg-transparent focus:bg-transparent ${visibilityClass} ${isVertical ? "w-full justify-start px-0" : ""}`}
                >
                  <Link
                    href={menuItem.href}
                    className={linkBaseClass}
                    onClick={onMenuItemClick}
                  >
                    {menuItem.icon && menuItem.icon}
                    {menuItem.title}
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
            );
          } else {
            return (
              <MenubarMenu key={menuItem.href}>
                <MenubarTrigger
                  className={`
                      cursor-pointer bg-transparent data-[state=open]:bg-transparent focus:bg-transparent text-base font-medium transition-colors duration-200 hover:text-secondary whitespace-nowrap
                       ${
                         isActive
                           ? "text-red-500 font-bold"
                           : "text-primary-foreground"
                       } ${visibilityClass} ${isVertical ? "w-full justify-between px-0" : ""}`}
                >
                  {menuItem.title}{" "}
                  <FaCaretDown
                    className={`transition-transform duration-200 ${isVertical ? "" : "ml-1"}`}
                  />
                </MenubarTrigger>

                <MenubarContent
                  className={`bg-white border text-primary rounded-md shadow-lg p-2 min-w-[200px] z-50 ${isVertical ? "relative left-0 top-0 border-none shadow-none bg-transparent text-primary-foreground pl-4" : "mt-2"}`}
                  align={isVertical ? "start" : "center"}
                  sideOffset={isVertical ? 0 : 5}
                >
                  {menuItem.subMenus?.map((subMenu) => {
                    const isSubMenuActive = activePath === subMenu.href;
                    return (
                      <MenubarItem
                        key={subMenu.href}
                        className="focus:bg-transparent focus:text-secondary cursor-pointer"
                      >
                        <Link
                          href={subMenu.href}
                          className={`block w-full text-sm font-medium transition-colors hover:text-secondary ${
                            isSubMenuActive
                              ? "text-red-500 font-bold"
                              : isVertical
                                ? "text-primary-foreground"
                                : "text-gray-700"
                          }`}
                          onClick={onMenuItemClick}
                        >
                          {subMenu.title}
                        </Link>
                      </MenubarItem>
                    );
                  })}
                </MenubarContent>
              </MenubarMenu>
            );
          }
        })}
      </Menubar>
    </div>
  );
};

export default MenuBar;
