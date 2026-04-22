"use client";
import CheckoutCartItems from "@/components/cart/CheckoutCartItems";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCart from "@/hooks/useCart";
import useOrderSubmit from "@/hooks/useOrderSubmit";
import { TCartItemData } from "@/types/cart";
import { ReactNode, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import eventHandler from "@/tracking/eventHandler";
import OrderNow from "./OrderNow";
import ShippingAddress from "./ShippingAddress";
import { TShippingInfo } from "@/types/order/shippingInfo";
import BdAddress from "@/utilities/bdAddress/bdAddress";

type TCheckoutFormData = {
  shipping: TShippingInfo;
  paymentMethod: string; // ID of the payment method
  paymentDetails?: Record<string, string | number>;
};

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

  const { data: cartData } = useCart();
  const {
    handlePlaceOrder,
    isLoading,
    errorMessages,
    isSuccess,
    limitModalStatus,
    setLimitModalStatus,
  } = useOrderSubmit({
    totalCost,
    productName: cartData?.data?.[0]?.product?.title,
    productCategory: cartData?.data?.[0]?.product?.category?.[0]?.name,
  });

  const initiateCheckoutTracked = useRef(false);

  useEffect(() => {
    const shipping = methods.getValues("shipping");
    const isCheckTracked =
      cartData?.data?.length > 0 &&
      !initiateCheckoutTracked.current &&
      shipping?.fullName &&
      shipping?.phoneNumber &&
      shipping?.division &&
      shipping?.district &&
      shipping?.upazila;
    if (isCheckTracked) {
      initiateCheckoutTracked.current = true;

      const divisionName = BdAddress.divisionNameById(
        shipping?.division,
        "en"
      ).name;
      const districtName = BdAddress.districtNameById(
        shipping?.district,
        "en"
      ).name;

      eventHandler({
        event_name: "initiate_checkout",
        fn: shipping?.fullName || undefined,
        ph: shipping?.phoneNumber || undefined,
        em: shipping?.email || undefined,
        st: divisionName || undefined,
        ct: districtName || undefined,
        upazila_id: shipping?.upazila || undefined,
        content_ids: cartData.data.map((item: TCartItemData) =>
          item.variation?._id
            ? `${item.product?._id}-${item.variation._id}`
            : item.product?._id
        ),
        content_type: "product",
        value: totalCost,
        contents: cartData.data.map((item: TCartItemData) => ({
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
        })),
        //  content_name: productTitle,
        //   content_category: product?.category?.[0]?.name,
        //   shipping: shippingChange ?? undefined,
      });
    }
  }, [cartData?.data, totalCost, methods]);

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
