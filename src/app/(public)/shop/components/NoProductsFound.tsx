"use client";
import { Button } from "@/components/ui/button";
import { PackageX, RotateCcw } from "lucide-react";
import { useShopFilters } from "./ShopFiltersContext";

import { usePathname } from "next/navigation";

const NoProductsFound = () => {
  const { clearAllFilters } = useShopFilters();
  const pathname = usePathname();
  const isCategoryPage = pathname.startsWith("/category/");

  const handleClearFilters = () => {
    clearAllFilters();
  };

  const title = isCategoryPage
    ? "এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি"
    : "কোনো পণ্য খুঁজে পাওয়া যায়নি";

  const description = isCategoryPage
    ? "দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই। অনুগ্রহ করে অন্যান্য ক্যাটাগরি ঘুরে দেখুন।"
    : "দুঃখিত, আপনার নির্বাচিত ফিল্টারের সাথে কোনো পণ্য মেলেনি। অন্য কোনো ক্যাটাগরি বা মূল্যের সীমা পরিবর্তন করে চেষ্টা করুন।";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-background rounded-3xl border border-border/50">
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-125 blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="relative bg-background p-5 rounded-2xl border border-primary/10 group-hover:rotate-0 transition-transform duration-300">
          <PackageX className="w-12 h-12 text-primary/40" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 font-secondary">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {!isCategoryPage && (
        <Button
          onClick={handleClearFilters}
          className="group px-6 py-5 rounded-xl font-bold gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
          <span>সব ফিল্টার মুছুন</span>
        </Button>
      )}
    </div>
  );
};

export default NoProductsFound;
