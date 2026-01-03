"use client";
import { useToast } from "@/components/ui/use-toast";
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
          className: "bg-success text-white",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setQuantity(cartItem?.quantity); // Revert on failure
      toast({
        title: error?.message || "Failed to update cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-start gap-3 py-4 border-b last:border-b-0">
      <Link
        href={`/product/${cartItem?.product?.slug}`}
        className="relative flex-shrink-0"
      >
        <Image
          src={cartItem?.product?.image?.src || ""}
          alt={cartItem?.product?.image?.alt || ""}
          height={100}
          width={100}
          className="w-16 h-16 object-cover rounded-md border border-gray-100"
        />
      </Link>

      {/* Middle Column: Details & Quantity */}
      <div className="flex-grow min-w-0 flex flex-col h-full justify-between gap-2">
        <div>
          <Link
            href={`/product/${cartItem?.product?.slug}`}
            className="text-sm font-bold hover:text-secondary truncate block"
          >
            {cartItem?.product?.title}
          </Link>
          {cartItem?.variation && cartItem?.variation?.attributes && (
            <div className="text-sm text-muted-foreground truncate">
              {Object.entries(cartItem.variation.attributes)
                // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                .map(([key, value]) => `${value}`)
                .join(" / ")}
            </div>
          )}
        </div>

        {/* Quantity Control */}
        <div className="flex items-center border rounded-md w-max">
          <button
            type="button"
            onClick={() => handleUpdateQuantity(quantity - 1)}
            disabled={quantity <= 1 || isLoading}
            className="px-3 py-1 hover:bg-gray-100 text-sm disabled:opacity-50 font-bold"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-sm px-2 min-w-[24px] text-center font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleUpdateQuantity(quantity + 1)}
            disabled={isLoading}
            className="px-3 py-1 hover:bg-gray-100 text-sm disabled:opacity-50 font-bold"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Column: Price & Remove */}
      <div className="flex flex-col justify-between items-end h-full gap-2 min-w-[80px]">
        <div className="text-sm font-bold whitespace-nowrap">
          &#2547; {(price * quantity)?.toFixed(2)}
        </div>
        <div className="text-xs text-muted-foreground text-right">
          {quantity} x &#2547; {price?.toFixed(2)}
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFromCart(cartItem?._id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Remove item"
        >
          <IoCloseSharp className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
