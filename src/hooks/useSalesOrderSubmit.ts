"use client";

import { toast } from "@/components/ui/use-toast";
import { resetCoupon } from "@/redux/features/order/couponInfo";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  setPaymentInfo,
  setPaymentInfoError,
} from "@/redux/features/order/paymentInfo";
import { setShippingInfo } from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import eventHandler from "@/tracking/eventHandler";
import { TShippingInfo } from "@/types/order/shippingInfo";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TGenericErrorResponse } from "@/types/response";
import BdAddress from "@/utilities/bdAddress/bdAddress";
import { getTrackingItemId } from "@/lib/ec/variation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TCheckoutFormData = {
  shipping: TShippingInfo;
  paymentMethod: string;
  paymentDetails?: Record<string, string | number>;
};

type TOrderItem = {
  product: string;
  variation?: string;
  quantity: number;
};

type TOrderedProductRes = TOrderItem & { unitPrice?: number };

type TOrderData = {
  payment: {
    paymentMethod: string;
    paymentDetails?: Record<string, string | number>;
  };
  shippingCharge: string;
  shipping: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
    email?: string;
  };
  orderNotes?: string;
  orderSource: {
    name: string;
    url: string;
    lpNo?: string;
  };
  coupon?: string;
  salesPage: boolean;
  orderedProducts: TOrderItem[];
};

const useSalesOrderSubmit = ({
  paymentMethods,
  totalCost,
  orderedProducts,
  lpNo,
  productName,
  productCategory,
  productBrand,
  productVariant,
  unitPrice,
}: {
  paymentMethods: TPaymentMethod[];
  totalCost: number;
  orderedProducts: TOrderItem[];
  lpNo: string;
  productName: string;
  productCategory?: string;
  productBrand?: string;
  productVariant?: string;
  unitPrice?: number; // Fallback unit price if the API response lacks orderedProducts
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [limitModalStatus, setLimitModalStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingClass = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);
  const auth = useAppSelector((state) => state.auth);

  // Initial Setup: Set default payment method
  useEffect(() => {
    dispatch(setPaymentInfo({ selectedPaymentMethod: paymentMethods[0] }));
    dispatch(setPaymentInfoError({ errors: null }));

    return () => {
      dispatch(setPaymentInfoError({ errors: null }));
    };
  }, [dispatch, paymentMethods]);

  const handlePlaceOrder = async (data: TCheckoutFormData) => {
    setErrorMessages([]);

    // 1. Construct Shipping Data
    const shippingData = {
      fullName: data.shipping.fullName,
      phoneNumber: data.shipping.phoneNumber,
      fullAddress: data.shipping.fullAddress,
      email: data.shipping.email,
      notes: data.shipping.notes,
      division: data.shipping.division,
      district: data.shipping.district,
      upazila: data.shipping.upazila,
    };

    // Update Redux & LocalStorage (for persistence in future visits)
    dispatch(setShippingInfo(shippingData));
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));

    // 2. Local Validation
    if (
      !shippingData.phoneNumber ||
      !shippingData.fullName ||
      !shippingData.fullAddress
    ) {
      setErrorMessages([
        "অনুগ্রহ করে শিপিংয়ের প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।",
      ]);
      return;
    }

    // 3. Construct Order Data (Bypassing Cart API)
    const orderData: TOrderData = {
      payment: {
        paymentMethod: data.paymentMethod,
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
        name: "Landing Page",
        url: typeof window !== "undefined" ? window.location.href : "",
        lpNo: lpNo,
      },
      coupon: couponInfo.coupon === null ? undefined : couponInfo.coupon,
      salesPage: true,
      orderedProducts: orderedProducts,
    };

    // 4. Create Order Mutation
    try {
      const result = await createOrder(orderData).unwrap();
      if (result.success) {
        setIsSuccess(true);
        // GTM Event
        const divisionName = shippingData.division
          ? BdAddress.divisionNameById(shippingData.division, "en").name
          : undefined;
        const districtName = shippingData.district
          ? BdAddress.districtNameById(shippingData.district, "en").name
          : undefined;

        eventHandler({
          event_name: "purchase",
          fullName: shippingData.fullName,
          ph: shippingData.phoneNumber,
          em: shippingData.email,
          st: divisionName,
          ct: districtName,
          upazila_id: shippingData.upazila,
          order_id: result?.data?.orderId,
          content_type: "product",
          content_category: productCategory,
          contents: (
            (result?.data?.orderedProducts as TOrderedProductRes[]) ||
            orderedProducts.map((item) => ({ ...item, unitPrice }))
          ).map((item) => ({
            id: getTrackingItemId(item.product, item.variation),
            name: productName,
            brand: productBrand,
            category: productCategory,
            variant: item.variation ? productVariant : undefined,
            quantity: item.quantity,
            item_price: item.unitPrice,
          })),
          value: result?.data?.subtotal || totalCost,
          discount_value: result?.data?.discount,
          coupon: couponInfo.coupon ?? undefined,
          external_id: auth.user?.userId,
        });

        toast({
          title: "ধন্যবাদ! আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে।",
          className: "bg-success text-primary-foreground",
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

export default useSalesOrderSubmit;
