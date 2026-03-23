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
    <div className="fixed bottom-12 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-[45] flex flex-col gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
            মোট মূল্য
          </span>
          <span className="text-primary font-black text-xl leading-none">
            ৳{salePrice * quantity}
          </span>
        </div>
        <div className="flex items-center border-2 border-primary/10 rounded-xl overflow-hidden bg-gray-50/50">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <FiMinus className="text-lg" />
          </button>
          <span className="px-5 font-black text-lg text-gray-900 border-x border-primary/5">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <FiPlus className="text-lg" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <button
          onClick={scrollToOrder}
          className="w-full bg-primary text-white py-4 rounded-full font-black text-xl shadow-[0_10px_30px_-5px_hsla(var(--primary)/0.4)] active:scale-95 flex items-center justify-center gap-4 animate-pulse-glow relative overflow-hidden group"
        >
          <span className="relative z-10">স্টক ফুরানোর আগেই অর্ডার করুন</span>
          <FiArrowRight className="text-2xl relative z-10 group-hover:translate-x-1 transition-transform hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        </button>

        <p className="text-sm text-gray-400 font-bold text-center uppercase flex items-center justify-center gap-1">
          🛡️ ১০০% নিরাপদ ক্যাশ অন ডেলিভারি
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 10px 25px -5px hsla(var(--primary) / 0.3);
          }
          50% {
            box-shadow: 0 15px 35px 0px hsla(var(--primary) / 0.5);
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
        .group-hover:animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default StickyOrderButton;
