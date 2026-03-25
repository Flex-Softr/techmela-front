import { AlertCircle, BadgeCheck, CheckCircle } from "lucide-react";
import Image from "next/image";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";
import PricingDisplay from "../../../_components/PricingDisplay";

type Props = {
  onOrderClick: () => void;
  onPreviewClick?: () => void;
  thumbnailSrc?: string;
  regularPrice?: number;
  salePrice?: number;
};

const PsychologicalHero = ({
  onOrderClick,
  onPreviewClick,
  thumbnailSrc,
  regularPrice,
  salePrice,
}: Props) => {
  const discount =
    regularPrice && salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  const valuePoints = [
    "৬৪ জন বরেণ্য ইমামের দালিলিক গবেষণা",
    "কুরআন-হাদিস ও উসূলুল ফিকহ ভিত্তিক বিশ্লেষণ",
    "ইতিহাস, সালাফ ও খালাফের নির্ভরযোগ্য পর্যালোচনা",
    "বিভ্রান্তি দূর করে সঠিক পথ খুঁজে পাওয়ার গাইড",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-12 px-4">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-100/40 via-primary/5 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15]" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          {/* Book Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            {thumbnailSrc && (
              <div className="relative group w-full max-w-[300px] lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2.5rem] blur-2xl opacity-60"></div>

                <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border-[8px] border-white bg-white transform -rotate-1 hover:rotate-0 transition-all duration-700 ease-out p-1">
                  <Image
                    src={thumbnailSrc}
                    alt="বইয়ের কভার"
                    width={480}
                    height={680}
                    className="w-full h-auto rounded-[1.2rem]"
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
                <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white font-black px-4 py-1.5 rounded-xl shadow-lg transform rotate-3 border-2 border-white text-xs">
                  বেস্ট সেলার
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full font-black uppercase tracking-normal lg:tracking-[0.2em] border border-red-100 text-[10px] lg:text-[12px]">
                <AlertCircle size={11} />
                বিভ্রান্তি দূর করুন
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl lg:text-4xl xl:text-[2.2rem] font-black text-gray-900 leading-[1.3] lg:leading-[1.1] tracking-normal lg:tracking-tight">
                মিলাদুন্নবী (সা.) উদযাপন ও মিলাদ-কিয়াম কি{" "}
                <span className="text-red-600">বিদআত?</span>
                <br className="hidden sm:block" />
                <span className="text-emerald-700"> নাকি যুগ যুগ ধরে</span>{" "}
                জায়েজ একটি বিষয়?
              </h1>
              <p className="text-sm lg:text-base font-bold text-gray-600 leading-relaxed max-w-2xl">
                ইউটিউব-ফেসবুকে বিভ্রান্ত না হয়ে জানুন বিশ্ব বরেণ্য ইমাম ও
                মনীষীদের দলিলভিত্তিক বিশ্লেষণ এবং মিলাদুন্নবী (সা.) উদযাপন ও
                মিলাদ-কিয়ামের{" "}
                <span className="text-emerald-600 font-black">
                  প্রকৃত হুকুম কী!
                </span>
              </p>
            </div>

            {/* Value points */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
              {valuePoints.map((text, i) => (
                <li key={i} className="flex items-center gap-2 group/value">
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 shrink-0"
                  />
                  <span className="text-sm font-black text-gray-700 leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              {(salePrice || regularPrice) && (
                <PricingDisplay
                  regularPrice={regularPrice || 0}
                  salePrice={salePrice || regularPrice || 0}
                  isLarge={false}
                  className="lg:flex-row lg:gap-6 lg:items-center"
                />
              )}
            </div>
            <div className="hidden lg:flex items-center gap-6 pt-2">
              <CTAButtonGroup
                onOrderClick={onOrderClick}
                onPreviewClick={onPreviewClick}
                className="scale-105 origin-left"
              />
            </div>

            {/* Trust strip */}
            <div className="hidden lg:flex items-center gap-6 pt-4 border-t border-gray-100">
              {[
                "ক্যাশ অন ডেলিভারি",
                "সারা বাংলাদেশে ডেলিভারি",
                "৩-৫ দিনে হাতে পাবেন",
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <BadgeCheck size={14} className="text-emerald-500" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden order-3 w-full">
            <div className="bg-gradient-to-r from-primary/5 to-emerald-50/50 p-4 rounded-2xl border border-primary/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {(salePrice || regularPrice) && (
                    <PricingDisplay
                      regularPrice={regularPrice || 0}
                      salePrice={salePrice || regularPrice || 0}
                      isLarge={false}
                    />
                  )}
                </div>
                <CTAButtonGroup
                  onOrderClick={onOrderClick}
                  onPreviewClick={onPreviewClick}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap mt-2 border-t border-primary/10 pt-3">
                {["ক্যাশ অন ডেলিভারি", "সারাদেশে ডেলিভারি"].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] font-black text-gray-400"
                  >
                    <BadgeCheck size={12} className="text-emerald-500" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalHero;
