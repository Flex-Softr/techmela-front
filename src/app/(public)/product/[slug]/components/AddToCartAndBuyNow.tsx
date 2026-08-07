"use client";
import Quantity from "@/app/(public)/checkout/components/Quantity";
import EcButton from "@/components/shared/EcButton/EcButton";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const AddToCartAndBuyNow = ({
  quantity,
  setQuantity,
  addToCartHandler,
  isAddToCartLoading,
  isDisabled, // Prop to control the disabled state
  // disabledReason,
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
    <div className="mt-4 flex flex-col md:flex-row gap-3">
      {/* Row 1 (Mobile) / Left (Desktop): Quantity and Add to Cart */}
      <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto md:flex-1">
        <div className="flex items-center shrink-0 gap-1 sm:gap-2 bg-muted/50 p-1 px-2 sm:px-3 rounded-lg border border-border h-[40px] sm:h-[42px]">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Qty:
          </span>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>

        <EcButton
          className="flex-grow h-[40px] sm:h-[42px] px-2 sm:px-4 text-primary-foreground font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 text-[13px] sm:text-base whitespace-nowrap"
          onClick={handleAddToCart}
          disabled={isDisabled || isAddToCartLoading}
          id="addToCart"
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Add to Cart
        </EcButton>
      </div>

      {/* Row 2 (Mobile) / Right (Desktop): Buy Now */}
      <EcButton
        className="w-full md:w-auto md:flex-1 h-[40px] sm:h-[42px] px-3 sm:px-4 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 text-[15px] sm:text-base"
        onClick={handleBuyNow}
        disabled={isDisabled || isAddToCartLoading}
        variant="secondary"
      >
        <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
        Order Now
      </EcButton>
      {/* 
      {isDisabled && (
        <div className="bg-destructive/10 text-destructive text-sm font-medium px-4 py-2 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
          {disabledReason || "Please select a variation"}
        </div>
      )} */}
    </div>
  );
};

export default AddToCartAndBuyNow;
