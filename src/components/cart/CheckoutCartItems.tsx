"use client";

import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/useCart";
import { useDeleteFromCartMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import CheckoutCartItem from "./CheckoutCartItem";
import CheckoutCartItemSkeleton from "./CheckoutCartItemSkeleton";

const CheckoutCartItems = () => {
  const [deleteFromCart] = useDeleteFromCartMutation();
  const { data: cartItems, isLoading } = useCart();
  const { toast } = useToast();

  // delete an item from cart
  const handleRemoveFromCart = async (itemId: string) => {
    try {
      const res = await deleteFromCart({ itemId }).unwrap();
      if (res?.success) {
        toast({
          title: res.message,
          className: "bg-success text-primary-foreground",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "সমস্যা হয়েছে",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {[1, 2].map((i) => (
          <CheckoutCartItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!cartItems?.data?.length) {
    return (
      <div className="py-7 px-4 text-center rounded-2xl bg-slate-50/70 border border-dashed border-slate-200">
        <div className="size-11 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
          <ShoppingBag className="size-5" />
        </div>
        <p className="text-sm font-bold text-slate-700">
          আপনার কার্ট বর্তমানে খালি রয়েছে
        </p>
        <p className="text-xs text-slate-500 mt-1">
          পছন্দের পণ্য যুক্ত করতে শপে ঘুরে দেখুন
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-primary hover:underline"
        >
          <span>পণ্য পছন্দ করুন</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-0.5">
      {(cartItems?.data as TCartItemData[])?.map((item) => (
        <CheckoutCartItem
          key={item._id}
          cartItem={item}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </div>
  );
};

export default CheckoutCartItems;
