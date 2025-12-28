/* eslint-disable no-unused-vars */
import EcButton from "@/components/EcButton/EcButton";
import ApplyCupon from "@/components/applyCupon/ApplyCupon";
import CartTotalCalculations from "@/components/cartTotalCalculations/CartTotalCalculations";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { resetCoupon } from "@/redux/features/order/couponInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import { MdErrorOutline } from "react-icons/md";
import PaymentsGateway from "./paymentGateway/PaymentsGateway";

const OrderNow = ({
  shippingCharges,
  errorMessages,
  handleOrder,
  isLoading,
  totalCost,
  costLoading,
  handleUltimateTotalCost,
  isSuccess,
  paymentMethods,
  children,
}: {
  shippingCharges: TShippingCharges[];
  errorMessages: string[];
  handleOrder: () => Promise<void>;
  isLoading?: boolean;
  totalCost?: number;
  costLoading?: boolean;
  isSuccess?: boolean;
  handleUltimateTotalCost: (ultimateTotalCost: number) => void;
  paymentMethods: TPaymentMethod[];
  children?: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const selectedShipping = useAppSelector((state) => state.shippingClass);
  const couponInfo = useAppSelector((state) => state.coupon);

  const { couponDiscount, cost, shippingChange } = couponInfo;
  const totalWithoutCoupon = Math.floor(
    (totalCost || 0) + (selectedShipping.amount || 0)
  );
  // Calculate coupon discount
  const discount = couponDiscount ?? 0;
  // const applicableDiscount =
  //   discount > couponInfo.maxDiscountAmount
  //     ? couponInfo.maxDiscountAmount
  //     : discount;

  const ultimateTotalCost = (cost ?? 0) - discount + (shippingChange ?? 0);
  const calculatedTotal = couponDiscount
    ? ultimateTotalCost
    : totalWithoutCoupon;
  handleUltimateTotalCost(calculatedTotal);
  const handleOrderClick = async () => {
    await handleOrder();
    dispatch(resetCoupon());
  };

  return (
    <Box className="bg-white p-4">
      <BoxHeading>Product Details</BoxHeading>

      {children}

      <CartTotalCalculations
        shippingCharges={shippingCharges}
        totalCost={totalCost}
        costLoading={costLoading}
        hideSubtotal={true}
      />
      <div className="order-3 lg:order-4">
        <PaymentsGateway
          paymentMethods={paymentMethods}
          totalCost={calculatedTotal}
        />
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

      {/* Order Now Button with ultimateTotalCost */}
      <EcButton
        className="w-full font-bold text-white mt-2"
        variant="secondary"
        onClick={handleOrderClick} // Use the new handler
        loading={isLoading || isSuccess}
        disabled={isLoading || isSuccess}
        loadingText="Creating order"
      >
        ORDER NOW Tk. {calculatedTotal}
      </EcButton>
    </Box>
  );
};

export default OrderNow;
