"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineOndemandVideo } from "react-icons/md";

type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  badge: string;
};

const videos: VideoItem[] = [
  {
    id: "video-1",
    youtubeId: "OalaNH_Zugo",
    title: "ফুল রিভিউ ও সাউন্ড টেস্ট",
    badge: "সাউন্ড টেস্ট",
  },
  {
    id: "video-2",
    youtubeId: "zgqkHu2FDKw",
    title: "গান গাইলে কেমন শোনায়? ",
    badge: "গান ও গজল টেস্ট",
  },
  {
    id: "video-3",
    youtubeId: "pl9DnT53PYE",
    title: "আনবক্সিং ও কমপ্লিট রিভিউ",
    badge: "ফুল রিভিউ",
  },
];

const VideoSection = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = activeIndex > 0 ? activeIndex - 1 : videos.length - 1;
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex < videos.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth
        : container.offsetWidth;

      if (cardWidth > 0) {
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex >= 0 && newIndex < videos.length) {
          setActiveIndex(newIndex);
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrderForm = () => {
    const el = document.getElementById("order-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3.5 py-1 rounded-full text-red-400 font-bold text-xs mb-2">
            <MdOutlineOndemandVideo className="text-sm" />
            <span>রিলস ভিডিও রিভিউ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            SX21 লাইভ সাউন্ড টেস্ট ও ভিডিও রিভিউ
          </h2>
          <p className="mt-1.5 text-slate-300 text-xs sm:text-sm">
            স্বচক্ষে দেখে ও আসল সাউন্ড শুনে নিশ্চিত হয়ে অর্ডার করুন।
          </p>
        </div>

        {/* Carousel Container with Centered Left/Right Navigation Arrows */}
        <div className="relative group">
          
          {/* Previous Arrow Button (Middle of the Video like Product Carousel) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous video"
            className="absolute left-2 sm:left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-white/20 flex items-center justify-center text-xl sm:text-2xl backdrop-blur-md transition-all active:scale-90 shadow-2xl cursor-pointer"
          >
            <FiChevronLeft />
          </button>

          {/* Reels Video Carousel: Desktop 3 side-by-side, Mobile 1 per screen */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-1 scroll-smooth"
          >
          {videos.map((vid, idx) => {
            const isPlaying = playingId === vid.id;

            return (
              <div
                key={vid.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center"
              >
                {/* Reels Frame (9:16 Aspect Ratio) */}
                <div className="relative aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden border-2 border-white/15 hover:border-red-500/50 shadow-2xl transition-all duration-300 group">
                  
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="relative w-full h-full flex flex-col justify-between p-4 text-white">
                      
                      {/* Video Thumbnail */}
                      <Image
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                        alt={vid.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Dark Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70" />

                      {/* Top Header Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="bg-red-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <FaYoutube className="text-xs" />
                          Reels
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                          {vid.badge}
                        </span>
                      </div>

                      {/* Center Play Button */}
                      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                        <button
                          type="button"
                          onClick={() => setPlayingId(vid.id)}
                          aria-label={`Play ${vid.title}`}
                          className="size-16 sm:size-18 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-2xl shadow-2xl shadow-red-600/50 transform group-hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
                        >
                          <FaPlay className="ml-1" />
                        </button>
                        <p className="mt-3 text-white font-bold text-xs sm:text-sm drop-shadow">
                          সাউন্ড শুনতে চাপ দিন
                        </p>
                      </div>

                      {/* Bottom Title Bar */}
                      <div className="relative z-10 bg-slate-950/85 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                        <span className="text-[10px] font-bold text-red-400 block uppercase">
                          ভিডিও ০{idx + 1}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                          {vid.title}
                        </h3>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

          {/* Next Arrow Button (Middle of the Video like Product Carousel) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next video"
            className="absolute right-2 sm:right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-slate-950/80 hover:bg-red-600 text-white border border-white/20 flex items-center justify-center text-xl sm:text-2xl backdrop-blur-md transition-all active:scale-90 shadow-2xl cursor-pointer"
          >
            <FiChevronRight />
          </button>
        </div>

        {/* Dots Indicators (Especially helpful on mobile) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === i
                  ? "w-6 bg-red-500"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        {/* Simple Order Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={scrollToOrderForm}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-emerald-950/50 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            👉 এই মাইক্রোফোনটি অর্ডার করতে এগিয়ে যান
          </button>
        </div>

      </div>
    </section>
  );
};

export default VideoSection;
