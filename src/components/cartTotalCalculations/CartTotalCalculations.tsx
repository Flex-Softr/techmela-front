import { useAppSelector } from "@/redux/hooks";
import TShippingCharges from "@/types/shippingCharge";
import SelectShippingMethod from "../../app/(public)/checkout/components/SelectShippingArea";
import { Skeleton } from "../ui/skeleton";

const CartTotalCalculations = ({
  shippingCharges,
  totalCost,
  costLoading = false,
  hideSubtotal = false,
  shippingCostExceptFirst,
}: {
  shippingCharges?: TShippingCharges[];
  totalCost?: number;
  costLoading?: boolean;
  hideSubtotal?: boolean;
  shippingCostExceptFirst: number;
}) => {
  const selectedShipping = useAppSelector((state) => state.shippingClass);

  const couponInfo = useAppSelector((state) => state.coupon);
  const { couponDiscount, cost, shippingChange } = couponInfo;
  const totalWithoutCoupon = Math.floor(
    (totalCost || 0) + (selectedShipping.amount || 0)
  );
  /* calculate coupon discount */
  const discount = couponDiscount || 0;
  // const applicableDiscount =
  //   discount > couponInfo.maxDiscountAmount
  //     ? couponInfo.maxDiscountAmount
  //     : discount;

  const ultimateTotalCost = (cost || 0) - discount + (shippingChange || 0);

  return (
    <div>
      {/* Subtotal Section */}
      {!hideSubtotal && (
        <div className="flex gap-2 justify-between items-center py-2 px-2 border-b">
          <span className="font-bold">Subtotal</span>
          <span className="text-sm font-semibold">
            {costLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>{totalCost} &#2547;</>
            )}
          </span>
        </div>
      )}

      {/* Shipping Method Selection */}
      <SelectShippingMethod
        shippingCharges={shippingCharges}
        shippingCostExceptFirst={shippingCostExceptFirst}
      />

      {/* Total Section */}
      <div className="flex justify-between mb-4 px-2">
        <p className="font-bold text-lg">Total</p>
        <span className="font-bold">
          {costLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <>{totalWithoutCoupon + shippingCostExceptFirst} &#2547;</>
          )}
        </span>
      </div>

      {/* Discount Section */}
      {discount > 0 && (
        <div className="flex justify-between py-1 px-2">
          <p className="font-bold text-primary">Coupon Discount</p>
          <span className="text-sm font-semibold text-primary">
            - {discount} &#2547;
          </span>
        </div>
      )}

      {/* Grand Total Section */}
      {discount > 0 && (
        <div>
          <hr className="py-1 border-t border-gray-200 w-full" />
          <div className="flex justify-between pb-1 pt-1 px-2">
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
