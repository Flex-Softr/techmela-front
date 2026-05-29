"use client";
import { Button } from "@/components/ui/button";
import { BookX, RotateCcw } from "lucide-react";
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
    ? "এই ক্যাটাগরিতে কোনো বই নেই"
    : "কোনো বই পাওয়া যায়নি";

  const description = isCategoryPage
    ? "দুঃখিত, বর্তমানে এই ক্যাটাগরিতে কোনো বই আমাদের সংগ্রহে নেই। অন্যান্য ক্যাটাগরি ঘুরে দেখতে পারেন।"
    : "দুঃখিত, আপনার পছন্দের ফিল্টার অনুযায়ী কোনো বই আমাদের সংগ্রহে পাওয়া যায়নি। ভিন্ন ক্যাটাগরি বা প্রাইস রেঞ্জ চেষ্টা করে দেখুন।";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-border/50">
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-125 blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="relative bg-white p-5 rounded-2xl border border-primary/10 group-hover:rotate-0 transition-transform duration-300">
          <BookX className="w-12 h-12 text-primary/40" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 font-secondary">
        {title}
      </h3>

      <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {!isCategoryPage && (
        <Button
          onClick={handleClearFilters}
          className="group px-6 py-5 rounded-xl font-bold gap-2.5 bg-primary hover:bg-primary/90 text-white active:scale-95 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
          <span>সব ফিল্টার মুছে ফেলুন</span>
        </Button>
      )}
    </div>
  );
};

export default NoProductsFound;
