"use client";
import ApplyCupon from "@/app/(public)/checkout/components/ApplyCupon";
import CartTotalCalculations from "@/components/cart/CartTotalCalculations";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";
import { useFormContext } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { ShoppingBag } from "lucide-react";
import { ReactNode } from "react";
import EcButton from "@/components/shared/EcButton/EcButton";

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

  // No local click handler needed, form submit handles it.

  return (
    <Box className="bg-white px-4 py-2 border">
      <BoxHeading className="flex items-center gap-2">
        <ShoppingBag className="text-lg text-primary" />
        <span className="text-lg">অর্ডারের সারসংক্ষেপ</span>
      </BoxHeading>

      {children}

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
      <div className="py-2">
        <ApplyCupon />
      </div>

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <div className="py-1">
          {errorMessages.map((message, index) => (
            <div
              key={index}
              className="flex gap-1 items-center text-red-600 text-sm"
            >
              <MdErrorOutline />
              <ErrorMessage message={message} className="!mt-0" />
            </div>
          ))}
        </div>
      )}

      {/* Validation Error Message */}
      {Object.keys(errors).length > 0 && (
        <div className="py-2 px-3 mb-2 bg-red-50 border border-red-200 rounded text-red-600 font-medium text-sm flex items-center gap-2">
          <MdErrorOutline className="text-lg flex-shrink-0" />
          <span>প্রয়োজনীয় তথ্যগুলো সঠিকভাবে পূরণ করুন।</span>
        </div>
      )}

      {/* Order Now Button with ultimateTotalCost */}
      <EcButton
        className="w-full font-bold text-white mt-2 flex items-center gap-2 lg:gap-4"
        type="submit"
        loading={isLoading || isSuccess}
        disabled={isLoading || isSuccess}
        loadingText="অর্ডার করা হচ্ছে..."
      >
        <span className="text-lg">অর্ডার করুন </span>
        <span className="text-lg">{calculatedTotal} Tk.</span>
      </EcButton>
    </Box>
  );
};

export default OrderNow;
