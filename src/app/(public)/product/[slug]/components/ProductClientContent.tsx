"use client";

import { toast } from "@/components/ui/use-toast";
import { PRODUCT_TYPE, STOCK_STATUS } from "@/const/product.const";
import PEventIdGenerator from "@/lib/ec/PEventIdGenerator";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { TSingleProduct } from "@/types/products/singleProduct";
import TGenericResponse from "@/types/response";
import { useState } from "react";
import eventHandler from "@/tracking/eventHandler";
import AddToCartAndBuyNow from "./AddToCartAndBuyNow";
import ProductSharing from "./ProductSharing";
import { BookOpen, Phone, HelpCircle } from "lucide-react";
import HowToOrderModal from "./HowToOrderModal";

const ProductClientContent = ({
  product,
  selectedVariation,
  onPreviewClick,
}: {
  product?: TSingleProduct;
  selectedVariation?: TSingleProduct["variations"][0];
  onPreviewClick?: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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

        eventHandler({
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
              name: product?.title,
              brand: product?.brand?.name,
              category: product?.category?.[0]?.name,
              variant: selectedVariation?.attributes
                ? Object.entries(selectedVariation.attributes)
                    .map(([name, value]) => `${name}: ${value}`)
                    .join(", ")
                : undefined,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
        {/* Large, Eye-catching Preview Button */}
        {onPreviewClick && (
          <button
            onClick={onPreviewClick}
            className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-primary border-2 border-primary/20 text-sm sm:text-base font-black rounded-full hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 group/preview shadow-sm tracking-wide shrink-0"
            id="bookPreview"
          >
            <span className="text-lg sm:text-xl group-hover/preview:animate-bounce-subtle">
              <BookOpen className="mr-0.5 sm:mr-1 h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            একটু পড়ে দেখুন
          </button>
        )}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <ProductSharing />
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 border-primary/10 bg-primary/5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
              <a href="tel:+8801602431167">
                <Phone className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
            <div>
              <p className="font-bold text-base sm:text-lg text-primary leading-tight">
                <a href="tel:+8801602431167">০১৬০২-৪৩১১৬৭</a>
              </p>
              <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                যেকোনো প্রয়োজনে কল করুন
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex items-center gap-2 bg-white text-primary border border-primary/20 hover:border-primary/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            অর্ডার কীভাবে করবেন?
          </button>
        </div>
      </div>

      <HowToOrderModal
        isOpen={isOrderModalOpen}
        onOpenChange={setIsOrderModalOpen}
      />
    </div>
  );
};

export default ProductClientContent;
