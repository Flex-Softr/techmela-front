import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { setShipping } from "@/redux/features/shippingClasses/shippingClass";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TShippingCharges from "@/types/shippingCharge";
import { useEffect } from "react";

const SelectShippingMethod = ({
  shippingCharges,
  shippingCostExceptFirst,
}: {
  shippingCharges?: TShippingCharges[];
  shippingCostExceptFirst: number;
}) => {
  const selectedShipping = useAppSelector((state) => state.shippingClass);
  const dispatch = useAppDispatch();

  const handleShippingChargeChange = (id: string, amount: number) => {
    dispatch(setShipping({ _id: id, amount }));
  };
  useEffect(() => {
    if (!selectedShipping._id) {
      dispatch(
        setShipping({
          _id: shippingCharges![0]?._id,
          amount: shippingCharges![0]?.amount,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShipping._id]);
  return (
    <Box className="px-2 md:py-2">
      <BoxHeading>Shipping Area</BoxHeading>
      <div className="space-y-2">
        {shippingCharges?.map((item) => (
          <div
            key={item?._id}
            className={`flex items-center p-3 rounded-md border transition-all cursor-pointer ${
              selectedShipping._id === item?._id
                ? "border-secondary bg-secondary/5"
                : "border-gray-200 hover:border-secondary/30"
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
              className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
            />
            <label
              htmlFor={item?._id}
              className="ml-3 flex-grow flex justify-between items-center cursor-pointer select-none"
            >
              <span className="font-semibold text-sm">{item?.name}</span>
              <span className="font-bold text-sm text-secondary">
                {item.amount + shippingCostExceptFirst} &#2547;
              </span>
            </label>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SelectShippingMethod;
