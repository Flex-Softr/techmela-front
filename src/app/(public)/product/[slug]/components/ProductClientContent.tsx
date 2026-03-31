"use client";

import { toast } from "@/components/ui/use-toast";
import { PRODUCT_TYPE, STOCK_STATUS } from "@/const/product.const";
import PEventIdGenerator from "@/lib/ec/PEventIdGenerator";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { TSingleProduct } from "@/types/products/singleProduct";
import TGenericResponse from "@/types/response";
import { gtmEventHandler } from "@/utilities/GTM";
import { useState } from "react";
import AddToCartAndBuyNow from "./AddToCartAndBuyNow";

const ProductClientContent = ({
  product,
  selectedVariation,
}: {
  product?: TSingleProduct;
  selectedVariation?: TSingleProduct["variations"][0];
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();

  const addToCartHandler = async (): Promise<boolean> => {
    let success = false;
    const eventId = PEventIdGenerator("ATC_");

    // Prepare cart info to match the server's expected format
    const cartInfo = {
      product: product?._id,
      quantity,
      variation: selectedVariation?._id, // Send variation as a top-level field
      eventId,
    };

    try {
      const result = (await addToCart(cartInfo).unwrap()) as TGenericResponse;
      if (result.success) {
        const regularPrice = product?.price?.regularPrice ?? 0;
        const salePrice = product?.price?.salePrice ?? regularPrice;
        const currentItemPrice = selectedVariation
          ? (selectedVariation.price?.salePrice ??
            selectedVariation.price?.regularPrice ??
            salePrice)
          : salePrice;

        const currentId = selectedVariation?._id
          ? `${product?._id}-${selectedVariation?._id}`
          : product?._id;

        gtmEventHandler({
          event_name: "add_to_cart",
          content_name: product?.title,
          content_ids: currentId ? [currentId] : [],
          content_type: "product",
          content_category: product?.category?.[0]?.name,
          value: currentItemPrice * quantity,
          contents: [
            {
              id: currentId,
              quantity,
              item_price: currentItemPrice,
            },
          ],
        });
        toast({
          title: result?.message,
          className: "bg-success text-white",
        });
        success = true;
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (error as any).data.errorMessages.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => e.message
      );
      toast({
        title: errors?.[0] || "Failed to add to cart",
        variant: "destructive",
      });
      success = false;
    }
    return success;
  };

  // Ensure isDisabled is a boolean value
  const isVariableProduct = product?.type === PRODUCT_TYPE.VARIABLE;
  const isVariationSelected = !!selectedVariation;

  const isStockAvailable = selectedVariation
    ? selectedVariation.inventory?.stockStatus !== STOCK_STATUS.OUT_OF_STOCK
    : product?.inventory?.stockStatus !== STOCK_STATUS.OUT_OF_STOCK;

  const isDisabled =
    (isVariableProduct && !isVariationSelected) || !isStockAvailable;

  const disabledReason =
    isVariableProduct && !isVariationSelected
      ? "Please select a variation"
      : !isStockAvailable
        ? "Out of Stock"
        : undefined;

  return (
    <div>
      <AddToCartAndBuyNow
        quantity={quantity}
        setQuantity={setQuantity}
        addToCartHandler={addToCartHandler}
        isAddToCartLoading={isAddToCartLoading}
        isDisabled={isDisabled} // Pass the isDisabled prop
        disabledReason={disabledReason}
      />
    </div>
  );
};

export default ProductClientContent;
