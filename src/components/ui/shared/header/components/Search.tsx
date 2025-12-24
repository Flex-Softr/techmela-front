"use client";

import { Button } from "@/components/ui/button";
import config from "@/config/config";
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
      <div className="flex justify-center items-center overflow-hidden rounded-md">
        <input
          type="search"
          className="py-5 px-2 w-[90%] outline-none border-2 rounded-md rounded-r-none border-r-0 border-primary h-[45px]"
          placeholder="Search for products"
          name="searchValue"
          value={searchValue}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          // className="font-bold w-[10%] flex justify-center items-center bg-primary h-[45px] text-white"
        >
          <FaSearch />
        </Button>
      </div>

      {showSuggestions && searchValue.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
                  src={`${config.base_url}/${product.thumbnail?.src} ` || ""}
                  alt={product.thumbnail?.alt || ""}
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
