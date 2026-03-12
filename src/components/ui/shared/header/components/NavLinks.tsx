"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import TCategory from "@/types/categories/categories";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to get the current pathname
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import MenuBar from "../menuBar/MenuBar";
import logo from "../../../../../../public/images/logo/Logo.png";

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
          className="w-[85%] sm:w-[350px] p-0 flex flex-col overflow-hidden"
        >
          <SheetHeader className="flex flex-row justify-between items-center px-4 py-3 border-b shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="bg-primary/5 rounded flex items-center justify-center p-1">
                <Image
                  src={logo}
                  alt="Company logo"
                  height={40}
                  width={100}
                  className="h-8 w-auto rounded-sm"
                  priority
                />
              </div>
            </Link>
            <SheetClose asChild>
              <Button
                size="icon"
                className="size-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-sm"
              >
                <X className="size-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto pb-6">
            <MenuBar
              isVertical
              categories={categories}
              activePath={pathname}
              onMenuItemClick={handleMenuItemClick}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinks;
