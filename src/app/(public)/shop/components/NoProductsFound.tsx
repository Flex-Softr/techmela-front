"use client";

import { Button } from "@/components/ui/button";
import { BookX, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

const NoProductsFound = () => {
  const router = useRouter();

  const handleClearFilters = () => {
    router.push("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-gradient-to-b from-gray-50/80 to-transparent rounded-3xl border border-dashed border-gray-200/60 shadow-inner">
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="relative bg-white p-6 rounded-2xl shadow-xl transform rotate-1 border border-primary/5 group-hover:rotate-0 transition-transform duration-300">
          <BookX className="w-16 h-16 text-primary/40" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-secondary">
        কোনো বই পাওয়া যায়নি
      </h3>

      <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed">
        দুঃখিত, আপনার পছন্দের ফিল্টার অনুযায়ী কোনো বই আমাদের সংগ্রহে পাওয়া
        যায়নি। ভিন্ন ক্যাটাগরি বা প্রাইস রেঞ্জ চেষ্টা করে দেখুন।
      </p>

      <Button
        onClick={handleClearFilters}
        className="group px-8 py-6 rounded-xl font-bold gap-3 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-300"
      >
        <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
        <span>সব ফিল্টার মুছে ফেলুন</span>
      </Button>
    </div>
  );
};

export default NoProductsFound;
