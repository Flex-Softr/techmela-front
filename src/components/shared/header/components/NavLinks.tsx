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
import { Star, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to get the current pathname
import { useState } from "react";
import { FaBars, FaWhatsapp } from "react-icons/fa";
import { MdCall, MdDeliveryDining } from "react-icons/md";
import { SITE } from "@/const/site.const";
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
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5">
              Contact & Quick Links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {/* 1. WhatsApp */}
              <a
                href={`https://wa.me/${SITE.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border/70 hover:border-primary/40 hover:bg-accent/40 transition-all duration-200 group min-w-0"
              >
                <div className="size-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                  <FaWhatsapp className="size-3.5" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  WhatsApp
                </span>
              </a>

              {/* 2. Contact number */}
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border/70 hover:border-primary/40 hover:bg-accent/40 transition-all duration-200 group min-w-0"
              >
                <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <MdCall className="size-3.5" />
                </div>
                <span className="text-[11px] font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {SITE.phoneDisplay || SITE.phone}
                </span>
              </a>

              {/* 3. Track order */}
              <Link
                href="/track-your-order"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border/70 hover:border-primary/40 hover:bg-accent/40 transition-all duration-200 group min-w-0"
              >
                <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <MdDeliveryDining className="size-4" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  Track Order
                </span>
              </Link>

              {/* 4. Blog (renamed to Reviews) */}
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border/70 hover:border-primary/40 hover:bg-accent/40 transition-all duration-200 group min-w-0"
              >
                <div className="size-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  Reviews
                </span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinks;
