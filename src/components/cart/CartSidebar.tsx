"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/useCart";
import { useDeleteFromCartMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import SidebarCartItem from "./SidebarCartItem";
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
        title: "কার্ট থেকে পণ্য সরানো যায়নি।",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col h-full sm:max-w-md p-0">
        <SheetHeader className="border-b px-5 py-4 flex flex-row items-center justify-between space-y-0 bg-background">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShoppingBag className="size-4" />
            </div>
            <SheetTitle className="text-base sm:text-lg font-bold text-foreground">
              আমার কার্ট
            </SheetTitle>
            {cartItems && cartItems.length > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {cartItems.length}
              </span>
            )}
          </div>
          <SheetDescription className="hidden">
            আপনার কার্টের পণ্যসমূহ
          </SheetDescription>
          <button
            onClick={() => setOpen(false)}
            className="size-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="কার্ট বন্ধ করুন"
          >
            <X size={18} />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 bg-background">
          {isLoading ? (
            <div className="space-y-2.5 py-4">
              {[1, 2, 3].map((i) => (
                <SidebarCartItemSkeleton key={i} />
              ))}
            </div>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4 py-12">
              <div className="size-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-1">
                <ShoppingBag className="size-7" />
              </div>
              <p className="text-base font-bold text-slate-800">
                আপনার কার্ট বর্তমানে খালি রয়েছে
              </p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                পছন্দের পণ্য খুঁজে পেতে আমাদের শপে ঘুরে দেখুন এবং কার্টে যুক্ত করুন।
              </p>
              <Button
                onClick={() => {
                  setOpen(false);
                  router.push("/shop");
                }}
                className="mt-2 rounded-xl px-6 h-10 font-bold text-xs sm:text-sm bg-primary hover:bg-primary/95 text-primary-foreground flex items-center gap-2"
              >
                <span>কেনাকাটা চালিয়ে যান</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5 py-4">
              {cartItems.map((item) => (
                <SidebarCartItem
                  key={item._id}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  onItemClick={() => setOpen(false)}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="border-t pt-4 mt-auto space-y-3 bg-background px-5 pb-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  সাবটোটাল
                </span>
                <span className="text-[11px] text-slate-400">
                  ডেলিভারি চার্জ চেকআউটে যোগ হবে
                </span>
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                &#2547;{totalCost.toLocaleString()}
              </span>
            </div>
            <Button
              className="w-full h-12 rounded-xl text-base font-bold bg-primary hover:bg-primary/95 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/checkout">
                <span>অর্ডার সম্পন্ন করুন</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
