"use client";
import Image from "next/image";
import { FiArrowRight, FiMinus, FiPlus } from "react-icons/fi";
import { MdMenuBook, MdVerified } from "react-icons/md";
import config from "@/config/config";

type Props = {
  productTitle: string;
  author: string;
  shortDescription?: string;
  thumbnailSrc?: string;
  regularPrice: number;
  salePrice: number;
  discount: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onOrderNow: () => void;
  stockStatus?: string;
};

const HeroSection = ({
  productTitle,
  author,
  shortDescription,
  thumbnailSrc,
  regularPrice,
  salePrice,
  discount,
  quantity,
  setQuantity,
  onOrderNow,
  stockStatus,
}: Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center xl:justify-start">
          <div className="relative w-full max-w-md lg:max-w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={thumbnailSrc ?? "/placeholder.jpg"}
                alt={productTitle}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
            </div>
            {discount > 0 && (
              <div className="absolute -top-6 -right-6 z-10 w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center pointer-events-none drop-shadow-xl transition-transform duration-300 hover:rotate-12">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                >
                  <path
                    d="M50 0 L56.5 7.5 L64.5 3.5 L69 12 L78.5 10.5 L80.5 20 L89.5 21 L88.5 30.5 L96.5 34 L93 43 L99 49 L93 55 L96.5 64 L88.5 67.5 L89.5 77 L80.5 78 L78.5 87.5 L69 86 L64.5 94.5 L56.5 90.5 L50 98 L43.5 90.5 L35.5 94.5 L31 86 L21.5 87.5 L19.5 78 L10.5 77 L11.5 67.5 L3.5 64 L7 55 L1 49 L7 43 L3.5 34 L11.5 30.5 L10.5 21 L19.5 20 L21.5 10.5 L31 12 L35.5 3.5 L43.5 7.5 Z"
                    fill="#dc2626"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="rgba(251, 191, 36, 0.5)"
                    strokeWidth="2.5"
                    strokeDasharray="2.5 2.5"
                  />
                </svg>
                <div className="relative text-white flex flex-col items-center justify-center leading-none">
                  <span className="font-black text-xl lg:text-2xl tracking-tighter">
                    {discount}%
                  </span>
                  <span className="text-[10px] lg:text-xs font-black uppercase tracking-wider">
                    ছাড়
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-bold border border-green-100 mb-1">
            <MdVerified className="text-sm" />
            সিদ্দীকিয়া প্রকাশনী
          </div>

          <div>
            <h1 className="text-4xl lg:text-[42px] font-extrabold text-gray-900 leading-[1.15] mb-2">
              {productTitle}
            </h1>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-600 font-medium">
                লেখক: <span className="text-primary font-bold">{author}</span>
              </p>
              {shortDescription && (
                <div
                  className="text-gray-500 text-sm lg:text-base leading-relaxed line-clamp-3 prose-sm"
                  dangerouslySetInnerHTML={{ __html: shortDescription }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <span className="text-[42px] lg:text-[48px] font-black text-primary leading-none tracking-tight">
              &#2547;{salePrice}
            </span>
            {regularPrice > salePrice && (
              <div className="flex items-center gap-3">
                <span className="text-xl lg:text-2xl text-gray-500 line-through">
                  &#2547;{regularPrice}
                </span>
                <span className="bg-[#fff1f2] text-[#e11d48] text-[13px] font-bold px-2.5 py-1 rounded-md">
                  {discount}% Off
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <span className="font-bold text-gray-800">পরিমাণ:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-5 py-2.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <FiMinus className="text-gray-700 text-xl" />
              </button>
              <span className="w-14 text-center text-lg font-bold text-gray-800 border-x border-gray-200 py-2.5 leading-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-5 py-2.5 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <FiPlus className="text-gray-700 text-xl" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 lg:max-w-2xl">
            {stockStatus === "out_of_stock" ? (
              <div className="flex-1 px-8 py-5 bg-gray-200 text-gray-500 text-lg lg:text-xl font-bold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed border border-gray-300">
                অ্যাভেইলঅ্যাবল নেই
              </div>
            ) : (
              <button
                onClick={onOrderNow}
                className="flex-[1.2] px-8 py-5 bg-primary text-white text-lg lg:text-xl font-black rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] animate-pulse-gentle whitespace-nowrap"
              >
                অর্ডার করুন <FiArrowRight className="text-xl lg:text-2xl" />
              </button>
            )}

            <a
              href={config.wahabider_itihas_preview_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-8 py-5 bg-white text-primary text-lg lg:text-xl font-bold rounded-2xl border-2 border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <MdMenuBook className="text-2xl lg:text-3xl" />
              একটু পড়ে দেখুন
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-gentle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
