"use client";

import { useToast } from "@/components/ui/use-toast";
import { getImageSrc } from "@/lib/utils";
import { useUpdateCartQuantityMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SidebarCartItem = ({
  item,
  handleRemoveFromCart,
  onItemClick,
}: {
  item: TCartItemData;
  // eslint-disable-next-line no-unused-vars
  handleRemoveFromCart: (id: string) => void;
  onItemClick?: () => void;
}) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [updateQuantity, { isLoading }] = useUpdateCartQuantityMutation();
  const { toast } = useToast();

  const product = item.product;
  const variation = item.variation;

  // Extract variation price if it's an object
  const variationPrice =
    typeof variation?.price === "object"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (variation?.price as any)?.salePrice ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (variation?.price as any)?.regularPrice
      : variation?.price;

  const price =
    variationPrice ||
    (typeof item.price === "object"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item.price as any)?.salePrice ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item.price as any)?.regularPrice
      : item.price) ||
    product?.salePrice ||
    product?.regularPrice ||
    0;

  const variationRegularPrice =
    typeof variation?.price === "object"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (variation?.price as any)?.regularPrice
      : variation?.regularPrice;

  const itemRegularPrice =
    typeof item.price === "object"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item.price as any)?.regularPrice
      : undefined;

  const originalPrice =
    variationRegularPrice ?? itemRegularPrice ?? product?.regularPrice;

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item?.quantity]);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || isLoading) return;
    setQuantity(newQuantity);
    try {
      const res = await updateQuantity({
        cartItemId: item?._id,
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
      setQuantity(item?.quantity); // Revert on failure
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
    <div className="relative p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-50/90 border border-slate-200/80 transition-all duration-200 group">
      <div className="flex gap-3 items-start">
        {/* Product Image */}
        <Link
          href={`/product/${product?.slug}`}
          onClick={onItemClick}
          className="relative size-16 sm:size-18 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs group/img"
        >
          <Image
            src={getImageSrc(product?.image?.src || product?.thumbnail?.src)}
            alt={
              product?.image?.alt ||
              product?.thumbnail?.alt ||
              product?.title ||
              "Product"
            }
            width={72}
            height={72}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1.5">
            <Link
              href={`/product/${product?.slug}`}
              onClick={onItemClick}
              className="text-xs sm:text-sm font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2 leading-snug"
              title={product?.title}
            >
              {product?.title}
            </Link>
            <button
              onClick={() => handleRemoveFromCart(item._id)}
              className="size-6 sm:size-7 rounded-lg hover:bg-red-50 text-slate-400 hover:text-destructive flex items-center justify-center transition-colors shrink-0 -mr-1 -mt-0.5 active:scale-90"
              title="পণ্য বাদ দিন"
              aria-label="পণ্য বাদ দিন"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          {/* Variation Attribute Badges */}
          {variation && variation.attributes && (
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(variation.attributes).map(([key, val]) => (
                <span
                  key={key}
                  className="inline-flex items-center text-[10px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-slate-600 shadow-3xs"
                >
                  <span className="text-slate-400 mr-1">{key}:</span>
                  <span className="font-semibold text-slate-800">{val}</span>
                </span>
              ))}
            </div>
          )}

          {/* Bottom Row: Stepper & Price */}
          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-200/60">
            {/* Stepper */}
            <div className="inline-flex items-center bg-white rounded-lg border border-slate-200/90 shadow-3xs p-0.5">
              <button
                type="button"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                disabled={quantity <= 1 || isLoading}
                className="size-5 sm:size-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
                aria-label="পরিমাণ কমান"
              >
                <Minus className="size-2.5 sm:size-3" />
              </button>
              <span className="text-xs font-bold text-slate-800 min-w-[20px] sm:min-w-[24px] text-center px-1">
                {isLoading ? (
                  <Loader2 className="size-2.5 sm:size-3 animate-spin mx-auto text-primary" />
                ) : (
                  quantity
                )}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={isLoading}
                className="size-5 sm:size-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
                aria-label="পরিমাণ বাড়ান"
              >
                <Plus className="size-2.5 sm:size-3" />
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="text-right">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                &#2547;{(price * quantity).toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                {quantity > 1 && (
                  <span className="mr-1 text-slate-400">
                    {quantity} &times;
                  </span>
                )}
                {originalPrice && originalPrice > price && (
                  <span className="line-through text-slate-400 mr-1 opacity-70">
                    &#2547;{originalPrice}
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

export default SidebarCartItem;
