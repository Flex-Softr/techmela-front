"use client";

import { toast } from "@/components/ui/use-toast";
import { PRODUCT_TYPE, STOCK_STATUS } from "@/const/product.const";
import { SITE } from "@/const/site.const";
import PEventIdGenerator from "@/lib/ec/PEventIdGenerator";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import eventHandler from "@/tracking/eventHandler";
import { TSingleProduct } from "@/types/products/singleProduct";
import TGenericResponse from "@/types/response";
import { Phone, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import AddToCartAndBuyNow from "./AddToCartAndBuyNow";

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
  const [currentUrl, setCurrentUrl] = useState("");
  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

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
          className: "bg-success text-primary-foreground",
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

  const regularPrice = product?.price?.regularPrice ?? 0;
  const salePrice = product?.price?.salePrice ?? regularPrice;
  const currentItemPrice = selectedVariation
    ? (selectedVariation.price?.salePrice ??
      selectedVariation.price?.regularPrice ??
      salePrice)
    : salePrice;

  const variantText = selectedVariation?.attributes
    ? Object.entries(selectedVariation.attributes)
        .map(([name, value]) => `${name}: ${value}`)
        .join(", ")
    : "";

  const productUrl =
    currentUrl ||
    (product?.slug
      ? `${SITE.baseUrl}/product/${product.slug}`
      : SITE.baseUrl);

  const whatsappMessage = `Hello TechMela, I would like to order:
📦 Product: ${product?.title || "Product"}
${variantText ? `🏷️ Variant: ${variantText}\n` : ""}💰 Price: ৳${currentItemPrice.toLocaleString()}
🔢 Quantity: ${quantity}
🔗 Link: ${productUrl}

Please confirm availability and how to proceed.`;

  const whatsappUrl = `https://wa.me/${SITE.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div>
      {/* Add to Cart and Buy Now Button */}
      <AddToCartAndBuyNow
        quantity={quantity}
        setQuantity={setQuantity}
        addToCartHandler={addToCartHandler}
        isAddToCartLoading={isAddToCartLoading}
        isDisabled={isDisabled} // Pass the isDisabled prop
        disabledReason={disabledReason}
      />

      {/* Direct Order Actions: WhatsApp & Call */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[42px] sm:h-[46px] px-2 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm lg:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
        >
          <FaWhatsapp className="size-4 sm:size-5 shrink-0 group-hover:scale-110 transition-transform text-white" />
          <span className="truncate">Order via WhatsApp</span>
        </a>

        <a
          href={`tel:${SITE.phone}`}
          className="h-[42px] sm:h-[46px] px-2 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[rgba(9,33,67,1)] hover:bg-[rgba(13,45,89,1)] text-white font-bold text-xs sm:text-sm lg:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
        >
          <Phone className="size-3.5 sm:size-4.5 shrink-0 group-hover:scale-110 transition-transform text-white" />
          <span className="truncate">Call for Order</span>
        </a>
      </div>

      {/* Large, Eye-catching Preview Button */}
      {onPreviewClick && (
        <div className="mt-3">
          <button
            onClick={onPreviewClick}
            className="w-full px-6 py-2.5 bg-background text-primary border-2 border-primary text-sm sm:text-base font-black rounded-xl hover:bg-primary/5 transition-all active:scale-95 flex items-center justify-center gap-2 group/preview shadow-sm tracking-wide"
            id="bookPreview"
          >
            <Sparkles className="h-5 w-5 group-hover/preview:animate-bounce-subtle" />
            View Details
          </button>
        </div>
      )}

    </div>
  );
};

export default ProductClientContent;
