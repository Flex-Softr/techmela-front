"use client";

import PaymentMethods from "@/app/(public)/checkout/components/PaymentMethods";
import SelectShippingArea from "@/app/(public)/checkout/components/SelectShippingArea";
import ShippingAddress from "@/app/(public)/checkout/components/ShippingAddress";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import EcButton from "@/components/shared/EcButton/EcButton";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";

import useSalesOrderSubmit from "@/hooks/useSalesOrderSubmit";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct, Tvariations } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdCall, MdErrorOutline, MdShoppingBag } from "react-icons/md";

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
    pages: string | number;
    scholars: string | number;
    testimonials: unknown[];
  };
  product: TSingleProduct | null;
  salePrice: number;
  regularPrice: number;
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
  regularPrice,
}: Props) => {
  const methods = useForm<TCheckoutFormData>({ mode: "all" });

  const totalCost = useMemo(() => {
    if (cartItems.length === 0) return fallbackPrice || salePrice;
    return cartItems.reduce((acc, item) => {
      const price =
        item.variation?.price?.salePrice ??
        item.variation?.price?.regularPrice ??
        (salePrice || fallbackPrice);
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems, fallbackPrice, salePrice]);

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
    lpNo: "LP-MTP-01",
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
        >
          {/* Left Column: Form Inputs */}
          <div className="space-y-2">
            {/* Shipping Info */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <ShippingAddress />
            </div>
            {/* Payment Methods */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <PaymentMethods
                paymentMethods={paymentMethods}
                idPrefix="sales-payment"
              />
            </div>
          </div>

          {/* Right Column: Summary & Final Action */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-white p-5 lg:p-6 rounded-[2rem] border border-emerald-100 shadow-xl shadow-emerald-900/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

              <h3 className="text-lg lg:text-xl font-black mb-4 flex items-center gap-3 text-gray-900 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MdShoppingBag className="text-primary text-xl" />
                </div>
                আপনার অর্ডার
              </h3>

              <div className="flex gap-5 mb-6 relative z-10">
                <div className="w-20 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-gray-100 p-0.5">
                  <Image
                    src={thumbnailSrc ?? "/placeholder.jpg"}
                    alt="Thumbnail"
                    width={80}
                    height={112}
                    className="w-full h-full object-cover rounded-lg"
                    unoptimized
                  />
                </div>
                <div className="flex-grow py-1 space-y-2">
                  <h4 className="font-black text-gray-900 text-sm lg:text-base leading-tight">
                    {product?.title || bookDetails.title}
                  </h4>
                  <p className="text-sm text-primary font-bold italic">
                    সীমিত অফার চলছে!
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 font-black uppercase tracking-widest">
                      পরিমাণ:
                    </span>
                    <div className="flex items-center border border-primary/10 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-primary/5">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-emerald-50 text-gray-600 transition-colors border-r border-primary/5"
                      >
                        <FaMinus className="text-[10px]" />
                      </button>
                      <span className="w-10 text-center text-sm font-black text-primary">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-emerald-50 text-gray-600 transition-colors border-l border-primary/5"
                      >
                        <FaPlus className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-primary font-black text-2xl lg:text-3xl">
                      &#2547;{salePrice * quantity}
                    </p>
                    {regularPrice > salePrice && (
                      <span className="text-base text-gray-400 line-through font-bold">
                        &#2547;{regularPrice * quantity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Shipping Area */}
              <SelectShippingArea
                shippingCharges={shippingCharges}
                shippingCostExceptFirst={0}
              />
            </div>

            {/* Errors */}
            {(errorMessages.length > 0 ||
              Object.keys(methods.formState.errors).length > 0) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2 shadow-sm animate-shake">
                {errorMessages.map((message, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-start text-red-600 font-bold text-sm"
                  >
                    <MdErrorOutline className="text-lg flex-shrink-0 mt-0.5" />
                    <ErrorMessage
                      message={message}
                      className="!mt-0 !text-red-600 font-bold text-sm"
                    />
                  </div>
                ))}
                {Object.keys(methods.formState.errors).length > 0 && (
                  <div className="flex gap-2 items-start text-red-600 font-bold text-sm">
                    <MdErrorOutline className="text-lg flex-shrink-0 mt-0.5" />
                    <span>সবগুলো তথ্য সঠিকভাবে পূরণ করুন।</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="space-y-3">
              <EcButton
                className="w-full py-6 text-xl lg:text-2xl font-black bg-primary hover:bg-primary/95 text-white rounded-full transition-all shadow-[0_15px_35px_-5px_hsla(var(--primary)/0.4)] active:scale-[0.98] font-bengali relative overflow-hidden group"
                type="submit"
                loading={isLoading || isSuccess}
                disabled={isLoading || isSuccess}
                loadingText="অর্ডার প্রক্রিয়া হচ্ছে..."
              >
                <span className="relative z-10">
                  অর্ডার কনফার্ম করুন: &#2547;{calculatedTotal}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              </EcButton>
            </div>

            {/* Help Box */}
            <div className="bg-primary/5 border border-primary/10 p-5 rounded-[2rem] text-primary relative overflow-hidden group">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>

              <div className="relative z-10 text-center">
                <h4 className="font-black text-lg mb-1 flex items-center justify-center gap-2 text-primary">
                  <MdCall /> সরাসরি কথা বলুন
                </h4>
                <p className="text-sm font-bold text-gray-500 mb-4 px-4 leading-relaxed">
                  অর্ডার করতে কোনো সমস্যা হলে নিচের নাম্বারে সরাসরি কল করুন
                </p>
                <a
                  href="tel:+8801602431167"
                  className="inline-flex items-center justify-center gap-3 bg-white text-primary font-black px-8 py-3 rounded-xl border border-primary/10 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-lg lg:text-xl"
                >
                  ০১৬০২-৪৩১১৬৭
                </a>
              </div>
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
