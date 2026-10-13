"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

type CarouselImage = {
  src: string;
  title: string;
  caption: string;
  badge: string;
};

const images: CarouselImage[] = [
  {
    src: "/images/landing-page/sx21/1.webp",
    title: "ক্লোজ-আপ বাটন ট্রান্সমিটার মাইক",
    caption: "হাতে ধরে দেখানো রিয়াল শট — হালকা ও প্রিমিয়াম সার্কুলার ক্লিপ-অন মাইক",
    badge: "ক্লোজ-আপ ডিটেইল",
  },
  {
    src: "/images/landing-page/sx21/2.webp",
    title: "SX21 বক্স ও ডিজিটাল ডিসপ্লে চার্জিং কেস",
    caption: "আসল আনবক্সিং ভিউ — বক্সের সাথে ডিজিটাল এলইডি ব্যাটারি ইন্ডিকেটর চার্জিং কেস",
    badge: "বক্স ও চার্জিং কেস",
  },
  {
    src: "/images/landing-page/sx21/3.webp",
    title: "কেসের ভেতর ডুয়াল মাইক ও রিসিভার",
    caption: "চার্জিং কেস খোলা অবস্থায় ২টি ওয়্যারলেস মাইক ও ১টি রিসিভার সুন্দরভাবে সংরক্ষিত",
    badge: "সম্পূর্ণ সেটআপ",
  },
];

const ProductCarousel = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIdx((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  const current = images[currentIdx];

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-widest uppercase bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full inline-block mb-3">
            বাস্তব ছবি ও বিভিন্ন কোণ থেকে দেখুন
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            অর্ডারের আগেই দেখে নিন SX21 এর বাস্তব র&apos; ছবি
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            কোনো প্রকার বিভ্রান্তি ছাড়া বিভিন্ন অ্যাঙ্গেল থেকে প্রোডাক্টের ফিনিশিং ও সাইজ দেখে নিশ্চিত হয়ে অর্ডার করুন।
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto">
          
          {/* Main Slide Card */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-800/90 border-2 border-white/10 shadow-2xl group">
            
            {/* Image Container */}
            <div className="relative w-full h-[380px] sm:h-[520px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <Image
                src={current.src}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain transition-transform duration-500 group-hover:scale-102"
                priority
              />

              {/* Angle Tag */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
                📷 {current.badge}
              </div>

              {/* Photo counter */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                ছবি {currentIdx + 1} / {images.length}
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-slate-950/70 hover:bg-primary text-white border border-white/20 flex items-center justify-center text-xl sm:text-2xl backdrop-blur-md transition-all active:scale-90 shadow-lg cursor-pointer"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next Image"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-slate-950/70 hover:bg-primary text-white border border-white/20 flex items-center justify-center text-xl sm:text-2xl backdrop-blur-md transition-all active:scale-90 shadow-lg cursor-pointer"
              >
                <FiChevronRight />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-4 sm:p-6 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {current.caption}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                <FiZoomIn className="text-sm" />
                <span>বাস্তব প্রোডাক্ট ফটো</span>
              </div>
            </div>

          </div>

          {/* Thumbnails Navigation Row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
            {images.map((img, idx) => {
              const isSelected = currentIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIdx(idx);
                  }}
                  className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all cursor-pointer bg-slate-950 ${
                    isSelected
                      ? "border-amber-400 ring-2 ring-amber-400/30 scale-102 shadow-lg"
                      : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/40"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductCarousel;
