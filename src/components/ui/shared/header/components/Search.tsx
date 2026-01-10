"use client";

import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/utils";
import { useFindSearchProductQuery } from "@/redux/features/searchProduct/searchProuctApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ApiResponse, Product } from "./searchProductType/SearchProductType";

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
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useFindSearchProductQuery<ApiResponse>(searchValue, {
    skip: !searchValue.trim(),
  });

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/shop?search=${encodeURIComponent(searchValue)}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setShowSuggestions(true);
  };

  const handleProductClick = (productId: string): void => {
    router.push(`/product/${productId}`);
    setShowSuggestions(false);
  };

  let products: Product[] = [];

  if (isApiResponse(searchResults)) {
    products = searchResults.data;
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative">
      <div className="flex items-center w-full overflow-hidden">
        <input
          type="search"
          name="searchValue"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search for products"
          className="w-full h-[44px] px-4 text-sm outline-none border border-primary rounded-full pr-10"
        />

        <Button
          type="submit"
          className="-ml-10 h-9 w-9 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary/90"
        >
          <FaSearch className="text-sm" />
        </Button>
      </div>

      {showSuggestions && searchValue.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {isLoading && <p className="p-2">Loading...</p>}

          {!isLoading && !isError && products.length > 0 ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="flex items-center p-2 border-b border-gray-200 last:border-0 cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <Image
                  width={55}
                  height={55}
                  src={getImageSrc(product?.thumbnail?.src)}
                  alt={product?.thumbnail?.alt || ""}
                  className="suggestion-image"
                />
                <div className="ml-2">
                  <p className="text-sm font-semibold">{product.title}</p>
                  <div>
                    {product.salePrice ? (
                      <>
                        <span className="text-muted text-xs">
                          &#2547;
                          <del>{product.regularPrice}</del>
                        </span>
                        <span className="font-bold ">
                          {" "}
                          &#2547;{product.salePrice}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold">
                          &#2547;{product.regularPrice}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-2">No results found.</p>
          )}
        </div>
      )}
    </form>
  );
};

export default Search;
