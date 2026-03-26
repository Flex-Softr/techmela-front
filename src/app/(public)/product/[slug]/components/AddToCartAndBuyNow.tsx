"use client";
import Quantity from "@/app/(public)/checkout/components/Quantity";
import EcButton from "@/components/shared/EcButton/EcButton";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

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
    <>
      <div className="flex items-center gap-4 py-2 border-y border-gray-100 mb-2">
        <span className="text-sm font-semibold text-gray-700 min-w-[70px]">
          পরিমাণ:
        </span>
        <Quantity quantity={quantity} setQuantity={setQuantity} />
      </div>
      {isDisabled && (
        <p className="text-red-600 text-sm font-semibold mt-2">
          {disabledReason || "Please select a variation"}
        </p>
      )}
      <div className="flex gap-3 mt-2">
        <div className="flex-grow flex gap-4">
          <EcButton
            className="flex-grow text-white"
            onClick={handleAddToCart}
            disabled={isDisabled || isAddToCartLoading} // Disable if no variation is selected or loading
            id="addToCart"
          >
            কার্টে যোগ করুন
          </EcButton>
          <EcButton
            className="flex-grow text-white"
            onClick={handleBuyNow}
            disabled={isDisabled || isAddToCartLoading} // Disable if no variation is selected or loading
            variant="secondary"
          >
            এখনই কিনুন
          </EcButton>
        </div>
      </div>
    </>
  );
};

export default AddToCartAndBuyNow;
