"use client";

import { useState } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

type VideoItem = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  // If user provides a youtube ID or embed URL, it will display directly; otherwise it shows a clean interactive video container
  videoEmbedUrl?: string;
  duration: string;
};

type Props = {
  video1Url?: string;
  video2Url?: string;
};

const VideoSection = ({ video1Url, video2Url }: Props) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videos: VideoItem[] = [
    {
      id: "video-1",
      title: "SX21 ওয়্যারলেস মাইক্রোফোনের লাইভ সাউন্ড টেস্ট ও রিভিউ",
      subtitle: "বাতাস ও কোলাহলের মধ্যে ANC (অ্যাক্টিভ নয়েজ ক্যান্সেলেশন) কীভাবে কাজ করে বিস্তারিত দেখুন।",
      badge: "ভিডিও ১: সাউন্ড টেস্ট ও রিভিউ",
      videoEmbedUrl: video1Url,
      duration: "০৩:৪৫ মিনিট",
    },
    {
      id: "video-2",
      title: "মোবাইলে কানেক্ট করার নিয়ম ও ইকো মোড ব্যবহারের ডেমো",
      subtitle: "অ্যান্ড্রয়েড ও আইফোনে কীভাবে ১ সেকেন্ডে প্লাগ অ্যান্ড প্লে কানেক্ট করবেন এবং Reverb/Echo মোড অন করবেন।",
      badge: "ভিডিও ২: কানেকশন ও ফিচার ডেমো",
      videoEmbedUrl: video2Url,
      duration: "০২:৩০ মিনিট",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-full text-red-400 font-bold text-xs sm:text-sm mb-3">
            <MdOutlineOndemandVideo className="text-base" />
            <span>সরাসরি ভিডিওতে দেখুন</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            ভিডিওতে স্বচক্ষে দেখে নিন SX21 এর ম্যাজিক সাউন্ড কোয়ালিটি!
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            কোনো দ্বিধা না রেখে নিচের ভিডিও দুটোতে প্রোডাক্টটির আনবক্সিং, সাউন্ড টেস্ট এবং ব্যবহারের পুরো নিয়মটি দেখে নিন।
          </p>
        </div>

        {/* 2 Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {videos.map((vid) => {
            const isPlaying = playingVideo === vid.id;

            return (
              <div
                key={vid.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between group hover:border-red-500/40 transition-all duration-300"
              >
                {/* Video Player Box */}
                <div className="relative aspect-16/9 w-full bg-slate-950 overflow-hidden">
                  {vid.videoEmbedUrl && isPlaying ? (
                    <iframe
                      src={
                        vid.videoEmbedUrl.includes("embed")
                          ? vid.videoEmbedUrl
                          : `https://www.youtube.com/embed/${vid.videoEmbedUrl}?autoplay=1`
                      }
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                      
                      {/* Play Button */}
                      <button
                        type="button"
                        onClick={() => setPlayingVideo(vid.id)}
                        className="size-16 sm:size-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xl shadow-red-600/30 transform group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                        aria-label="Play video"
                      >
                        <FaPlay className="ml-1" />
                      </button>

                      <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-300">
                        ভিডিওটি দেখতে ক্লিক করুন
                      </p>

                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                        {vid.badge}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-slate-300 text-xs font-medium px-2.5 py-1 rounded-md">
                        {vid.duration}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info Footer */}
                <div className="p-5 sm:p-6 bg-slate-900 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-red-400 font-bold">
                    <FaYoutube className="text-base" />
                    <span>এক্সক্লুসিভ রিভিউ ও টিউটোরিয়াল</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {vid.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Trust Note */}
        <div className="mt-8 text-center text-sm text-slate-300 font-medium">
          💡 ভিডিওতে যেমন দেখছেন, হাতে পেয়ে ঠিক একই রকম সেরা কোয়ালিটি পাবেন ইনশাআল্লাহ।
        </div>

      </div>
    </section>
  );
};

export default VideoSection;
