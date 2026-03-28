"use client";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { setShipping } from "@/redux/features/shippingClasses/shippingClass";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TShippingCharges from "@/types/shippingCharge";
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
    <Box className="px-0 md:py-2 lg:pb-6">
      <BoxHeading>ডেলিভারি এলাকা</BoxHeading>
      <div className="space-y-2">
        {shippingCharges?.map((item) => (
          <div
            key={item?._id}
            className={`flex items-center p-3 rounded-md border transition-all cursor-pointer ${
              selectedShipping._id === item?._id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/30"
            }`}
            onClick={() => handleShippingChargeChange(item?._id, item?.amount)}
          >
            <input
              type="radio"
              id={item?._id}
              name="shipping_name"
              value={item?._id}
              checked={selectedShipping._id === item?._id}
              onChange={() =>
                handleShippingChargeChange(item?._id, item?.amount)
              }
              className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
            />
            <label
              htmlFor={item?._id}
              className="ml-3 flex-grow flex justify-between items-center cursor-pointer select-none"
            >
              <span className="font-semibold text-sm">{item?.name}</span>
              <span className="font-bold text-sm text-primary">
                {item.amount} &#2547;
              </span>
            </label>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SelectShippingMethod;
