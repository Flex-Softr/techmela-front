"use client";
import { ChangeEvent } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

type TProps = {
  quantity: number;
  // eslint-disable-next-line no-unused-vars
  setQuantity: (quantity: number) => void;
  // eslint-disable-next-line no-unused-vars
  callBack?: (num: number) => Promise<void>;
};

const Quantity = ({ quantity, setQuantity, callBack }: TProps) => {
  const handleIncrement = async () => {
    const newQuantity = (quantity || 0) + 1;
    setQuantity(newQuantity);
    if (callBack) {
      await callBack(newQuantity);
    }
  };
  const handleDecrement = async () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (callBack) {
      await callBack(newQuantity);
    }
  };

  return (
    <div className="flex justify-center items-center md:gap-3 gap-1.5">
      <button
        onClick={handleDecrement}
        disabled={quantity == 1 ? true : false}
        className="xms:text-sm xls:text-base sm:text-lg md:text-xl hover:bg-slate-100 px-1.5 md:px-2 py-1 rounded text-slate-700 bg-red-50"
      >
        <FiMinus />
      </button>
      <input
        type="number"
        min={1}
        max={9999}
        value={quantity || ""}
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          const value = parseInt(e.target.value, 10);
          const maxValue = 9999;
          let newQuantity = 9999;
          if (!isNaN(value) && value > maxValue) {
            setQuantity(maxValue);
            newQuantity = maxValue;
          } else {
            newQuantity = Math.max(1, value);
            setQuantity(newQuantity);
            // setQuantity(Math.max(1, value));
          }
          if (callBack) {
            await callBack(newQuantity);
          }
        }}
        className="text-base sm:text-lg border border-slate-200 text-center w-[28px] md:w-[40px] h-[28px] md:h-[32px] rounded focus:outline-slate-100  [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-medium text-slate-800"
      />
      <button
        onClick={handleIncrement}
        className="xms:text-sm xls:text-base sm:text-lg md:text-xl hover:bg-slate-100 px-1.5 md:px-2 py-1 rounded text-slate-700 bg-red-50"
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default Quantity;
