"use client";

import { TSingleProduct } from "@/types/products/singleProduct";
import { useEffect, useState } from "react";

type VariationSelectorProps = {
  variations: TSingleProduct["variations"];
  initialPrice: {
    regularPrice: number;
    salePrice: number;
    discountPercent?: number;
  };
  // eslint-disable-next-line no-unused-vars
  onVariationChange: (variation: TSingleProduct["variations"][0]) => void;
  // selectedVariation?: TSingleProduct["variations"][0];
};

const VariationSelector = ({
  variations,
  onVariationChange,
}: VariationSelectorProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | null;
  }>(() => {
    // Default selection: Find the first variation with available stock
    const firstInStock = variations?.find(
      (v) => (v.inventory?.stockAvailable ?? 0) > 0
    );
    return firstInStock ? firstInStock.attributes : {};
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const attributeKeys =
      variations?.length > 0 ? Object.keys(variations[0].attributes) : [];

    // Check if all attributes are selected
    if (attributeKeys.every((key) => selectedOptions[key])) {
      const matchedVariation = variations?.find((variation) =>
        attributeKeys.every(
          (key) => variation.attributes[key] === selectedOptions[key]
        )
      );
      if (matchedVariation) {
        onVariationChange(matchedVariation);
      }
    }

    if (
      attributeKeys.length > 0 &&
      !attributeKeys.every((key) => selectedOptions[key])
    ) {
      // Logic for incomplete selection if needed
    } else {
      setErrorMessage(null);
    }
  }, [selectedOptions, variations, onVariationChange]);

  const handleAttributeSelection = (key: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const uniqueValues = (key: string) => {
    return Array.from(
      new Set(variations.map((variation) => variation.attributes[key]))
    );
  };

  return (
    <div>
      <div className="my-4">
        {variations?.[0]?.attributes &&
          Object.keys(variations[0].attributes).map((key, index) => {
            const attributeKeys = Object.keys(variations[0].attributes);
            // Show if it's the first attribute, OR if the previous attribute has been selected
            const showAttribute =
              index === 0 || selectedOptions[attributeKeys[index - 1]];

            if (showAttribute) {
              return (
                <div className="flex gap-3 items-center mb-3" key={key}>
                  <h3 className="text-sm font-semibold min-w-[60px]">{key}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {uniqueValues(key).map((value) => {
                      const isSelected = selectedOptions[key] === value;

                      return (
                        <button
                          key={value}
                          onClick={() => handleAttributeSelection(key, value)}
                          className={`relative py-1 px-2.5 border rounded-md text-sm font-medium transition-all h-7 flex justify-center items-center ${
                            isSelected
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold mt-2 mb-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default VariationSelector;
