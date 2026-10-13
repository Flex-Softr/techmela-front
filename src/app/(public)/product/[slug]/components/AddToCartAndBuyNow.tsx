"use client";
import EcButton from "@/components/shared/EcButton/EcButton";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

const AddToCartAndBuyNow = ({
  quantity,
  setQuantity,
  addToCartHandler,
  isAddToCartLoading,
  isDisabled,
  disabledReason,
}: {
  addToCartHandler: () => Promise<boolean>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  isAddToCartLoading: boolean;
  isDisabled: boolean;
  disabledReason?: string;
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(String(quantity || 1));

  useEffect(() => {
    setInputValue(String(quantity || 1));
  }, [quantity]);

  const handleAddToCart = async () => {
    await addToCartHandler();
  };

  const handleBuyNow = async () => {
    const isSuccess = await addToCartHandler();
    if (isSuccess) {
      router.push("/checkout");
    }
  };

  const handleIncrement = () => {
    if (isDisabled) return;
    const next = Math.min(999, (quantity || 1) + 1);
    setQuantity(next);
    setInputValue(String(next));
  };

  const handleDecrement = () => {
    if (isDisabled || quantity <= 1) return;
    const next = Math.max(1, (quantity || 1) - 1);
    setQuantity(next);
    setInputValue(String(next));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 999) {
      setQuantity(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed < 1) {
      setQuantity(1);
      setInputValue("1");
    } else if (parsed > 999) {
      setQuantity(999);
      setInputValue("999");
    } else {
      setQuantity(parsed);
      setInputValue(String(parsed));
    }
  };

  return (
    <div className="mt-4 space-y-2.5 sm:space-y-3">
      {/* Top Action Row: Quantity + Add to Cart (Mobile) / Left half (Desktop) and Buy Now (Mobile full width / Desktop right half) */}
      <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3">
        {/* Row 1 (Mobile) / Left Column (Desktop): Quantity Stepper + Add to Cart */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto md:flex-1">
          {/* Modern Tactile Quantity Stepper */}
          <div className="inline-flex items-center bg-slate-100/90 hover:bg-slate-100 border border-slate-200/90 rounded-xl p-1 h-[42px] sm:h-[46px] shadow-2xs hover:border-slate-300 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all shrink-0">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1 || isDisabled}
              className="size-7 sm:size-8 rounded-lg bg-white hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white flex items-center justify-center border border-slate-200/80 shadow-3xs transition-all active:scale-90 shrink-0"
              title="পরিমাণ কমান"
              aria-label="পরিমাণ কমান"
            >
              <Minus className="size-3 sm:size-3.5" strokeWidth={2.5} />
            </button>
            <input
              type="number"
              min={1}
              max={999}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isDisabled}
              className="w-8 sm:w-11 text-center font-extrabold text-sm sm:text-base text-slate-900 bg-transparent focus:outline-none [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none select-all disabled:opacity-50"
              aria-label="পণ্যের পরিমাণ"
            />
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isDisabled}
              className="size-7 sm:size-8 rounded-lg bg-white hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white flex items-center justify-center border border-slate-200/80 shadow-3xs transition-all active:scale-90 shrink-0"
              title="পরিমাণ বাড়ান"
              aria-label="পরিমাণ বাড়ান"
            >
              <Plus className="size-3 sm:size-3.5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <EcButton
            className="flex-1 h-[42px] sm:h-[46px] px-2.5 sm:px-4 text-primary-foreground font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
            onClick={handleAddToCart}
            disabled={isDisabled || isAddToCartLoading}
            id="addToCart"
          >
            <ShoppingCart className="size-4 sm:size-5 shrink-0" />
            <span className="truncate">কার্টে যোগ করুন</span>
          </EcButton>
        </div>

        {/* Row 2 (Mobile full width) / Right Column (Desktop): Buy Now */}
        <EcButton
          className="w-full md:w-auto md:flex-1 h-[42px] sm:h-[46px] px-3 sm:px-4 font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
          onClick={handleBuyNow}
          disabled={isDisabled || isAddToCartLoading}
          variant="secondary"
        >
          <ShoppingBag className="size-4 sm:size-5 shrink-0" />
          <span className="truncate">অর্ডার করুন</span>
        </EcButton>
      </div>

      {isDisabled && disabledReason && (
        <div className="bg-destructive/10 text-destructive text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl border border-destructive/20 animate-in fade-in slide-in-from-top-1">
          {disabledReason}
        </div>
      )}
    </div>
  );
};

export default AddToCartAndBuyNow;
