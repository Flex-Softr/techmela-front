"use client";

import { toast } from "@/components/ui/use-toast";
import { resetCoupon } from "@/redux/features/order/couponInfo";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { setShippingInfo } from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TGenericErrorResponse } from "@/types/response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import eventHandler from "@/tracking/eventHandler";
import { TCartItemData } from "@/types/cart";
import useCart from "./useCart";
import { TShippingInfo } from "@/types/order/shippingInfo";
import BdAddress from "@/utilities/bdAddress/bdAddress";

type TCheckoutFormData = {
  shipping: TShippingInfo;
  paymentMethod: string;
  paymentDetails?: Record<string, string | number>;
};

const useOrderSubmit = ({
  totalCost,
  orderSource,
  productCategory,
}: {
  totalCost: number;
  orderSource?: { name: string; url?: string };
  productName?: string;
  productCategory?: string;
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
  const auth = useAppSelector((state) => state.auth);

  const handlePlaceOrder = async (data: TCheckoutFormData) => {
    setErrorMessages([]);

    // 0. Check for Empty Cart
    if (!cartData?.data || cartData.data.length === 0) {
      const message = "আপনার কার্ট খালি রয়েছে। অনুগ্রহ করে পণ্য যোগ করুন।";
      setErrorMessages([message]);
      toast({
        title: "আপনার কার্ট খালি রয়েছে",
        className: "bg-destructive/100 text-primary-foreground",
      });
      return;
    }

    // 1. Construct Shipping Info
    const shippingData = data.shipping;

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
      setErrorMessages(["অনুগ্রহ করে ডেলিভারির ঠিকানা সঠিকভাবে লিখুন।"]);
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
        division: shippingData.division,
        district: shippingData.district,
        upazila: shippingData.upazila,
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
          em: shippingData.email || undefined,
          st: divisionName,
          ct: districtName,
          upazila_id: shippingData.upazila || undefined,
          order_id: result?.data?.orderId,
          content_type: "product",
          content_category: productCategory,
          contents:
            cartData?.data && Array.isArray(cartData.data)
              ? cartData.data.map((item: TCartItemData) => ({
                  id: item.variation?._id
                    ? `${item.product?._id}-${item.variation._id}`
                    : item.product?._id,
                  quantity: item.quantity,
                  item_price: item.price?.salePrice || item.price?.regularPrice,
                  name: item.product?.title,
                  brand: item.product?.brand?.name,
                  category: item.product?.category?.[0]?.name,
                  variant: item.variation?.attributes
                    ? Object.entries(item.variation.attributes)
                        .map(([name, value]) => `${name}: ${value}`)
                        .join(", ")
                    : undefined,
                }))
              : result?.data?.orderedProducts?.map(
                  (product: {
                    product: string;
                    variation?: string;
                    quantity: number;
                    unitPrice: number;
                  }) => ({
                    id: product?.variation
                      ? `${product.product}-${product.variation}`
                      : product.product,
                    name: product.product,
                    quantity: product.quantity,
                    item_price: product.unitPrice,
                  })
                ),
          value: result?.data?.subtotal || totalCost,
          discount_value: result?.data?.discount,
          coupon: couponInfo.coupon ?? undefined,
          external_id: auth.user?.userId,
        });

        toast({
          title: "ধন্যবাদ! আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে",
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

export default useOrderSubmit;
