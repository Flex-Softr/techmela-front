"use client";

import { PRODUCT_TYPE } from "@/const/product.const";
import { TSingleProduct, Tvariations } from "@/types/products/singleProduct";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useState } from "react";
import ProductMainInfo from "./ProductMainInfo";
import ProductClientContent from "./ProductClientContent";
import VariationSelector from "./VariationSelector";

type ProductClientWrapperProps = {
  product: TSingleProduct;
  initialVariationPrice: {
    regularPrice: number;
    salePrice: number;
  };
  defaultVariation: Tvariations;
};

const ProductClientWrapper = ({
  product,
  initialVariationPrice,
  defaultVariation,
}: ProductClientWrapperProps) => {
  const [selectedVariation, setSelectedVariation] = useState<
    TSingleProduct["variations"][0] | undefined
  >(undefined);

  useEffect(() => {
    gtmEventHandler({
      event: "view_content",
      content_name: product.title,
      content_type: "product",
      contents: [
        {
          id: defaultVariation?._id
            ? `${product._id}-${defaultVariation?._id}`
            : product._id,
        },
      ],
      currency: "BDT",
      value: Number(
        product?.variations?.length > 0
          ? ((product?.variations[0]?.price?.salePrice ||
              product?.variations[0]?.price?.regularPrice) ??
              0)
          : ((product?.price?.salePrice || product?.price?.regularPrice) ?? 0)
      ),
    });
  }, [product, defaultVariation]);

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

        <ProductClientContent
          product={product}
          selectedVariation={selectedVariation}
        />
      </div>
    </div>
  );
};

export default ProductClientWrapper;
