"use client";
import CheckoutCartItems from "@/components/cartItems/CheckoutCartItems";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import useCart from "@/hooks/useCart";
import PEventIdGenerator from "@/lib/ec/PEventIdGenerator";
import createOrderFN from "@/lib/ec/createOrderFN";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import {
  setPaymentInfo,
  setPaymentInfoError,
} from "@/redux/features/order/paymentInfo";
import {
  setShippingInfo,
  setShippingInfoError,
} from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShippingAddress from "../components/ShippingAddress";
import OrderNow from "./OrderNow";

const CheckoutPageContent = ({
  shippingCharges,
  paymentMethods,
}: {
  shippingCharges: TShippingCharges[];
  paymentMethods: TPaymentMethod[];
}) => {
  const [limitModalStatus, setLimitModalStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: cartData, totalCost, isLoading: cartCostLoading } = useCart();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    const savedShippingInfo = JSON.parse(
      localStorage.getItem("shippingAddress") || "{}"
    );

    dispatch(setPaymentInfo({ selectedPaymentMethod: paymentMethods[0] }));
    dispatch(setPaymentInfoError({ errors: null }));

    return () => {
      dispatch(setShippingInfo(savedShippingInfo));
      dispatch(setShippingInfoError({ errors: null }));
    };
  }, [dispatch, paymentMethods]);

  const shippingInfo = useAppSelector((state) => state.shippingInfo);
  const paymentInfo = useAppSelector((state) => state.paymentInfo);
  const shippingClass = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);

  const handleOrder = async () => {
    const eventId = PEventIdGenerator("P_");
    const orderData = {
      payment: {
        paymentMethod: paymentInfo?.data?.selectedPaymentMethod?._id,
        paymentDetails: paymentInfo?.data?.paymentDetails,
      },
      shippingCharge: shippingClass._id,
      shipping: {
        fullName: shippingInfo?.data?.fullName,
        phoneNumber: shippingInfo?.data?.phoneNumber,
        fullAddress: shippingInfo?.data?.fullAddress,
        email: shippingInfo?.data?.email || undefined,
      },
      orderNotes: shippingInfo?.data?.notes,
      eventId,
      orderSource: {
        name: "Website",
        url: window?.location?.href,
      },
      coupon: couponInfo.coupon === null ? undefined : couponInfo.coupon,
    };

    await createOrderFN({
      createOrder,
      setErrorMessages,
      shippingInfo,
      paymentInfo,
      product: cartData?.data,
      totalCost,
      router,
      orderData,
      setIsSuccess,
      setLimitModalStatus,
    });
  };

  const handleUltimateTotalCost = () => {
    // This function is required by OrderNow but we don't use the value here
    // so we do nothing. The state was removed to fix 'unused variable' error.
    // If you need to debug, you can console.log(ultimateTotalCost);
  };
  useEffect(() => {
    gtmEventHandler("initiate_checkout", {});
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        <div>
          <ShippingAddress />
        </div>
        <div className="order-4 lg:order-3">
          {/* <Box className="mt-4">
          <BoxHeading>Added items</BoxHeading>
          <CheckoutCartItems />
        </Box> */}
          <OrderNow
            handleOrder={handleOrder}
            costLoading={cartCostLoading}
            errorMessages={errorMessages}
            isLoading={isLoading}
            isSuccess={isSuccess}
            shippingCharges={shippingCharges}
            totalCost={totalCost}
            handleUltimateTotalCost={handleUltimateTotalCost}
            paymentMethods={paymentMethods}
          >
            <CheckoutCartItems />
          </OrderNow>
        </div>
      </div>
      <OrderLimit
        limitModalStatus={limitModalStatus}
        setLimitModalStatus={setLimitModalStatus}
      />
    </>
  );
};

export default CheckoutPageContent;
