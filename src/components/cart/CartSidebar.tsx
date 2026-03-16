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
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import SidebarCartItemSkeleton from "./SidebarCartItemSkeleton";
const CartSidebar = ({ children }: { children: ReactNode }) => {
  const { data: cartData, totalCost, isLoading } = useCart();
  const [deleteCartItem] = useDeleteFromCartMutation();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
      <SheetContent className="flex flex-col h-full sm:max-w-md p-0">
        <SheetHeader className="border-b px-5 py-3 flex flex-row items-center justify-between space-y-0 bg-white">
          <SheetTitle className="text-lg font-bold">আমার কার্ট</SheetTitle>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-gray-100 h-8 w-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 bg-white">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <SidebarCartItemSkeleton key={i} />
              ))}
            </div>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
              <p className="text-gray-500">Your cart is empty</p>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push("/shop");
                }}
                variant="outline"
                className="text-white hover:text-white bg-primary hover:bg-primary"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div>
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
                    className="flex items-center gap-3 py-2 relative group border-b border-gray-200 last:border-b-0"
                  >
                    <div className="relative size-16 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
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

                    <div className="flex-1 flex flex-col min-w-0 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-base font-bold text-gray-900 leading-tight line-clamp-2">
                          {product?.title}
                        </h4>
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="p-1 -mr-1 transition-colors text-red-400 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {variation && variation.attributes && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(variation.attributes)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(" | ")}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-1">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                          <span>
                            ৳{price} x {item.quantity}
                          </span>
                          <span className="text-gray-400">=</span>
                          <span className="font-bold text-gray-900">
                            ৳{price * item.quantity}
                          </span>
                        </div>

                        {originalPrice && originalPrice > price && (
                          <div className="text-gray-600 line-through text-sm">
                            ৳{originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="border-t pt-4 mt-auto space-y-4 bg-white px-5 pb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                সাবটোটাল
              </span>
              <span className="text-xl font-bold text-primary">
                ৳{totalCost}
              </span>
            </div>
            <Button
              className="w-full h-12 rounded-xl text-base font-bold shadow-none"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/checkout">চেকআউট করুন</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
