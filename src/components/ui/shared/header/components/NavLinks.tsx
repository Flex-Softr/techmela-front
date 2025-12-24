// NavLinks.tsx
"use client"; // This is still a client component to manage the state for the sidebar

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import TCategory from "@/types/categories/categories";
import { X } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname to get the current pathname
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import MenuBar from "../menuBar/MenuBar";

const NavLinks = ({ categories }: { categories?: TCategory[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          asChild
          className="my-auto size-10 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Button variant={"outline"}>
            <FaBars />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[540px] overflow-auto"
        >
          <SheetHeader className="flex items-end p-2">
            <SheetClose asChild className="size-8 rounded-full">
              <Button>
                <X />
              </Button>
            </SheetClose>
          </SheetHeader>
          <SheetDescription>
            <MenuBar
              isVertical
              categories={categories}
              activePath={pathname}
              onMenuItemClick={handleMenuItemClick}
            />
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinks;
