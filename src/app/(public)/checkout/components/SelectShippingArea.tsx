"use client";
import { setShipping } from "@/redux/features/shippingClasses/shippingClass";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TShippingCharges from "@/types/shippingCharge";
import { Truck } from "lucide-react";
import { useEffect } from "react";

const SelectShippingMethod = ({
  shippingCharges,
}: {
  shippingCharges?: TShippingCharges[];
}) => {
  const selectedShipping = useAppSelector((state) => state.shippingClass);
  const dispatch = useAppDispatch();

  const handleShippingChargeChange = (id: string, amount: number) => {
    dispatch(setShipping({ _id: id, amount }));
  };

  useEffect(() => {
    if (
      !selectedShipping._id &&
      shippingCharges &&
      shippingCharges.length > 0
    ) {
      dispatch(
        setShipping({
          _id: shippingCharges[0]?._id,
          amount: shippingCharges[0]?.amount,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShipping._id, shippingCharges]);

  return (
    <div className="my-3 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="size-4 text-primary" />
          <span className="text-sm font-bold text-slate-800">Delivery Area</span>
        </div>
        <span className="text-xs text-slate-500 font-medium">Select location</span>
      </div>

      <div className="space-y-2">
        {shippingCharges?.map((item) => {
          const isSelected = selectedShipping._id === item?._id;
          return (
            <div
              key={item?._id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-white shadow-xs ring-2 ring-primary/20"
                  : "border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300"
              }`}
              onClick={() => handleShippingChargeChange(item?._id, item?.amount)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id={item?._id}
                  name="shipping_name"
                  value={item?._id}
                  checked={isSelected}
                  onChange={() =>
                    handleShippingChargeChange(item?._id, item?.amount)
                  }
                  className="w-4 h-4 text-primary accent-[#0F7641] focus:ring-primary cursor-pointer shrink-0"
                />
                <label
                  htmlFor={item?._id}
                  className="font-semibold text-sm text-slate-800 cursor-pointer select-none"
                >
                  {item?.name}
                </label>
              </div>
              <span
                className={`font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {item.amount} &#2547;
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectShippingMethod;
