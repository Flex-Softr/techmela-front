"use client";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";
import PricingDisplay from "../../../_components/PricingDisplay";

type Props = {
  onOrderClick: () => void;
  previewLink?: string;
  bookTitle?: string;
  thumbnailSrc?: string;
  regularPrice?: number;
  salePrice?: number;
};

const PsychologicalHero = ({
  onOrderClick,
  previewLink,
  bookTitle,
  thumbnailSrc,
  regularPrice,
  salePrice,
}: Props) => {
  const discount =
    regularPrice && salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  const urgencyPoints = [
    "১৯১৫ সালের সেই গোপন ‘দারিন চুক্তি’ ও ব্রিটিশদের ১০ মিলিয়ন পাউন্ডের রহস্য কী?",
    "ইবনে সৌদ কেন ইহুদিদের ফিলিস্তিন দেওয়ার ব্যাপারে ব্রিটিশদের দালিলিক সম্মতি দিয়েছিলেন?",
    "ব্রিটিশ গোয়েন্দা জন ফিলবি কীভাবে ইসলামের মানচিত্র বদলে নীল নকশা তৈরি করেছিল?",
  ];

  const valuePoints = [
    "৩৩৫ পৃষ্ঠার অকাট্য দালিলিক ইতিহাস",
    "রাসূল (সা.)-এর নজদ বিষয়ক হাদীসের বিশ্লেষণ",
    "৮৫+ উলামায়ে কিরামের সরাসরি ফতোয়া",
    "অটোমান আর্কাইভ ও ব্রিটিশ গোপন নথির ব্যবচ্ছেদ",
  ];

  return (
    <section className="relative overflow-hidden bg-white lg:py-8 py-12 px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-primary/8 via-emerald-50/40 to-transparent rounded-full -mr-40 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-to-tr from-amber-50/60 to-transparent blur-3xl" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          {/* Book Image (Top on Mobile, Left on Desktop) */}
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

          {/* Mobile CTA (Immediately after Image on Mobile) */}
          <div className="lg:hidden w-full">
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
                  previewLink={previewLink}
                  bookTitle={bookTitle}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap mt-3 border-t border-primary/10 pt-3">
                {["ক্যাশ অন ডেলিভারি", "সারাদেশে ডেলিভারি"].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 text-[11px] font-bold text-gray-500"
                  >
                    <CheckCircle size={11} className="text-primary" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content (Bottom on Mobile, Right on Desktop) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-red-100">
                <AlertCircle size={11} />
                আপনি কি জানেন?
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-4xl xl:text-[2.2rem] font-black text-gray-900 leading-[1.3] lg:leading-[1.1] tracking-normal lg:tracking-tight">
                ইসলামী বিশ্বের ৩০০ বছরের{" "}
                <span className="text-emerald-700">অজানা</span> ও{" "}
                <span className="text-red-600">রক্তক্ষয়ী ইতিহাস</span> উন্মোচন
              </h1>
              <p className="text-sm lg:text-lg font-bold text-gray-600 leading-relaxed max-w-2xl">
                কেন উসমানীয় খিলাফতের পতন হলো? আরব ভূখণ্ডে ব্রিটিশ ষড়যন্ত্রের
                ভূমিকা কী ছিল? পবিত্র মক্কা-মদিনায় রক্তপাতের নেপথ্য কাহিনী
                জানুন{" "}
                <span className="text-emerald-600 font-black">
                  নির্ভরযোগ্য দলিলসহ।
                </span>
              </p>
            </div>

            {/* Curiosity Questions */}
            <div className="bg-gradient-to-br from-red-50/80 to-orange-50/60 border border-red-100 p-4 lg:p-5 rounded-2xl space-y-2.5">
              <p className="text-xs font-black text-red-600 uppercase tracking-widest">
                এই প্রশ্নগুলোর উত্তর কি আপনি জানেন?
              </p>
              {urgencyPoints.map((q, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertCircle
                    size={14}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="font-black text-gray-900 text-sm leading-tight">
                    {q}
                  </p>
                </div>
              ))}
              <p className="text-xs font-bold text-gray-500 border-t border-red-100 pt-2.5">
                এই ৩৩৫ পৃষ্ঠার গবেষণাগ্রন্থে প্রতিটি প্রশ্নের দলিলভিত্তিক উত্তর
                দেওয়া হয়েছে।
              </p>
            </div>

            {/* Value points */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {valuePoints.map((text, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 shrink-0"
                  />
                  <span className="text-sm font-black text-gray-700">
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
                previewLink={previewLink}
                bookTitle={bookTitle}
                className="scale-105 origin-left"
              />
            </div>
            {/* Trust strip */}
            <div className="hidden lg:flex items-center gap-4 flex-wrap">
              {[
                "ক্যাশ অন ডেলিভারি",
                "সারা বাংলাদেশে ডেলিভারি",
                "৩-৫ দিনে হাতে পাবেন",
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500"
                >
                  <CheckCircle size={12} className="text-primary" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalHero;
