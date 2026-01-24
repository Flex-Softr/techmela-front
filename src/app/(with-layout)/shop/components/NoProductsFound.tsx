"use client";

import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

const NoProductsFound = () => {
  const router = useRouter();

  const handleClearFilters = () => {
    router.push("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-8">
        We couldn&apos;t find any products matching your current filters. Try
        adjusting your price range or clearing all filters.
      </p>
      <Button
        onClick={handleClearFilters}
        variant="outline"
        className="font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default NoProductsFound;
