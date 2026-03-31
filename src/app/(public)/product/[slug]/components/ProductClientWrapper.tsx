"use client";

import { PRODUCT_TYPE } from "@/const/product.const";
import { TSingleProduct, Tvariations } from "@/types/products/singleProduct";
import { gtmEventHandler } from "@/utilities/GTM";
import { useEffect, useState } from "react";
import ProductClientContent from "./ProductClientContent";
import ProductMainInfo from "./ProductMainInfo";
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
  const price = Number(
    product?.variations?.length > 0
      ? ((product?.variations[0]?.price?.salePrice ||
          product?.variations[0]?.price?.regularPrice) ??
          0)
      : ((product?.price?.salePrice || product?.price?.regularPrice) ?? 0)
  );

  useEffect(() => {
    gtmEventHandler({
      event_name: "view_content",
      content_name: product.title,
      content_ids: [product._id],
      content_type: "product",
      content_category: product.category?.[0]?.name,
      contents: [
        {
          id: defaultVariation?._id
            ? `${product._id}-${defaultVariation?._id}`
            : product._id,
          quantity: 1,
          item_price: price,
        },
      ],
      value: price,
    });
  }, [product, defaultVariation, price]);

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
