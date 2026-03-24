"use client";
import { FiArrowRight, FiMinus, FiPlus } from "react-icons/fi";

type Props = {
  isVisible: boolean;
  salePrice: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  scrollToOrder: () => void;
};

const StickyOrderButton = ({
  isVisible,
  salePrice,
  quantity,
  setQuantity,
  scrollToOrder,
}: Props) => {
  if (isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-12 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-[45] flex flex-col gap-3 font-bengali">
      <div className="flex justify-between items-center px-2">
        <span className="text-gray-500 font-bold">
          মোট: ৳{salePrice * quantity}
        </span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-50 border-r"
          >
            <FiMinus />
          </button>
          <span className="px-4 font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-gray-50 border-l"
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <button
        onClick={scrollToOrder}
        className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
      >
        অর্ডার করতে ক্লিক করুন <FiArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default StickyOrderButton;
