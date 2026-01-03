"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/useCart";
import { getImageSrc } from "@/lib/utils";
import { useDeleteFromCartMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
const CartSidebar = ({ children }: { children: ReactNode }) => {
  const { data: cartData, totalCost, isLoading } = useCart();
  const [deleteCartItem] = useDeleteFromCartMutation();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const cartItems = cartData?.data as TCartItemData[];

  const handleRemoveFromCart = async (id: string) => {
    try {
      await deleteCartItem({ itemId: id }).unwrap();
    } catch (error) {
      toast({
        title: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col h-full sm:max-w-sm p-0">
        <SheetHeader className="border-b px-4 py-2 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-xl font-medium">Shopping Cart</SheetTitle>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-transparent h-10 w-10 text-gray-500 hover:text-gray-900"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 bg-gray-50/50">
          {isLoading ? (
            <p className="text-center text-gray-500 mt-10">Loading cart...</p>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
              <p className="text-gray-500">Your cart is empty</p>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="text-white bg-primary hover:bg-primary"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
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

                // Logic to fallback to simple product price correctly
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

                const originalPrice =
                  variationRegularPrice ?? product?.regularPrice;

                return (
                  <div
                    key={item._id}
                    className="flex gap-3 relative group py-3 px-2 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 border rounded-md overflow-hidden bg-gray-50">
                      <Image
                        src={getImageSrc(product?.image?.src)}
                        alt={
                          product?.image?.alt ||
                          product?.title ||
                          "Product Image"
                        }
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 leading-tight w-full pr-6">
                        {product?.title}
                      </h4>

                      {variation && variation.attributes && (
                        <div className="text-sm text-gray-700 mt-1">
                          {Object.entries(variation.attributes)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(" | ")}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-1.5 text-sm">
                        <div className="flex items-center gap-1 font-bold text-gray-900">
                          <span>&#2547;{price}</span>
                          <span className="text-gray-700 font-normal">
                            x {item.quantity}
                          </span>
                        </div>

                        {originalPrice && originalPrice > price && (
                          <div className="text-gray-400 line-through text-sm">
                            &#2547;{originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="absolute right-2 bottom-3 p-1.5 transition-colors text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="border-t pt-3 mt-auto space-y-3 bg-white px-4 pb-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Subtotal:</span>
              <span>&#2547;{totalCost}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
