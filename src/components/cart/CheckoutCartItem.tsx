"use client";
import { useToast } from "@/components/ui/use-toast";
import { getImageSrc } from "@/lib/utils";
import { useUpdateCartQuantityMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

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

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    try {
      const res = await updateQuantity({
        cartItemId: cartItem?._id,
        quantity: newQuantity,
      }).unwrap();
      if (res?.success) {
        toast({
          title: "Cart updated successfully",
          className: "bg-success text-primary-foreground",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setQuantity(cartItem?.quantity); // Revert on failure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors = (error as any).data.errorMessages.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => e.message
      );
      toast({
        title: errors?.[0] || "Failed to update cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-start gap-3 py-4 border-b border-slate-100 last:border-b-0">
      <Link
        href={`/product/${cartItem?.product?.slug}`}
        className="relative flex-shrink-0"
      >
        <Image
          src={getImageSrc(cartItem?.product?.image?.src)}
          alt={cartItem?.product?.image?.alt || ""}
          height={100}
          width={100}
          className="w-16 h-16 object-cover rounded-xl border border-slate-200/80 shadow-2xs"
        />
      </Link>

      {/* Middle Column: Details & Quantity */}
      <div className="flex-grow min-w-0 flex flex-col h-full justify-between gap-1.5">
        <div>
          <Link
            href={`/product/${cartItem?.product?.slug}`}
            className="text-xs sm:text-sm font-semibold hover:text-primary line-clamp-2 text-slate-800 transition-colors"
            title={cartItem?.product?.title}
          >
            {cartItem?.product?.title}
          </Link>
          {cartItem?.variation && cartItem?.variation?.attributes ? (
            <div className="text-xs text-slate-500 flex items-center w-full min-h-[1.25rem] mt-0.5">
              <div className="truncate min-w-0 flex-1">
                {Object.entries(cartItem.variation.attributes)
                  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                  .map(([key, value]) => `${value}`)
                  .join(" / ")}
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <div className="flex items-center border border-slate-200 rounded-lg w-max bg-slate-50/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={quantity <= 1 || isLoading}
                  className="px-2 py-1 hover:bg-slate-200 text-slate-600 text-xs disabled:opacity-40 font-bold transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs px-2 min-w-[20px] text-center font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                  disabled={isLoading}
                  className="px-2 py-1 hover:bg-slate-200 text-slate-600 text-xs disabled:opacity-40 font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Quantity Control (for Variable Products only) */}
        {cartItem?.variation && (
          <div className="flex items-center border border-slate-200 rounded-lg w-max bg-slate-50/80 overflow-hidden">
            <button
              type="button"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1 || isLoading}
              className="px-2 py-1 hover:bg-slate-200 text-slate-600 text-xs disabled:opacity-40 font-bold transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs px-2 min-w-[20px] text-center font-semibold text-slate-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleUpdateQuantity(quantity + 1)}
              disabled={isLoading}
              className="px-2 py-1 hover:bg-slate-200 text-slate-600 text-xs disabled:opacity-40 font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Price & Remove */}
      <div className="flex flex-col justify-between items-end h-full gap-2 min-w-[90px]">
        <div className="text-right">
          <div className="text-sm sm:text-base font-bold whitespace-nowrap text-slate-900">
            &#2547;{price * quantity}
          </div>
          <div className="text-[11px] text-slate-500 whitespace-nowrap mt-0.5 font-medium">
            {quantity} x{" "}
            {cartItem?.price?.regularPrice > cartItem?.price?.salePrice && (
              <span className="line-through mr-1 opacity-70">
                &#2547;{cartItem.price.regularPrice}
              </span>
            )}
            <span className="text-slate-600">&#2547;{price}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFromCart(cartItem?._id)}
          className="size-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-destructive transition-colors"
          title="Remove item"
        >
          <IoCloseSharp className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
