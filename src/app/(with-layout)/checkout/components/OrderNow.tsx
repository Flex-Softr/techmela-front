/* eslint-disable no-unused-vars */
import EcButton from "@/components/EcButton/EcButton";
import ApplyCupon from "@/components/applyCupon/ApplyCupon";
import CartTotalCalculations from "@/components/cartTotalCalculations/CartTotalCalculations";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import useCheckoutLogic from "@/hooks/useCheckoutLogic";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import { MdErrorOutline } from "react-icons/md";
import PaymentMethods from "./PaymentMethods";

const OrderNow = ({
  shippingCharges,
  errorMessages,
  // handleOrder removed
  isLoading,
  totalCost,
  costLoading,
  isSuccess,
  paymentMethods,
  children,
}: {
  shippingCharges: TShippingCharges[];
  errorMessages: string[];
  handleOrder?: () => Promise<void>; // kept optional in type for now to avoid breaking parent if not updated perfectly, but unused
  isLoading?: boolean;
  totalCost?: number;
  costLoading?: boolean;
  isSuccess?: boolean;
  paymentMethods: TPaymentMethod[];
  children?: React.ReactNode;
}) => {
  const { calculatedTotal } = useCheckoutLogic({
    totalCost,
  });

  // No local click handler needed, form submit handles it.

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
        <PaymentMethods paymentMethods={paymentMethods} />
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
        type="submit"
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
