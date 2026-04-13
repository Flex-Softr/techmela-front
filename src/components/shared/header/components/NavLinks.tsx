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
import { MdCall } from "react-icons/md";
import { FaWhatsapp, FaBars } from "react-icons/fa";
import MenuBar from "./MenuBar";
import logo from "../../../../../public/logo/logo.png";

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
                  alt="Siddikiya Prokashoni Logo"
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
          <div className="flex-1 overflow-y-auto">
            <MenuBar
              isVertical
              categories={categories}
              activePath={pathname}
              onMenuItemClick={handleMenuItemClick}
            />
          </div>

          <div className="p-4 bg-gray-50 border-t mt-auto">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              যোগাযোগ করুন
            </p>
            <div className="space-y-3">
              <a
                href="tel:+8801602431167"
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-primary transition-colors"
              >
                <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                  <MdCall className="size-4" />
                </div>
                <span>+8801602-431167</span>
              </a>
              <a
                href="https://wa.me/8801602431167"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-primary transition-colors"
              >
                <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600">
                  <FaWhatsapp className="size-5" />
                </div>
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinks;
