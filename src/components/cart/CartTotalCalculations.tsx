import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "../ui/skeleton";
import { ReactNode } from "react";

const CartTotalCalculations = ({
  totalCost,
  costLoading = false,
  hideSubtotal = false,
  shippingAreaSlot,
}: {
  totalCost?: number;
  costLoading?: boolean;
  hideSubtotal?: boolean;
  shippingAreaSlot: ReactNode;
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
    <div className="space-y-3">
      {/* Subtotal Section */}
      {!hideSubtotal && (
        <div className="flex justify-between items-center py-2 text-sm text-slate-600 border-b border-slate-100">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-slate-900">
            {costLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>{totalCost} &#2547;</>
            )}
          </span>
        </div>
      )}

      {/* Shipping Method Selection */}
      {shippingAreaSlot}

      {/* Total Section */}
      <div className="flex justify-between items-center py-2 border-t border-slate-100 text-slate-800">
        <p className="font-semibold text-sm">Estimated Total</p>
        <span className="font-bold text-base text-slate-900">
          {costLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <>{totalWithoutCoupon} &#2547;</>
          )}
        </span>
      </div>

      {/* Discount Section */}
      {discount > 0 && (
        <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-100">
          <p>Coupon Discount</p>
          <span>- {discount} &#2547;</span>
        </div>
      )}

      {/* Grand Total Section */}
      {discount > 0 && (
        <div className="pt-2 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <p className="font-bold text-base text-slate-900">Grand Total (with coupon)</p>
            <span className="font-extrabold text-lg text-primary">
              {costLoading ? (
                <Skeleton className="h-5 w-[100px]" />
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
