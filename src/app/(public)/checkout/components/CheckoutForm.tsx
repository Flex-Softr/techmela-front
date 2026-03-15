"use client";
import CheckoutCartItems from "@/components/cart/CheckoutCartItems";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCart from "@/hooks/useCart";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";
import useOrderSubmit from "@/hooks/useOrderSubmit";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import OrderNow from "./OrderNow";
import ShippingAddress from "./ShippingAddress";

type TCheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  email?: string;
  notes?: string;
  paymentMethod: string; // ID of the payment method
  paymentDetails?: Record<string, string | number>;
};

import { ReactNode } from "react";

const CheckoutForm = ({
  shippingAreaSlot,
  paymentMethodsDesktopSlot,
  paymentMethodsMobileSlot,
}: {
  shippingAreaSlot: ReactNode;
  paymentMethodsDesktopSlot: ReactNode;
  paymentMethodsMobileSlot: ReactNode;
}) => {
  const { totalCost, isLoading: cartCostLoading } = useCart();

  const methods = useForm<TCheckoutFormData>({
    mode: "all",
  });

  const { calculatedTotal } = useCheckoutLogic({
    totalCost,
    shippingCostExceptFirst: 1000,
  });

  const {
    handlePlaceOrder,
    isLoading,
    errorMessages,
    isSuccess,
    limitModalStatus,
    setLimitModalStatus,
  } = useOrderSubmit({
    calculatedTotal,
  });

  useEffect(() => {
    gtmEventHandler({
      event: "initiate_checkout",
    });
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handlePlaceOrder)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
            <div>
              <ShippingAddress />
              <div className="hidden lg:block mt-3 lg:mt-5 lg:border lg:rounded-md">
                {paymentMethodsDesktopSlot}
              </div>
            </div>
            <div className="order-4 lg:order-3">
              <OrderNow
                costLoading={cartCostLoading}
                errorMessages={errorMessages}
                isLoading={isLoading}
                isSuccess={isSuccess}
                totalCost={totalCost}
                paymentMethodsMobileSlot={paymentMethodsMobileSlot}
                shippingAreaSlot={shippingAreaSlot}
              >
                <CheckoutCartItems />
              </OrderNow>
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

export default CheckoutForm;
