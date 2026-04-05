"use client";
import Quantity from "@/app/(public)/checkout/components/Quantity";
import EcButton from "@/components/shared/EcButton/EcButton";
import { Dispatch, SetStateAction } from "react";
import { ShoppingCart } from "lucide-react";

const AddToCartAndBuyNow = ({
  quantity,
  setQuantity,
  addToCartHandler,
  isAddToCartLoading,
  isDisabled, // Prop to control the disabled state
  disabledReason,
}: {
  addToCartHandler: () => Promise<boolean>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  isAddToCartLoading: boolean;
  isDisabled: boolean; // Prop type for disabling buttons
  disabledReason?: string;
}) => {
  const handleAddToCart = async () => {
    await addToCartHandler();
  };

  return (
    <div className="mt-4">
      {/* Quantity and Add to Cart Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-1.5 sm:p-2 px-3 sm:px-4 rounded-xl border border-gray-100 h-10 sm:h-[48px]">
          <span className="text-xs sm:text-sm font-bold text-gray-600 min-w-[40px] sm:min-w-[50px]">
            পরিমাণ:
          </span>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <EcButton
          className="flex-grow h-10 sm:h-[48px] px-3 sm:px-4 py-2 sm:py-3 text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all active:scale-95 text-sm sm:text-base"
          onClick={handleAddToCart}
          disabled={isDisabled || isAddToCartLoading} // Disable if no variation is selected or loading
          id="addToCart"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          কার্টে যোগ করুন
        </EcButton>
      </div>

      {isDisabled && (
        <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
          {disabledReason || "Please select a variation"}
        </div>
      )}
    </div>
  );
};

export default AddToCartAndBuyNow;
