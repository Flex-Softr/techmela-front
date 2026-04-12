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
import { TPaymentMethod } from "@/types/paymentMethod";
import { TGenericErrorResponse } from "@/types/response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import eventHandler from "@/tracking/eventHandler";
import BdAddress from "@/utilities/bdAddress/bdAddress";
import { TShippingInfo } from "@/types/order/shippingInfo";

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
}: {
  paymentMethods: TPaymentMethod[];
  totalCost: number;
  orderedProducts: TOrderItem[];
  lpNo: string;
  productName: string;
  productCategory?: string;
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
      setErrorMessages(["Please fill out all required shipping details."]);
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
        const upazilaName = shippingData.upazila
          ? BdAddress.upazilaNameById(shippingData.upazila, "en").name
          : undefined;

        eventHandler({
          event_name: "purchase",
          fullName: shippingData.fullName,
          ph: shippingData.phoneNumber,
          em: shippingData.email,
          st: divisionName,
          ct: districtName,
          zp: upazilaName,
          order_id: result?.data?.orderId,
          content_type: "product",
          content_category: productCategory,
          contents: result?.data?.orderedProducts?.map(
            (product: {
              product: string;
              variation?: string;
              quantity: number;
              unitPrice: number;
            }) => ({
              id: product?.variation
                ? `${product.product}-${product.variation}`
                : product.product,
              name: productName,
              category: productCategory,
              quantity: product.quantity,
              item_price: product.unitPrice,
            })
          ),
          value: result?.data?.total || totalCost,
          shipping: shippingClass.amount,
          discount_value: result?.data?.discount,
          coupon: couponInfo.coupon ?? undefined,
          status: result?.data?.status,
          external_id: auth.user?.userId,
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

export default useSalesOrderSubmit;
