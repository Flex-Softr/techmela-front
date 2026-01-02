"use client";

import { toast } from "@/components/ui/use-toast";
import PEventIdGenerator from "@/lib/ec/PEventIdGenerator";
import { resetCoupon } from "@/redux/features/order/couponInfo";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  setPaymentInfo,
  setPaymentInfoError,
} from "@/redux/features/order/paymentInfo";
import {
  setShippingInfo,
  setShippingInfoError,
} from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TPaymentMethod } from "@/types/paymentMethod";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  paymentMethods,
  calculatedTotal,
}: {
  paymentMethods: TPaymentMethod[];
  calculatedTotal: number;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: cartData } = useCart();

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [limitModalStatus, setLimitModalStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redux Selectors
  // const shippingInfo = useAppSelector((state) => state.shippingInfo);
  // const paymentInfo = useAppSelector((state) => state.paymentInfo);
  const shippingClass = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);

  // Initial Setup
  useEffect(() => {
    const savedShippingInfo = JSON.parse(
      localStorage.getItem("shippingAddress") || "{}"
    );

    dispatch(setPaymentInfo({ selectedPaymentMethod: paymentMethods[0] }));
    dispatch(setPaymentInfoError({ errors: null }));

    return () => {
      dispatch(setShippingInfo(savedShippingInfo));
      dispatch(setShippingInfoError({ errors: null }));
    };
  }, [dispatch, paymentMethods]);

  const handlePlaceOrder = async (data: TCheckoutFormData) => {
    setErrorMessages([]);

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

    // 2. Construct Payment Info
    const selectedPaymentId = data.paymentMethod;
    const selectedPaymentMethod = paymentMethods.find(
      (p) => p._id === selectedPaymentId
    );

    if (selectedPaymentMethod) {
      const paymentDetails = data.paymentDetails || {};
      dispatch(
        setPaymentInfo({
          selectedPaymentMethod,
          paymentDetails,
        })
      );
    }

    // 3. Validation Check (Redux State based)
    // Note: React Hook Form handles field validation before this function is called.
    // However, we might still want to check if shipping/payment info in Redux is valid if needed,
    // but usually form validation is sufficient.

    // We can simulate the check from createOrderFN if needed, but RHF is primary.
    if (!shippingData.phoneNumber) {
      setErrorMessages(["Please fill out shipping address details."]);
      return;
    }

    // 4. Construct Order Payload
    const eventId = PEventIdGenerator("P_");
    const product = cartData?.data;

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
      eventId,
      orderSource: {
        name: "Website",
        url: window?.location?.href,
      },
      coupon: couponInfo.coupon === null ? undefined : couponInfo.coupon,
    };

    // 5. Create Order Mutation
    try {
      const result = (await createOrder(
        orderData
      ).unwrap()) as TGenericResponse<{
        _id?: string;
      }>;

      if (result.success) {
        setIsSuccess(true);

        // GTM Event
        gtmEventHandler("purchase", {
          content_ids: product?.map((item: any) => item?.product?._id), // eslint-disable-line @typescript-eslint/no-explicit-any
          ph: shippingData.phoneNumber,
          content_category:
            product?.map((item: any) => item?.category?.name).join(", ") || // eslint-disable-line @typescript-eslint/no-explicit-any
            undefined,
          value: calculatedTotal,
          currency: "BDT",
          content_name: product
            ?.map((item: any) => item?.product?.title) // eslint-disable-line @typescript-eslint/no-explicit-any
            .join(", "),
          contents: product,
          num_items: product?.length,
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
