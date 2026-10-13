"use client";
import CTAButtonGroup from "@/app/(landing-page)/_components/CTAButtonGroup";
import PricingDisplay from "@/app/(landing-page)/_components/PricingDisplay";
import Image from "next/image";
import { FaFire } from "react-icons/fa";

type Props = {
  onOrderClick: () => void;
  thumbnailSrc: string;
  regularPrice: number;
  salePrice: number;
  productTitle: string;
};

const HeroSection = ({
  onOrderClick,
  thumbnailSrc,
  regularPrice,
  salePrice,
  productTitle,
}: Props) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-14 lg:py-16">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Selling Points & Price */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Urgency & Problem-Focus Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full text-amber-300 font-bold text-xs sm:text-sm animate-pulse">
                <FaFire className="text-amber-400 text-sm" />
                <span>বাজেট সীমিত? মাত্র ৮৯০ টাকায় সেরা সমাধান!</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 rounded-full text-emerald-300 font-bold text-xs">
                <span>🌙</span>
                <span>সামনে রমজানের কনটেন্ট স্পেশাল</span>
              </div>
            </div>

            {/* Main Emotionally Resonant Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.25] tracking-tight text-white">
              বাজেট সীমিত বলে কি{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">
                মোবাইল দিয়ে ভিডিও বানানোর স্বপ্ন
              </span>{" "}
              থেমে থাকবে?
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              একটি দামি মাইক্রোফোন কিনতে না পারার আক্ষেপ আর নয়! স্বল্প বাজেটে মাত্র ৮৯০ টাকায় আমরা দিচ্ছি বেস্ট কোয়ালিটির <strong className="text-white font-bold">{productTitle}</strong> — যাতে রয়েছে পাওয়ারফুল <span className="text-amber-300 font-bold">ANC (অ্যাক্টিভ নয়েজ ক্যান্সেলেশন)</span> এবং আকর্ষণীয় <span className="text-amber-300 font-bold">ইকো (Echo) মোড</span>।
            </p>

            {/* Short & Punchy 2-Line Hook */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-sm sm:text-base text-slate-200 text-left space-y-2.5 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 text-lg flex-shrink-0 mt-0.5">💡</span>
                <span className="leading-relaxed">
                  <strong>ভিডিওর চেয়ে অডিও জরুরি:</strong> ভিডিও সাধারণ হলেও মানুষ দেখে, কিন্তু সাউন্ডে নয়েজ থাকলে ৫ সেকেন্ডেই স্কিপ করে!
                </span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <span className="text-emerald-400 text-lg flex-shrink-0 mt-0.5">🌙</span>
                <span className="leading-relaxed">
                  <strong>সামনে মাহে রমজান:</strong> এখন থেকেই কিরাত, গজল, ওয়াজ রেকর্ড করে ফেসবুক পেইজে দ্রুত ফলোয়ার ও রিচ বাড়ানোর সেরা সুযোগ।
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="pt-2 flex flex-col items-center lg:items-start gap-3">
              <div className="bg-white/5 border border-white/15 rounded-2xl p-4 sm:p-5 backdrop-blur-sm w-full sm:w-auto inline-block">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-xs sm:text-sm text-amber-300 font-bold">
                    🔥 সীমিত সময়ের ধামাকা অফার:
                  </p>
                  <span className="text-xs sm:text-sm bg-red-600/90 text-white font-bold px-2.5 py-0.5 rounded-full">
                    মাত্র ৮৯০ টাকা!
                  </span>
                </div>
                <PricingDisplay
                  regularPrice={regularPrice}
                  salePrice={salePrice}
                  isLarge={true}
                  priceColor="text-amber-400"
                  regularPriceColor="text-slate-400"
                  discountColor="text-emerald-400"
                  className="text-white"
                />
              </div>
            </div>

            {/* CTA Button Group */}
            <div className="pt-2 flex flex-col items-center lg:items-start gap-4">
              <CTAButtonGroup
                onOrderClick={onOrderClick}
                className="w-full sm:w-auto justify-center lg:justify-start"
              />

              {/* Trust Badges - Guarantee cleanly mentioned here only */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-200 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-400"></span>
                  ক্যাশ অন ডেলিভারি
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-400"></span>
                  সারাদেশে হোম ডেলিভারি
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1.5 font-bold text-amber-300">
                  <span className="size-2 rounded-full bg-amber-400"></span>
                  ৩ মাসের রিপ্লেসমেন্ট গ্যারান্টি
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Product Showcase */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-lg lg:max-w-xl">
              
              {/* Product Showcase Card Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950/95 p-3.5 sm:p-5 shadow-2xl backdrop-blur-xl">
                
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
                  <Image
                    src="/images/landing-page/sx21/4.webp"
                    alt={productTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 650px"
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Floating Best Seller Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <span>★</span>
                    <span>মাত্র ৮৯০ টাকায় বেস্ট সেলার</span>
                  </div>

                  {/* Floating Discount Tag */}
                  {regularPrice > salePrice && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full shadow-lg">
                      {Math.round(((regularPrice - salePrice) / regularPrice) * 100)}% ছাড়
                    </div>
                  )}

                  {/* Compatibility & OTG Note Pill on bottom of image */}
                  <div className="absolute bottom-3 inset-x-3 bg-slate-950/90 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-200">ডিভাইস সাপোর্ট:</span>
                    <span className="text-emerald-400 font-bold">Android Type-C + iPhone (OTG সহ)</span>
                  </div>
                </div>

                {/* 4 Feature Highlights Cards — Clean 2x2 Grid Directly Under Image (NO OVERLAPS) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3.5 sm:pt-4">
                  {/* ANC */}
                  <div className="bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-start gap-2.5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0">
                      ANC
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">অ্যাক্টিভ নয়েজ কাট</p>
                      <p className="text-xs text-slate-200 leading-snug mt-0.5">বাইরের সব শব্দ ব্লক</p>
                    </div>
                  </div>

                  {/* ECHO */}
                  <div className="bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-start gap-2.5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                      ECHO
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">ম্যাজিক ইকো মোড</p>
                      <p className="text-xs text-slate-200 leading-snug mt-0.5">মধুর কিরাত ও ওয়াজ</p>
                    </div>
                  </div>

                  {/* DUAL */}
                  <div className="bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-start gap-2.5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black text-xs shrink-0">
                      DUAL
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">ডুয়াল মাইক</p>
                      <p className="text-xs text-slate-200 leading-snug mt-0.5">একসাথে ২ জন রেকর্ডিং</p>
                    </div>
                  </div>

                  {/* ALL DEVICE */}
                  <div className="bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-2.5 sm:p-3 flex items-start gap-2.5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-black text-xs shrink-0">
                      OTG
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">Android + iPhone</p>
                      <p className="text-xs text-slate-200 leading-snug mt-0.5">প্লাগ অ্যান্ড প্লে সাপোর্ট</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
