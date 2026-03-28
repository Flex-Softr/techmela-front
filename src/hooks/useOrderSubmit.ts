"use client";

import { toast } from "@/components/ui/use-toast";
import { resetCoupon } from "@/redux/features/order/couponInfo";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { setShippingInfo } from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TGenericErrorResponse } from "@/types/response";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCart from "./useCart";

type TCheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  email?: string;
  notes?: string;
  paymentMethod: string;
  paymentDetails?: Record<string, string | number>;
};

const useOrderSubmit = ({
  totalCost,
  orderSource,
}: {
  totalCost: number;
  orderSource?: { name: string; url?: string };
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { data: cartData } = useCart();

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [limitModalStatus, setLimitModalStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingClass = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);

  const handlePlaceOrder = async (data: TCheckoutFormData) => {
    setErrorMessages([]);

    // 0. Check for Empty Cart
    if (!cartData?.data || cartData.data.length === 0) {
      const message = "Your cart is empty. Please add items to your cart.";
      setErrorMessages([message]);
      toast({
        title: "Your cart is empty",
        className: "bg-red-500 text-white",
      });
      return;
    }

    // 1. Construct Shipping Info
    const shippingData = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      fullAddress: data.fullAddress,
      email: data.email,
      notes: data.notes,
    };

    // Update Redux & LocalStorage for Shipping
    dispatch(setShippingInfo(shippingData));
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));

    // 2. Construct Order Info
    const selectedPaymentId = data.paymentMethod;

    // 3. Validation Check (Redux State based)
    // Note: React Hook Form handles field validation before this function is called.
    // However, we might still want to check if shipping/payment info in Redux is valid if needed,
    // but usually form validation is sufficient.

    // We can simulate the check from createOrderFN if needed, but RHF is primary.
    if (!shippingData.phoneNumber) {
      setErrorMessages(["Please fill out shipping address details."]);
      return;
    }

    const orderData = {
      payment: {
        paymentMethod: selectedPaymentId,
        paymentDetails: data.paymentDetails,
      },
      shippingCharge: shippingClass._id,
      shipping: {
        fullName: shippingData.fullName,
        phoneNumber: shippingData.phoneNumber,
        fullAddress: shippingData.fullAddress,
        email: shippingData.email || undefined,
      },
      orderNotes: shippingData.notes,
      orderSource: {
        name: orderSource?.name || "Website",
        url: orderSource?.url || window?.location?.href,
      },
      coupon: couponInfo.coupon === null ? undefined : couponInfo.coupon,
    };

    // 5. Create Order Mutation
    try {
      const result = await createOrder(orderData).unwrap();
      if (result.success) {
        setIsSuccess(true);

        // GTM Event
        gtmEventHandler({
          event: "purchase",
          ph: shippingData.phoneNumber,
          em: shippingData.email,
          value: totalCost,
          currency: "BDT",
          contents: result?.data?.orderedProducts?.map((product) => ({
            id: product?.variation
              ? `${product.product}-${product.variation}`
              : product.product,
            name: product.product,
            quantity: product.quantity,
            price: product.unitPrice,
          })),
          content_type: "product",
          order_id: result?.data?.orderId,
        });

        toast({
          title: "Thank you! Your order was successfully placed",
          className: "bg-success text-white",
        });

        dispatch(resetCoupon());
        router.push(`/thank-you/${result?.data?._id}`);
      }
    } catch (error) {
      const res = (error as { data: TGenericErrorResponse }).data;
      const messages = res?.errorMessages?.map((error) => error.message) || [];
      setErrorMessages(messages);

      if (res?.message === "Reached order limit") {
        setLimitModalStatus(true);
      }
    }
  };

  return {
    handlePlaceOrder,
    isLoading,
    errorMessages,
    isSuccess,
    limitModalStatus,
    setLimitModalStatus,
  };
};

export default useOrderSubmit;
