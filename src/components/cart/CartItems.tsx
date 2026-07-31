"use client";

import CartItem from "@/components/cart/CartItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/useCart";
import { useDeleteFromCartMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import CartItemSkeleton from "./CartItemSkeleton";

const CartItems = () => {
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
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            [1, 2, 3]?.map((item) => <CartItemSkeleton key={item} />)
          ) : (
            <>
              {(cartItems?.data as TCartItemData[])?.map((item) => (
                <CartItem
                  key={item._id}
                  cartItem={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CartItems;
