"use client";

import PaymentMethods from "@/app/(public)/checkout/components/PaymentMethods";
import SelectShippingArea from "@/app/(public)/checkout/components/SelectShippingArea";
import ShippingAddress from "@/app/(public)/checkout/components/ShippingAddress";
import EcButton from "@/components/shared/EcButton/EcButton";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";

import useSalesOrderSubmit from "@/hooks/useSalesOrderSubmit";
import { TPaymentMethod } from "@/types/paymentMethod";
import { Tvariations } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdCall, MdErrorOutline, MdShoppingBag } from "react-icons/md";
import Image from "next/image";
import {
  FaClock,
  FaMoneyBillWave,
  FaTruck,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { TSingleProduct } from "@/types/products/singleProduct";

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
  thumbnailSrc?: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  bookDetails: {
    title: string;
    highlights: { icon: string; title: string; description: string }[];
    pages: number | string;
    scholars: number | string;
    testimonials: unknown[];
  };
  product: TSingleProduct | null;
  salePrice: number;
};

const SalesOrderForm = ({
  shippingCharges,
  paymentMethods,
  productTitle,
  cartItems,
  fallbackPrice = 0,
  thumbnailSrc,
  quantity,
  setQuantity,
  bookDetails,
  product,
  salePrice,
}: Props) => {
  const methods = useForm<TCheckoutFormData>({ mode: "all" });

  const totalCost = useMemo(() => {
    if (cartItems.length === 0) return fallbackPrice;
    return cartItems.reduce((acc, item) => {
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Left Column: Form Inputs */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <ShippingAddress />
            </div>

            {/* Shipping Area */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <SelectShippingArea
                shippingCharges={shippingCharges}
                shippingCostExceptFirst={0}
              />
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <PaymentMethods
                paymentMethods={paymentMethods}
                idPrefix="sales-payment"
              />
            </div>
          </div>

          {/* Right Column: Summary & Final Action */}
          <div className="space-y-6 sticky top-24">
            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                <MdShoppingBag className="text-primary" /> আপনার অর্ডার
              </h3>
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm text-[0]">
                  <Image
                    src={thumbnailSrc ?? "/placeholder.jpg"}
                    alt="Thumbnail"
                    width={80}
                    height={112}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-grow py-1">
                  <h4 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                    {product?.title || bookDetails.title}
                  </h4>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-sm text-gray-500 font-bold">
                      পরিমাণ:
                    </span>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm scale-90 origin-left">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1.5 flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-200"
                      >
                        <FaMinus className="text-gray-600 text-xs" />
                      </button>
                      <span className="w-10 text-center text-base font-bold text-gray-800 py-1">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1.5 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-200"
                      >
                        <FaPlus className="text-gray-600 text-xs" />
                      </button>
                    </div>
                  </div>
                  <p className="text-primary font-black mt-2 text-2xl">
                    &#2547;{salePrice * quantity}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 space-y-4">
                <div className="flex items-center gap-3 text-base text-gray-700 font-medium">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FaTruck className="text-primary" />
                  </div>
                  দ্রুত হোম ডেলিভারি
                </div>
                <div className="flex items-center gap-3 text-base text-gray-700 font-medium">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FaMoneyBillWave className="text-primary" />
                  </div>
                  ক্যাশ অন ডেলিভারি
                </div>
                <div className="flex items-center gap-3 text-base text-gray-700 font-medium">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FaClock className="text-primary" />
                  </div>
                  ২৪-৭২ ঘণ্টার মধ্যে ডেলিভারি
                </div>
              </div>
            </div>

            {/* Errors */}
            {(errorMessages.length > 0 ||
              Object.keys(methods.formState.errors).length > 0) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
                {errorMessages.map((message, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center text-red-600 font-medium"
                  >
                    <MdErrorOutline className="text-lg flex-shrink-0" />
                    <ErrorMessage
                      message={message}
                      className="!mt-0 !text-red-600"
                    />
                  </div>
                ))}
                {Object.keys(methods.formState.errors).length > 0 && (
                  <div className="flex gap-2 items-center text-red-600 font-medium font-bengali">
                    <MdErrorOutline className="text-lg flex-shrink-0" />
                    <span>সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <EcButton
              className="w-full py-8 text-2xl font-black bg-primary hover:bg-primary/95 text-white rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] font-bengali"
              type="submit"
              loading={isLoading || isSuccess}
              disabled={isLoading || isSuccess}
              loadingText="অর্ডার প্রক্রিয়া হচ্ছে..."
            >
              অর্ডার নিশ্চিত করুন — &#2547;{calculatedTotal}
            </EcButton>

            <div className="bg-primary p-7 rounded-3xl text-white shadow-xl shadow-primary/20">
              <h4 className="font-bold text-xl mb-2 text-center">
                সাহায্য প্রয়োজন?
              </h4>
              <p className="text-sm text-white/80 mb-5 text-center px-4">
                যেকোনো প্রয়োজনে আমাদের সরাসরি কল করুন
              </p>
              <a
                href="tel:+8801602431167"
                className="flex items-center justify-center gap-3 bg-white text-primary font-black py-4 rounded-2xl shadow-sm hover:bg-gray-50 transition-all text-xl"
              >
                <MdCall className="text-2xl" /> ০১৬০২-৪৩১১৬৭
              </a>
            </div>
          </div>
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
