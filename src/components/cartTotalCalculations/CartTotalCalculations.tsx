import { TRootState } from "@/types/rootState";
import TShippingCharges from "@/types/shippingCharge";
import { useSelector } from "react-redux";
import SelectShippingMethod from "../selectShippingMethod/SelectShippingMethod";
import { Skeleton } from "../ui/skeleton";

const CartTotalCalculations = ({
  shippingCharges,
  totalCost,
  costLoading = false,
}: {
  shippingCharges?: TShippingCharges[];
  totalCost?: number;
  costLoading?: boolean;
}) => {
  const selectedShipping = useSelector(
    (state: TRootState) => state.shippingClass
  );

  const couponInfo = useSelector((state: TRootState) => state.coupon);
  const { couponDiscount, cost, shippingChange } = couponInfo;
  const totalWithoutCoupon = Math.floor(
    (totalCost || 0) + (selectedShipping.amount || 0)
  );
  // Calculate coupon discount
  const discount = couponDiscount;
  // const applicableDiscount =
  //   discount > couponInfo.maxDiscountAmount
  //     ? couponInfo.maxDiscountAmount
  //     : discount;

  const ultimateTotalCost = cost - discount + shippingChange;

  return (
    <div>
      {/* Subtotal Section */}
      <div className="flex gap-2 justify-between items-center py-5 px-2 border-b-2">
        <span className="font-bold">Subtotal</span>
        <span className="text-sm font-semibold">
          {costLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <>{totalCost} &#2547;</>
          )}
        </span>
      </div>

      {/* Shipping Method Selection */}
      <SelectShippingMethod shippingCharges={shippingCharges} />

      {/* Total Section */}
      <div className="flex justify-between py-3 px-2">
        <p className="font-bold">Total</p>
        <span className="font-bold">
          {costLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <>{totalWithoutCoupon} &#2547;</>
          )}
        </span>
      </div>

      {/* Discount Section */}
      {discount > 0 && (
        <div className="flex justify-between pt-3 pb-1 px-2">
          <p className="font-bold text-primary">Coupon Discount</p>
          <span className="text-sm font-semibold text-primary">
            - {discount} &#2547;
          </span>
        </div>
      )}

      {/* Grand Total Section */}
      {discount > 0 && (
        <div>
          <hr className="py-1 border-t-2 border-gray-200 w-full" />
          <div className="flex justify-between pb-3 pt-1 px-2">
            <p className="font-bold">Grand Total (with coupon)</p>
            <span className="font-bold">
              {costLoading ? (
                <Skeleton className="h-4 w-[100px]" />
              ) : (
                <>{ultimateTotalCost} &#2547;</>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTotalCalculations;
