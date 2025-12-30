"use client";

import { useEffect, useState } from "react";

import { TSingleProduct } from "@/types/products/singleProduct";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import ProductMainInfo from "./ProductMainInfo";
import SingleProductClientContent from "./SingleProductClientContent";
import VariationSelector from "./VariationSelector";

type ProductClientWrapperProps = {
  product: TSingleProduct;
  initialVariationPrice: {
    regularPrice: number;
    salePrice: number;
  };
};

const ProductClientWrapper = ({
  product,
  initialVariationPrice,
}: ProductClientWrapperProps) => {
  const [selectedVariation, setSelectedVariation] = useState<
    TSingleProduct["variations"][0] | undefined
  >(undefined);

  useEffect(() => {
    const productData = {
      content_name: product.title,
      content_category: product.category.name,
      content_ids: [product._id],
      content_type: "product",
      country: "Bangladesh",
      num_items: 1,
    };
    gtmEventHandler("view_content", productData);
  }, [product]);

  return (
    <div>
      <ProductMainInfo
        product={product}
        selectedVariation={selectedVariation}
      />

      <div className="border-t border-border mt-2 pt-2">
        {product.variations && product.variations.length > 0 && (
          <VariationSelector
            variations={product.variations}
            initialPrice={initialVariationPrice}
            onVariationChange={setSelectedVariation}
          />
        )}
        <SingleProductClientContent
          product={product}
          selectedVariation={selectedVariation}
        />
      </div>
    </div>
  );
};

export default ProductClientWrapper;
