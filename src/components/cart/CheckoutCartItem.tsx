"use client";
import { useToast } from "@/components/ui/use-toast";
import { getImageSrc } from "@/lib/utils";
import { useUpdateCartQuantityMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CheckoutCartItem = ({
  cartItem,
  handleRemoveFromCart,
}: {
  cartItem: TCartItemData;
  // eslint-disable-next-line no-unused-vars
  handleRemoveFromCart: (itemId: string) => void;
}) => {
  const [quantity, setQuantity] = useState(cartItem?.quantity);
  const [updateQuantity, { isLoading }] = useUpdateCartQuantityMutation();
  const { toast } = useToast();

  const price = cartItem?.price?.salePrice
    ? cartItem?.price?.salePrice
    : cartItem?.price?.regularPrice;

  useEffect(() => {
    setQuantity(cartItem?.quantity);
  }, [cartItem?.quantity]);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || isLoading) return;
    setQuantity(newQuantity);
    try {
      const res = await updateQuantity({
        cartItemId: cartItem?._id,
        quantity: newQuantity,
      }).unwrap();
      if (res?.success) {
        toast({
          title: "কার্ট আপডেট করা হয়েছে",
          className: "bg-success text-primary-foreground",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setQuantity(cartItem?.quantity); // Revert on failure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (error as any).data?.errorMessages?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => e.message
      );
      toast({
        title: errors?.[0] || "কার্ট আপডেট করা যায়নি",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative p-3 sm:p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 transition-all duration-200 group">
      <div className="flex gap-3 items-start">
        {/* Product Thumbnail */}
        <Link
          href={`/product/${cartItem?.product?.slug}`}
          className="relative flex-shrink-0 size-16 sm:size-20 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs group/img"
        >
          <Image
            src={getImageSrc(
              cartItem?.product?.image?.src || cartItem?.product?.thumbnail?.src
            )}
            alt={
              cartItem?.product?.image?.alt ||
              cartItem?.product?.thumbnail?.alt ||
              cartItem?.product?.title ||
              "Product"
            }
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Center & Right content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${cartItem?.product?.slug}`}
              className="text-xs sm:text-sm font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2 leading-snug"
              title={cartItem?.product?.title}
            >
              {cartItem?.product?.title}
            </Link>
            <button
              type="button"
              onClick={() => handleRemoveFromCart(cartItem?._id)}
              className="size-7 rounded-lg hover:bg-red-50 text-slate-400 hover:text-destructive flex items-center justify-center transition-colors shrink-0 -mr-1 -mt-1 active:scale-95"
              title="পণ্যটি মুছে ফেলুন"
              aria-label="পণ্যটি মুছে ফেলুন"
            >
              <Trash2 className="size-3.5 sm:size-4" />
            </button>
          </div>

          {/* Variation attributes pills */}
          {cartItem?.variation?.attributes && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {Object.entries(cartItem.variation.attributes).map(
                ([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-600 shadow-3xs"
                  >
                    <span className="text-slate-400 mr-1">{key}:</span>
                    <span className="font-semibold text-slate-800">
                      {value}
                    </span>
                  </span>
                )
              )}
            </div>
          )}

          {/* Bottom Row: Quantity Stepper & Price Breakdown */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-200/60">
            {/* Quantity Stepper */}
            <div className="inline-flex items-center bg-white rounded-lg border border-slate-200/90 shadow-3xs p-0.5">
              <button
                type="button"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={quantity <= 1 || isLoading}
                className="size-6 sm:size-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
                aria-label="পরিমাণ কমান"
              >
                <Minus className="size-3 sm:size-3.5" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-slate-800 min-w-[24px] sm:min-w-[28px] text-center px-1">
                {isLoading ? (
                  <Loader2 className="size-3 sm:size-3.5 animate-spin mx-auto text-primary" />
                ) : (
                  quantity
                )}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={isLoading}
                className="size-6 sm:size-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
                aria-label="পরিমাণ বাড়ান"
              >
                <Plus className="size-3 sm:size-3.5" />
              </button>
            </div>

            {/* Price Info */}
            <div className="text-right">
              <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                &#2547;{(price * quantity).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {quantity > 1 && (
                  <span className="mr-1 text-slate-400">
                    {quantity} &times;
                  </span>
                )}
                {cartItem?.price?.regularPrice > cartItem?.price?.salePrice && (
                  <span className="line-through mr-1 text-slate-400 opacity-80">
                    &#2547;{cartItem.price.regularPrice}
                  </span>
                )}
                <span className="text-slate-600 font-semibold">
                  &#2547;{price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
