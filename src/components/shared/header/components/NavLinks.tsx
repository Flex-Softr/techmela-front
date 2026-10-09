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
import { UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to get the current pathname
import { useState } from "react";
import { FaBars, FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import logo from "../../../../../public/logo/techmela-lightlogo.png";
import MenuBar from "./MenuBar";

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
          <Button
            variant={"outline"}
            aria-label="Open menu"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <FaBars />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[85%] sm:w-[350px] p-0 flex flex-col overflow-hidden"
        >
          <SheetHeader className="flex flex-row justify-between items-center px-4 h-16 border-b shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <div className="bg-[rgba(9,33,67,1)] rounded-lg flex items-center justify-center px-2.5 py-1.5 shadow-sm">
                <Image
                  src={logo}
                  alt="TechMela Logo"
                  height={48}
                  width={130}
                  className="h-9 w-auto"
                  sizes="130px"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center gap-2.5">
              <Link
                href="/my-account"
                onClick={() => setIsOpen(false)}
                className="size-10 rounded-full border border-primary/20 text-primary flex items-center justify-center hover:bg-primary/5 transition-all duration-300"
                aria-label="My Account"
              >
                <UserRound className="size-5" />
              </Link>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full text-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <MenuBar
              isVertical
              categories={categories}
              activePath={pathname}
              onMenuItemClick={handleMenuItemClick}
            />
          </div>

          <div className="p-4 bg-muted border-t mt-auto">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              Contact Us
            </p>
            <div className="space-y-3">
              <a
                href="tel:+8801772065894"
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-primary transition-colors"
              >
                <div className="size-8 rounded-full bg-background flex items-center justify-center shadow-sm text-primary">
                  <MdCall className="size-4" />
                </div>
                <span>+8801772065894</span>
              </a>
              <a
                href="https://wa.me/8801772065894"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-primary transition-colors"
              >
                <div className="size-8 rounded-full bg-background flex items-center justify-center shadow-sm text-success">
                  <FaWhatsapp className="size-5" />
                </div>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinks;
