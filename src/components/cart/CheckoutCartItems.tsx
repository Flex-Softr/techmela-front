"use client";

import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/useCart";
import { useDeleteFromCartMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
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
          className: "bg-success text-white",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {[1, 2, 3].map((i) => (
          <CheckoutCartItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!cartItems?.data?.length) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
