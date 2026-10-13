"use client";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent } from "react";

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
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (callBack) {
      await callBack(newQuantity);
    }
  };

  return (
    <div className="inline-flex items-center bg-slate-50 border border-slate-200/90 rounded-lg p-0.5 shadow-3xs hover:border-slate-300 transition-colors">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="size-6 sm:size-7 rounded-md bg-white hover:bg-slate-100 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white flex items-center justify-center border border-slate-200/80 shadow-3xs transition-all active:scale-95"
        aria-label="পরিমাণ কমান"
      >
        <Minus className="size-3 sm:size-3.5" strokeWidth={2.5} />
      </button>
      <input
        type="number"
        min={1}
        max={9999}
        value={quantity || 1}
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          const value = parseInt(e.target.value, 10);
          const maxValue = 9999;
          let newQuantity = 1;
          if (!isNaN(value)) {
            newQuantity = Math.min(maxValue, Math.max(1, value));
          }
          setQuantity(newQuantity);
          if (callBack) {
            await callBack(newQuantity);
          }
        }}
        className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm text-slate-900 bg-transparent focus:outline-none [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none select-all"
        aria-label="পণ্যের পরিমাণ"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="size-6 sm:size-7 rounded-md bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/80 shadow-3xs transition-all active:scale-95"
        aria-label="পরিমাণ বাড়ান"
      >
        <Plus className="size-3 sm:size-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Quantity;
