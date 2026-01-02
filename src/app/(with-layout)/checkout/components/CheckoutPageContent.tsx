"use client";
import CheckoutCartItems from "@/components/cartItems/CheckoutCartItems";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCart from "@/hooks/useCart";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";
import useOrderSubmit from "@/hooks/useOrderSubmit";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ShippingAddress from "../components/ShippingAddress";
import OrderNow from "./OrderNow";

type TCheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  email?: string;
  notes?: string;
  paymentMethod: string; // ID of the payment method
  paymentDetails?: Record<string, string | number>;
};

const CheckoutPageContent = ({
  shippingCharges,
  paymentMethods,
}: {
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
}) => {
  const { totalCost, isLoading: cartCostLoading } = useCart();

  const methods = useForm<TCheckoutFormData>({
    mode: "all",
  });

  const { calculatedTotal } = useCheckoutLogic({
    totalCost,
  });

  const {
    handlePlaceOrder,
    isLoading,
    errorMessages,
    isSuccess,
    limitModalStatus,
    setLimitModalStatus,
  } = useOrderSubmit({
    paymentMethods,
    calculatedTotal,
  });

  useEffect(() => {
    gtmEventHandler("initiate_checkout", {});
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handlePlaceOrder)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
            <div>
              <ShippingAddress />
            </div>
            <div className="order-4 lg:order-3">
              <OrderNow
                costLoading={cartCostLoading}
                errorMessages={errorMessages}
                isLoading={isLoading}
                isSuccess={isSuccess}
                shippingCharges={shippingCharges}
                totalCost={totalCost}
                paymentMethods={paymentMethods}
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

export default CheckoutPageContent;
