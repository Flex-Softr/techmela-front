"use client";

import { useAppSelector } from "@/redux/hooks";
import { useMemo } from "react";

const useCheckoutLogic = ({ totalCost }: { totalCost?: number }) => {
  const selectedShipping = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);

  const { couponDiscount, cost, shippingChange } = couponInfo;

  const { totalWithoutCoupon, calculatedTotal, discount, ultimateTotalCost } =
    useMemo(() => {
      const totalWithoutCoupon = Math.floor(
        (totalCost || 0) + (selectedShipping.amount || 0)
      );

      const discount = couponDiscount || 0;
      const ultimateTotalCost = (cost || 0) - discount + (shippingChange || 0);

      const calculatedTotal = couponDiscount
        ? ultimateTotalCost
        : totalWithoutCoupon;

      return {
        totalWithoutCoupon,
        calculatedTotal,
        discount,
        ultimateTotalCost,
      };
    }, [
      totalCost,
      selectedShipping.amount,
      couponDiscount,
      cost,
      shippingChange,
    ]);

  return {
    shippingClass: selectedShipping,
    couponInfo,
    totalWithoutCoupon,
    calculatedTotal,
    discount,
    ultimateTotalCost,
  };
};

export default useCheckoutLogic;
