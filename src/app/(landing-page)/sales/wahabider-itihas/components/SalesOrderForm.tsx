"use client";

import PaymentMethods from "@/app/(main)/checkout/components/PaymentMethods";
import SelectShippingArea from "@/app/(main)/checkout/components/SelectShippingArea";
import ShippingAddress from "@/app/(main)/checkout/components/ShippingAddress";
import EcButton from "@/components/EcButton/EcButton";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";

import useSalesOrderSubmit from "@/hooks/useSalesOrderSubmit";
import { TPaymentMethod } from "@/types/paymentMethod";
import { Tvariations } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

type TCheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  email?: string;
  notes?: string;
  paymentMethod: string;
  paymentDetails?: Record<string, string | number>;
};

type TCartItem = {
  productId: string;
  variation: Tvariations | null;
  quantity: number;
};

type Props = {
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
  productTitle: string;
  cartItems: TCartItem[];
  fallbackPrice?: number;
};

const SalesOrderForm = ({
  shippingCharges,
  paymentMethods,
  productTitle,
  cartItems,
  fallbackPrice = 0,
}: Props) => {
  const methods = useForm<TCheckoutFormData>({ mode: "all" });

  const totalCost = useMemo(() => {
    if (cartItems.length === 0) return fallbackPrice;
    return cartItems.reduce((acc, item) => {
      // Use variation price if applicable, else fallback to the product base price
      const price =
        item.variation?.price?.salePrice ??
        item.variation?.price?.regularPrice ??
        fallbackPrice;
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems, fallbackPrice]);

  const { calculatedTotal } = useCheckoutLogic({
    totalCost,
    shippingCostExceptFirst: 0,
  });

  const orderedProducts = useMemo(() => {
    return cartItems.map((item) => ({
      product: item.productId,
      variation: item.variation?._id,
      quantity: item.quantity,
    }));
  }, [cartItems]);

  const {
    handlePlaceOrder,
    isLoading,
    errorMessages,
    isSuccess,
    limitModalStatus,
    setLimitModalStatus,
  } = useSalesOrderSubmit({
    paymentMethods,
    calculatedTotal,
    orderedProducts,
    lpNo: "LP-WHB-01",
  });

  // Fire InitiateCheckout when user starts filling the form
  useEffect(() => {
    const subscription = methods.watch((_, { name }) => {
      if (name === "fullName" && methods.getValues("fullName")?.length === 1) {
        gtmEventHandler({
          event: "initiate_checkout",
          content_name: productTitle,
          content_ids: cartItems.map((item) => item.productId),
          content_type: "product",
          value: calculatedTotal,
          currency: "BDT",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, productTitle, cartItems, calculatedTotal]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handlePlaceOrder)}
          className="space-y-4"
        >
          {/* Shipping Info */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <ShippingAddress />
          </div>

          {/* Shipping Area */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <SelectShippingArea
              shippingCharges={shippingCharges}
              shippingCostExceptFirst={0}
            />
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <PaymentMethods
              paymentMethods={paymentMethods}
              idPrefix="sales-payment"
            />
          </div>

          {/* Errors */}
          {errorMessages.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              {errorMessages.map((message, i) => (
                <div
                  key={i}
                  className="flex gap-1 items-center text-red-600 text-sm"
                >
                  <MdErrorOutline />
                  <ErrorMessage
                    message={message}
                    className="!mt-0 !text-red-600"
                  />
                </div>
              ))}
            </div>
          )}

          {Object.keys(methods.formState.errors).length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
              <MdErrorOutline className="text-lg flex-shrink-0" />
              <span>সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।</span>
            </div>
          )}

          {/* Submit */}
          <EcButton
            className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors"
            type="submit"
            loading={isLoading || isSuccess}
            disabled={isLoading || isSuccess}
            loadingText="অর্ডার প্রক্রিয়া হচ্ছে..."
          >
            অর্ডার নিশ্চিত করুন — &#2547;{calculatedTotal}
          </EcButton>
        </form>
      </FormProvider>

      <OrderLimit
        limitModalStatus={limitModalStatus}
        setLimitModalStatus={setLimitModalStatus}
      />
    </>
  );
};

export default SalesOrderForm;
