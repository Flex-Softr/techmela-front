"use client";
import Quantity from "@/app/(public)/checkout/components/Quantity";
import EcButton from "@/components/shared/EcButton/EcButton";
import { Dispatch, SetStateAction } from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleAddToCart = async () => {
    await addToCartHandler();
  };

  const handleBuyNow = async () => {
    const isSuccess = await addToCartHandler();
    if (isSuccess) {
      router.push("/checkout");
    }
  };

  return (
    <div className="mt-3">
      {/* Quantity and Add to Cart Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-50/50 p-1 px-2 sm:px-3 rounded-lg border border-gray-100 h-[38px] sm:h-[42px]">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[40px] sm:min-w-[50px]">
            পরিমাণ:
          </span>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <EcButton
          className="flex-grow h-[38px] sm:h-[42px] px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 text-sm sm:text-base"
          onClick={handleAddToCart}
          disabled={isDisabled || isAddToCartLoading} // Disable if no variation is selected or loading
          id="addToCart"
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          কার্টে যোগ করুন
        </EcButton>
        <EcButton
          className="flex-grow h-[38px] sm:h-[42px] lg:ml-1 px-3 sm:px-4 py-1.5 sm:py-2 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 text-sm sm:text-base mt-2.5 md:mt-0"
          onClick={handleBuyNow}
          disabled={isDisabled || isAddToCartLoading} // Disable if no variation is selected or loading
          variant="secondary"
        >
          অর্ডার করুন
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
