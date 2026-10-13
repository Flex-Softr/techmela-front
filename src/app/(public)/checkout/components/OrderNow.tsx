"use client";
import ApplyCupon from "@/app/(public)/checkout/components/ApplyCupon";
import CartTotalCalculations from "@/components/cart/CartTotalCalculations";
import EcButton from "@/components/shared/EcButton/EcButton";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";
import { ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

const OrderNow = ({
  errorMessages,
  isLoading,
  totalCost,
  costLoading,
  isSuccess,
  children,
  paymentMethodsMobileSlot,
  shippingAreaSlot,
}: {
  errorMessages: string[];
  isLoading?: boolean;
  totalCost?: number;
  costLoading?: boolean;
  isSuccess?: boolean;
  children?: React.ReactNode;
  paymentMethodsMobileSlot: ReactNode;
  shippingAreaSlot: ReactNode;
}) => {
  const { calculatedTotal } = useCheckoutLogic({
    totalCost,
  });
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <ShoppingBag className="size-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            অর্ডারের সারসংক্ষেপ
          </h2>
          <p className="text-xs text-slate-500">
            পণ্য, ডেলিভারি চার্জ ও মোট মূল্য যাচাই করুন
          </p>
        </div>
      </div>

      <div className="space-y-3">{children}</div>

      <CartTotalCalculations
        totalCost={totalCost}
        costLoading={costLoading}
        hideSubtotal={true}
        shippingAreaSlot={shippingAreaSlot}
      />

      <div className="order-3 lg:order-4 lg:hidden">
        {paymentMethodsMobileSlot}
      </div>

      {/* Apply Coupon Section */}
      <div className="pt-1">
        <ApplyCupon />
      </div>

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <div className="space-y-1">
          {errorMessages.map((message, index) => (
            <div
              key={index}
              className="flex gap-2 items-center text-destructive text-sm bg-destructive/10 p-2.5 rounded-xl border border-destructive/20"
            >
              <MdErrorOutline className="shrink-0 text-base" />
              <ErrorMessage message={message} className="!mt-0 font-medium" />
            </div>
          ))}
        </div>
      )}

      {/* Validation Error Message */}
      {Object.keys(errors).length > 0 && (
        <div className="py-2.5 px-3 bg-destructive/10 border border-destructive/25 rounded-xl text-destructive font-medium text-xs sm:text-sm flex items-center gap-2">
          <MdErrorOutline className="text-base shrink-0" />
          <span>অনুগ্রহ করে ডেলিভারির প্রয়োজনীয় তথ্যগুলো সঠিকভাবে পূরণ করুন।</span>
        </div>
      )}

      {/* Order Now Button with calculatedTotal */}
      <EcButton
        className="w-full font-bold text-white bg-primary hover:bg-primary/95 text-base sm:text-lg h-12 sm:h-13 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between px-6 mt-3"
        type="submit"
        loading={isLoading || isSuccess}
        disabled={isLoading || isSuccess}
        loadingText="অর্ডার কনফার্ম হচ্ছে..."
      >
        <span>অর্ডার কনফার্ম করুন</span>
        <span className="font-extrabold">&#2547;{calculatedTotal}</span>
      </EcButton>

      {/* Trust & Assurance Badges */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-primary shrink-0" />
          <span>১০০% অরিজিনাল পণ্য</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="size-3.5 text-primary shrink-0" />
          <span>ক্যাশ অন ডেলিভারি</span>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
