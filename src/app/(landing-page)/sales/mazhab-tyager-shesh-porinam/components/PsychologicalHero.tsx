"use client";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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

  return (
    <section className="bg-white overflow-hidden relative py-8 lg:py-12 px-4">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-[400px] bg-primary/5 blur-[100px] rounded-full -mr-20 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-[300px] bg-emerald-50 blur-[80px] rounded-full -ml-10 -mb-10 pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Book Image (Order 2 on Mobile) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
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
                  onPreviewClick={onPreviewClick}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap mt-2 border-t border-primary/10 pt-3">
                {[
                  "ক্যাশ অন ডেলিভারি সুবিধা",
                  "সারাদেশে ৩ দিনে ডেলিভারি ইনশাআল্লাহ",
                  "একদম সহজ রিটার্ন পলিসি",
                ].map((t, i) => (
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

          {/* Headline & Description (Bottom on Mobile, Right on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-black uppercase tracking-widest border border-red-100">
                একটু ভাবুন!
              </div>

              <h1 className="text-2xl lg:text-4xl xl:text-[2.2rem] font-black text-gray-900 leading-[1.3] lg:leading-[1.1] tracking-normal lg:tracking-tight">
                আপনি কি <span className="text-red-600">১০০% নিশ্চিত!</span>
                <br />
                আপনি যে ইসলাম পালন করছেন, সেটাই{" "}
                <span className="text-emerald-700">সঠিক ইসলাম?</span>
              </h1>

              {/* Dangerous Trends (Compact) */}
              <div className="p-4 lg:p-5 rounded-2xl space-y-3 text-center relative overflow-hidden bg-gradient-to-r from-primary/5 to-emerald-50/50 border border-primary/10">
                <p className="text-sm font-black text-red-600 tracking-widest mb-0.5">
                  আজকের যুগের সবচেয়ে বিপজ্জনক প্রবণতা!
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "“মাযহাব মানার দরকার নেই”",
                    // "“নিজেই কুরআন-হাদীস বুঝবো”",
                    // "“ইমামদের অনুসরণ করা ভুল!”",
                  ].map((quote, i) => (
                    <div
                      key={i}
                      className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-red-100 shadow-sm flex items-center gap-1.5"
                    >
                      <FiAlertCircle className="text-red-500 text-sm shrink-0" />
                      <p className="font-black text-gray-800 italic text-xs md:text-sm">
                        {quote}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-bold text-gray-700 text-xs md:text-sm max-w-xl mx-auto leading-tight">
                  কিন্তু আপনি কি জানেন! এই ধারণার শেষ পরিণাম আসলে কোথায়?
                </p>
              </div>

              <p className="text-sm lg:text-base font-bold text-gray-500 leading-relaxed max-w-xl">
                আবেগ নয়,{" "}
                <span className="text-primary font-black">দালিলিক সত্য</span>{" "}
                জানুন। বিভ্রান্তির এই যুগে নিজের{" "}
                <span className="text-primary font-black">ঈমান আমল </span>
                রক্ষা ও সঠিক গন্তব্য নিশ্চিত করতে এই গবেষণাধর্মী গ্রন্থটি আপনার
                আজীবনের পাথেয় হবে।
              </p>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-4">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {[
                  "৫০০+ পৃষ্ঠার অকাট্য গবেষণাধর্মী দলিল: কুরআন ও সুন্নাহর আলোকে মাযহাবের সত্যতা ও আবশ্যকতা।",
                  // "বিভ্রান্তিকর আধুনিক চিন্তা থেকে মুক্তি: সমকালীন ‘লা-মাযহাব’ ফেতনা ও ভুল ধারণার শক্তিশালী খণ্ডন।",
                  "উম্মাহর স্বীকৃত ইমাম, শাইখুল ইসলাম আল্লামা যাহিদ আল-কাউসারী (রহ.) এর গবেষণালব্ধ সংকলন।",
                  // "শ্রেষ্ঠ মুহাক্কিক আলিমের নির্ভরযোগ্য গাইড: গত শতাব্দীর শ্রেষ্ঠ মুজতাহিদ শাইখুল ইসলাম ইমাম যাহিদ আল-কাউসারী (রহ.) এর গবেষণালব্ধ সংকলন।",
                  // "শুদ্ধ আকীদা ও আমলের নিরেট সুরক্ষা: আপনার ঈমানকে বিচ্যুতি থেকে বাঁচিয়ে সঠিক গন্তব্যে পৌঁছানোর পাথেয়।",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <FiCheckCircle className="text-emerald-600 text-[8px]" />
                    </div>
                    <span className="text-xs font-black text-gray-600">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalHero;
