"use client";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import useTypingPlaceholder from "@/hooks/useTypingPlaceholder";
import { getImageSrc } from "@/lib/utils";
import { useFindSearchProductQuery } from "@/redux/features/searchProduct/searchProuctApi";
import { TProduct } from "@/types/products/product";
import { TVariableProduct } from "@/types/products/variableProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ApiResponse } from "./searchProductType/SearchProductType";

/* -------------------- type guards -------------------- */
const isVariableProduct = (
  product: TProduct | TVariableProduct
): product is TVariableProduct => product.type === "variable";

const isApiResponse = (response: unknown): response is ApiResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    "data" in response
  );
};

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 400);

  const [showSuggestions, setShowSuggestions] = useState(true);

  const placeholders = ["পছন্দের বই খুঁজুন...", "বইয়ের নাম দিয়ে সার্চ করুন..."];

  const typingPlaceholder = useTypingPlaceholder(placeholders);

  const { data, isLoading, isError } = useFindSearchProductQuery<ApiResponse>(
    debouncedSearchValue,
    {
      skip: !debouncedSearchValue.trim(),
    }
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop?search=${encodeURIComponent(searchValue)}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setShowSuggestions(false);
  };

  const products: (TProduct | TVariableProduct)[] = isApiResponse(data)
    ? data.data
    : [];

  return (
    <form onSubmit={handleSearchSubmit} className="relative">
      <div className="flex items-center w-full overflow-hidden">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={typingPlaceholder}
          className="w-full h-[44px] px-4 text-sm outline-none border border-primary rounded-full pr-16"
        />

        {searchValue && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-12 text-gray-400 hover:text-primary transition-colors"
          >
            <FaTimes />
          </button>
        )}

        <Button
          type="submit"
          className="-ml-10 h-9 w-9 rounded-full flex items-center justify-center bg-primary text-white"
        >
          <FaSearch className="text-sm" />
        </Button>
      </div>

      {showSuggestions && debouncedSearchValue.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-[400px] overflow-y-auto">
          {isLoading && <p className="p-3 text-sm">Loading...</p>}

          {!isLoading && !isError && products.length > 0
            ? products.map((product) => {
                const isVariable = isVariableProduct(product);

                const regularPrice = isVariable
                  ? product.minRegularPrice
                  : product.regularPrice;

                const salePrice = isVariable
                  ? product.minSalePrice || null
                  : product.salePrice || null;

                return (
                  <div
                    key={product._id}
                    className="flex items-center gap-2 p-2 border-b last:border-0 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    <Image
                      width={55}
                      height={55}
                      src={getImageSrc(product.thumbnail.src)}
                      alt={product.thumbnail.alt || ""}
                      className="rounded"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-1">
                        {product.title}
                      </p>

                      <div className="text-sm">
                        {salePrice ? (
                          <>
                            {!isVariable && (
                              <span className="text-xs text-gray-500 line-through mr-1">
                                &#2547;{regularPrice}
                              </span>
                            )}
                            <span className="font-bold">
                              &#2547;{salePrice}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">
                            &#2547;{regularPrice}
                          </span>
                        )}

                        {isVariable && (
                          <span className="ml-1 font-bold">
                            – &#2547;{product.maxRegularPrice}
                          </span>
                        )}
                      </div>

                      {isVariable && (
                        <p className="text-[11px] text-blue-600">
                          Multiple options
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            : !isLoading && (
                <p className="p-3 text-sm text-gray-500">No results found.</p>
              )}
        </div>
      )}
    </form>
  );
};

export default Search;
