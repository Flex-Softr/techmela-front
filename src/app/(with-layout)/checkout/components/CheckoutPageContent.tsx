"use client";
import CartItems from "@/components/cartItems/CartItems";
import OrderLimit from "@/components/orderLimit/OrderLimit";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
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
import { TPaymentMethod } from "@/types/paymentMethod";
import { TRootState } from "@/types/rootState";
import TShippingCharges from "@/types/shippingCharge";
import gtmEventHandler from "@/utilities/GTM/gtmEventHandler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingAddress from "../components/ShippingAddress";
import OrderNow from "./OrderNow";
import PaymentsGateway from "./paymentGateway/PaymentsGateway";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [ultimateCost, setUltimateCost] = useState<number>(0);
  useEffect(() => {
    const shippingInfo = JSON.parse(
      localStorage.getItem("shippingAddress") || "{}"
    );

    dispatch(setPaymentInfo({ selectedPaymentMethod: paymentMethods[0] }));
    dispatch(setPaymentInfoError({ errors: null }));

    return () => {
      dispatch(setShippingInfo(shippingInfo));
      dispatch(setShippingInfoError({ errors: null }));
    };
  }, [dispatch, paymentMethods]);

  const shippingInfo = useSelector((state: TRootState) => state.shippingInfo);
  const paymentInfo = useSelector((state: TRootState) => state.paymentInfo);
  const shippingClass = useSelector((state: TRootState) => state.shippingClass);
  const couponInfo = useSelector((state: TRootState) => state.coupon);

  const handleOrder = async () => {
    const eventId = PEventIdGenerator("P_");
    const orderData = {
      payment: {
        paymentMethod: paymentInfo?.data?.selectedPaymentMethod?._id,
        phoneNumber: paymentInfo?.data?.phoneNumber || undefined,
        transactionId: paymentInfo?.data?.transactionId || undefined,
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
  const handleUltimateTotalCost = (ultimateTotalCost: number) => {
    // Log the ultimate total cost in the parent component
    setUltimateCost(ultimateTotalCost);
  };
  useEffect(() => {
    gtmEventHandler("initiate_checkout", {});
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Box className="col-span-1 lg:col-span-2 mt-10">
          <BoxHeading>Added items</BoxHeading>
          <CartItems />
        </Box>
        <div>
          <ShippingAddress />
        </div>
        <div className="order-4 lg:order-3">
          <OrderNow
            handleOrder={handleOrder}
            isLoading={isLoading}
            shippingCharges={shippingCharges}
            errorMessages={errorMessages}
            totalCost={totalCost}
            costLoading={cartCostLoading}
            isSuccess={isSuccess}
            handleUltimateTotalCost={handleUltimateTotalCost}
          />
        </div>
        <div className="order-3 lg:order-4">
          <PaymentsGateway
            paymentMethods={paymentMethods}
            totalCost={ultimateCost}
          />
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
