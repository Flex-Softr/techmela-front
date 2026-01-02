"use client";
import { useCartQuery } from "@/redux/features/cart/cartApi";
import { useMemo } from "react";

const useCart = () => {
  const { data, isLoading } = useCartQuery({});

  const { totalCartItem, totalCost } = useMemo(() => {
    let totalCartItem = 0;
    let totalCost = 0;

    if (data?.success && Array.isArray(data?.data)) {
      totalCartItem = data.data.length;

      data.data.forEach(
        (cartItem: {
          price: { salePrice: number; regularPrice: number };
          quantity: number;
        }) => {
          const price = cartItem?.price?.salePrice
            ? cartItem?.price?.salePrice
            : cartItem?.price?.regularPrice;
          const currentProductCost = cartItem?.quantity * price;

          totalCost += currentProductCost;
        }
      );
    }

    // Ensure 2 decimal places and return number
    totalCost = Number(totalCost.toFixed(2)) || 0;

    return { totalCartItem, totalCost };
  }, [data]);

  return { data, isLoading, totalCartItem, totalCost };
};

export default useCart;
