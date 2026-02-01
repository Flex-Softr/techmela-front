"use client";
import Quantity from "@/app/(main)/checkout/components/Quantity";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateCartQuantityMutation } from "@/redux/features/cart/cartApi";
import { TCartItemData } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import EcButton from "../../EcButton/EcButton";
import { TableCell, TableRow } from "../../ui/table";

const CartItem = ({
  cartItem,
  handleRemoveFromCart,
}: {
  cartItem: TCartItemData;
  // eslint-disable-next-line no-unused-vars
  handleRemoveFromCart: (itemId: string) => void;
}) => {
  const [quantity, setQuantity] = useState(cartItem?.quantity);
  const { toast } = useToast();
  const [updateQuantity, { isLoading }] = useUpdateCartQuantityMutation();
  const price = cartItem?.price?.salePrice
    ? cartItem?.price?.salePrice
    : cartItem?.price?.regularPrice;

  const callBack = async (newQuantity: number) => {
    const res = await updateQuantity({
      cartItemId: cartItem?._id,
      quantity: newQuantity,
    }).unwrap();

    if (res?.success) {
      setQuantity(cartItem?.quantity);
      toast({
        title: res?.message,
        className: "bg-success text-white",
      });
    }
  };

  useEffect(() => {
    setQuantity(cartItem?.quantity);
  }, [cartItem?.quantity]);

  return (
    <TableRow>
      <TableCell className="font-medium flex gap-3 items-center justify-center min-w-48">
        <EcButton
          className="rounded-full w-5 h-5 md:w-8 md:h-8 p-0 hover:text-white hover:bg-secondary"
          variant="ghost"
          type="icon"
          onClick={() => handleRemoveFromCart(cartItem?._id)}
        >
          <IoCloseSharp className="w-3 h-3 md:w-4 md:h-4" />
        </EcButton>

        <Link
          href={`/product/${cartItem?.product?._id}`}
          className="hover:text-secondary flex-grow flex flex-row gap-3 items-center font-semibold text-left"
        >
          <Image
            src={cartItem?.product?.image?.src || ""}
            alt={cartItem?.product?.image?.alt || ""}
            height={200}
            width={200}
            className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-xs md:text-sm">
              {cartItem?.product?.title}
            </span>
            {cartItem?.variation && cartItem?.variation?.attributes && (
              <div className="flex flex-wrap gap-1 text-[10px] md:text-xs text-muted-foreground">
                {Object.entries(cartItem.variation.attributes).map(
                  ([key, value], index, array) => (
                    <span key={key}>
                      {key}: {value}
                      {index < array.length - 1 && " | "}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </Link>
      </TableCell>
      <TableCell className="min-w-24">&#2547; {price}</TableCell>
      <TableCell className="flex justify-center items-center">
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          callBack={callBack}
        />
      </TableCell>
      <TableCell className="text-right min-w-24">
        {isLoading ? (
          "Loading..."
        ) : (
          <>&#2547; {(price * cartItem?.quantity)?.toFixed(2)}</>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
