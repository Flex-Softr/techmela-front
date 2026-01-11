"use client";

import { TSingleProduct } from "@/types/products/singleProduct";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useState } from "react";
import ProductMainInfo from "./ProductMainInfo";
import SingleProductClientContent from "./SingleProductClientContent";
import VariationSelector from "./VariationSelector";
import { PRODUCT_TYPE } from "@/const/product.const";

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
    gtmEventHandler({
      event: "view_content",
      content_type: "product",
      contents: [{ id: product._id }],
    });
  }, [product]);

  const isVariableProduct = product.type === PRODUCT_TYPE.VARIABLE;

  return (
    <div>
      <ProductMainInfo
        product={product}
        selectedVariation={selectedVariation}
      />

      <div className="border-t border-border mt-2 pt-2">
        {isVariableProduct && product?.variations?.length > 0 && (
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
