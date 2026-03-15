/* eslint-disable react/no-unescaped-entities */
"use client";
import { useCheckWarrantyQuery } from "@/redux/features/warrantyApi/warrantyApiSlice";
import React, { useEffect, useState } from "react";
import { Product, ProductItem } from "../commonTypes/CommonTypes";
import ProductTable from "../productsTable/ProductsTable";

type ApiError = {
  data?: {
    errorMessages?: {
      path: string;
      message: string;
    }[];
  };
};

const SearchProduct = () => {
  const [warrantyCodes, setWarrantyCodes] = useState<string[]>([]);
  const [newWarrantyCode, setNewWarrantyCode] = useState("");
  const [orderedPhoneNumber, setOrderedPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notFoundProducts, setNotFoundProducts] = useState<string[]>([]);
  const [searched, setSearched] = useState<boolean>(false);

  const [validCodes, setValidCodes] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWarrantyCode(event.target.value);
  };

  const handleRemoveCode = (index: number) => {
    setWarrantyCodes(warrantyCodes?.filter((_, i) => i !== index));

    if (orderedPhoneNumber?.length < 11) {
      setSearched(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.trim();

    if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("ফোন নম্বর অবশ্যই সংখ্যার অংশ হতে হবে");
      setOrderedPhoneNumber(phoneNumber);
      return;
    }

    setOrderedPhoneNumber(phoneNumber);
    setPhoneNumberError("");

    if (phoneNumber?.length !== 11) {
      setPhoneNumberError("ফোন নম্বর ১১ টি সংখ্যা হতে হবে");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let currentCodes = [...warrantyCodes];

    if (newWarrantyCode?.trim() !== "") {
      const codesToAdd = newWarrantyCode
        .split(",")
        .map((code) => code.trim())
        .filter((code) => code !== "" && !warrantyCodes.includes(code));

      if (codesToAdd.length > 0) {
        currentCodes = [...warrantyCodes, ...codesToAdd];
        setWarrantyCodes(currentCodes);
        setNewWarrantyCode("");
        setError("");
      }
    }

    if (currentCodes?.length === 0) {
      setError("পন্যের ওয়ারেন্টি কোডগুলি লিখুন");
      return;
    }

    if (orderedPhoneNumber?.length !== 11) {
      setPhoneNumberError("অর্ডারকৃত ফোন নম্বরটি লিখুন");
      return;
    }

    setSearched(true);
  };

  const shouldSkipApiCall =
    !searched || phoneNumberError !== "" || orderedPhoneNumber?.length < 11;

  const {
    data: searchResultData,
    isLoading,
    isError,
    error: apiError,
  } = useCheckWarrantyQuery(
    {
      phoneNumber: orderedPhoneNumber,
      warrantyCodes: warrantyCodes,
    },
    { skip: shouldSkipApiCall }
  );

  const [filteredResults, setFilteredResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searched && !isError && searchResultData?.data) {
      const found: string[] = [];
      const filtered: Product[] = [];

      searchResultData.data.forEach((order: Product) => {
        const orderCopy = JSON.parse(JSON.stringify(order));
        const matchedProducts = orderCopy.products.filter(
          (product: ProductItem) => {
            if (!product.warranty) return false;

            const hasMatch = product.warranty.warrantyCodes.some((wc) =>
              warrantyCodes.includes(wc.code)
            );

            if (hasMatch) {
              // Track which codes were found
              product.warranty.warrantyCodes.forEach((wc) => {
                if (
                  warrantyCodes.includes(wc.code) &&
                  !found.includes(wc.code)
                ) {
                  found.push(wc.code);
                }
              });
              return true;
            }
            return false;
          }
        );

        if (matchedProducts.length > 0) {
          orderCopy.products = matchedProducts;
          filtered.push(orderCopy);
        }
      });

      setValidCodes(found);
      setFilteredResults(filtered);
      setNotFoundProducts(
        warrantyCodes.filter((code) => !found.includes(code))
      );

      if (found.length === 0) {
        setError("কোনো তথ্য পাওয়া যায়নি");
      } else {
        setError("");
      }
    } else {
      setFilteredResults([]);
      setValidCodes([]);
      setNotFoundProducts([]);
      setError("");
    }

    if (isError && apiError) {
      const errorMessage =
        (apiError as ApiError).data?.errorMessages?.[0]?.message ||
        "Unknown error";
      setError(errorMessage);
    }
  }, [searched, isError, searchResultData, warrantyCodes, apiError]);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          আপনার পন্য নির্বাচন করুন
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          পন্যের গায়ে থাকা ওয়ারেন্টি কোড দিয়ে পন্য বাছাই করুন
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="warrantyCode"
              >
                পন্যের ওয়ারেন্টি কোড
              </label>
              <div className="relative">
                <input
                  value={newWarrantyCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 bg-gray-50/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  id="warrantyCode"
                  type="text"
                  placeholder="যেমন: CODE1, CODE2"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
              {(isFocused || newWarrantyCode.trim() !== "") &&
              warrantyCodes.length === 0 ? (
                <p className="text-gray-400 text-xs mt-1">
                  একাধিক কোড দিতে কমা (,) ব্যবহার করুন এবং "অনুসন্ধান করুন"
                  বাটনে ক্লিক করুন
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 mt-3">
                {warrantyCodes.map((code, index) => (
                  <div
                    key={index}
                    className="bg-primary/5 text-primary border border-primary/10 rounded-full flex items-center py-1 px-3"
                  >
                    <span className="mr-2 text-xs md:text-sm font-medium">
                      {code}
                    </span>
                    <button
                      type="button"
                      className="text-red-400 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveCode(index)}
                      aria-label={`Remove ${code}`}
                    >
                      &#10005;
                    </button>
                    {notFoundProducts.includes(code) && (
                      <p className="text-red-500 text-xs ml-2">সঠিক নয়</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="orderedPhoneNumber"
              >
                অডারকৃত মোবাইল নম্বর
              </label>
              <input
                value={orderedPhoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full border border-gray-200 bg-gray-50/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                id="orderedPhoneNumber"
                type="text"
                placeholder="01xxxxxxxxx"
              />
              {phoneNumberError && (
                <p className="text-red-500 text-xs mt-1">{phoneNumberError}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-3 px-8 hover:bg-primary/90 transition-all shadow-sm font-medium text-sm md:text-base"
            >
              অনুসন্ধান করুন
            </button>
          </div>
        </form>

        <div className="mt-6">
          {isLoading && (
            <p className="text-center text-gray-500 text-sm">Loading...</p>
          )}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </div>
      </div>

      {searched && !isLoading && !error && filteredResults.length > 0 && (
        <div className="mt-8">
          <ProductTable
            searchResult={filteredResults}
            notFoundProducts={notFoundProducts}
            error={error}
            validCodes={validCodes}
          />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
