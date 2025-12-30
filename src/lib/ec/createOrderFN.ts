"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@/components/ui/use-toast";
import { TPaymentInfoState } from "@/types/order/paymentInfo";
import { TShippingInfoState } from "@/types/order/shippingInfo";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
const createOrderFN = async ({
  setErrorMessages,
  shippingInfo,
  paymentInfo,
  product,
  createOrder,
  totalCost,
  router,
  orderData,
  setIsSuccess,
  setLimitModalStatus,
}: {
  setErrorMessages: any;
  shippingInfo: TShippingInfoState;
  paymentInfo: TPaymentInfoState;
  product?: any[];
  createOrder: any;
  totalCost: number;
  router: AppRouterInstance;
  orderData: any;
  setIsSuccess?: Dispatch<SetStateAction<boolean>>;
  setLimitModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  setErrorMessages([]);
  if (shippingInfo.errors?.length || paymentInfo.errors?.length) {
    setErrorMessages([
      ...(shippingInfo?.errors || []),
      ...(paymentInfo?.errors || []),
    ]);
    return;
  }

  if (!shippingInfo?.data?.phoneNumber) {
    setErrorMessages(["Please fill out shipping address."]);
    return;
  }

  try {
    const result = (await createOrder(orderData).unwrap()) as TGenericResponse<{
      _id?: string;
    }>;

    if (result.success) {
      if (setIsSuccess) {
        setIsSuccess(true);
      }
      gtmEventHandler("purchase", {
        content_ids: product?.map((item) => item?.product?._id),
        ph: shippingInfo?.data?.phoneNumber,
        content_category:
          product?.map((item) => item?.category?.name).join(", ") || undefined,
        value: totalCost,
        currency: "BDT",
        content_name: product?.map((item) => item?.product?.title).join(", "),
        contents: product,
        num_items: product?.length,
      });
      toast({
        title: "Thank you! Your order was successfully placed 🎉",
        className: "bg-success text-white",
      });

      router.push(`/thank-you/${result?.data?._id}`);
    }
  } catch (error) {
    const res = (error as { data: TGenericErrorResponse }).data;
    const errorMessages =
      res?.errorMessages?.map((error) => error.message) || [];
    setErrorMessages([...errorMessages]);
    if (res?.message === "Reached order limit") {
      setLimitModalStatus(true);
    }
  }
};

export default createOrderFN;
