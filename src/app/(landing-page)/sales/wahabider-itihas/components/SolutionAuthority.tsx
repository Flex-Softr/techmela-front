"use client";
import { BadgeCheck, CheckCircle } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  previewLink?: string;
  bookTitle?: string;
  thumbnailSrc?: string;
};

const SolutionAuthority = ({ onOrderClick, previewLink, bookTitle }: Props) => {
  const chapters = [
    {
      num: "০১",
      title: "নজদ ও রাসূল (সা.)-এর ভবিষ্যৎবাণী",
      desc: "নজদ বিষয়ক হাদীসগুলোর সঠিক দালিলিক ব্যবচ্ছেদ। ইমাম ইবনে আবিদিন শামী রহ. কেন একে ‘খারেজী’ মতবাদ বললেন?",
    },
    {
      num: "০২",
      title: "মুহাম্মদ ইবনে আবদুল ওয়াহহাব—আসল পরিচয়",
      desc: "তার জন্ম ও উম্মাহর মূলধারা বিরোধী বিদ্রোহের আদ্যোপান্ত। তার নিজের বাবা ও ভাইয়ের দেওয়া সেই সতর্কবার্তার দলিল।",
    },
    {
      num: "০৩",
      title: "ব্রিটিশ গোয়েন্দা ও ‘দারিন চুক্তি’র রহস্য",
      desc: "১৯১৫ সালের গোপন চুক্তি ও ব্রিটিশ গোয়েন্দা জন ফিলবির আঁতাত। ফিলিস্তিন হস্তান্তরের সেই ২০ মিলিয়ন পাউন্ডের প্রস্তাব।",
    },
    {
      num: "০৪",
      title: "মক্কা-মদিনায় রক্তগঙ্গা ও খিলাফত ধ্বংস",
      desc: "হাজারো নিরপরাধ মুসলিম ও হাজীদের শাহাদাতের লোমহর্ষক ইতিবৃত্ত। উসমানীয় খিলাফত পতনে নজদী ফেতনার প্রত্যক্ষ ভূমিকা।",
    },
    {
      num: "০৫",
      title: "জান্নাতুল বাকী ও পবিত্র নিদর্শন ধ্বংস",
      desc: "সাহাবা ও আহলে বায়তের মাজার গুঁড়িয়ে দেওয়ার নেপথ্য ‘তাকফিরি’ যুক্তি। উম্মাহর হাজার বছরের শেকড় উপড়ে ফেলার ইতিবৃত্ত।",
    },
    {
      num: "০৬",
      title: "আকাবিরে দেওবন্দ ও ৮৫+ উলামার ফতোয়া",
      desc: "আল্লামা কাশ্মীরী রহ. ও মাদানী রহ. সহ বিশ্বের শীর্ষ আলেমদের দালিলিক প্রতিরোধ ও সম্মিলিত ফতোয়ার সংকলন।",
    },
  ];

  const trustStats = [
    { num: "৩৩৫", label: "পৃষ্ঠার দালিলিক ইতিহাস" },
    { num: "৮৫+", label: "আকাবির ও হাফেযের সাক্ষ্য" },
    { num: "১০ মি.", label: "পাউন্ডের ব্রিটিশ মাসোহারা" },
    { num: "১০০%", label: "নির্ভরযোগ্য রেফারেন্স" },
  ];

  return (
    <section className="bg-[#FAFAFA] py-6 lg:py-8 px-4 overflow-hidden relative">
      <div className="max-w-screen-xl mx-auto space-y-6 relative z-10">
        {/* Intro */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            সত্যকে চিনতে হলে:
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600 block mt-1">
              সঠিক ঐতিহাসিক দলিলের প্রয়োজন
            </span>
          </h2>
          <div className="bg-gray-900 text-white inline-flex flex-col items-center gap-1 px-8 py-4 rounded-2xl max-w-md mx-auto shadow-xl">
            <p className="text-emerald-400 font-bold uppercase tracking-widest text-xs">
              সেই সত্যের মুখোমুখি হতেই:
            </p>
            <h3 className="text-xl lg:text-2xl font-black">
              ওয়াহাবিদের ইতিহাস
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <BadgeCheck size={14} className="text-emerald-400" />
              <p className="text-gray-400 font-bold text-xs">
                ইয়াসির আরাফাত আল হিন্দী | সিদ্দীকিয়া প্রকাশনী
              </p>
            </div>
          </div>
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {trustStats.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm"
            >
              <p className="text-2xl lg:text-3xl font-black text-primary">
                {s.num}
              </p>
              <p className="text-xs font-bold text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Chapter grid */}
        <div>
          <h3 className="text-center text-sm font-black uppercase tracking-widest mb-4">
            বইয়ের ভিতরে যা আপনি আবিষ্কার করবেন:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map(({ num, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
              >
                <p className="text-[11px] font-black text-primary/60 uppercase tracking-widest mb-1">
                  {num}
                </p>
                <h4 className="font-black text-gray-900 text-sm leading-tight mb-1">
                  {title}
                </h4>
                <p className="text-gray-500 font-bold text-xs leading-snug">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="font-black text-gray-900 mb-3 border-b border-gray-50 pb-2">
              বইটি আপনাকে যা দেবে:
            </p>
            <div className="space-y-2">
              {[
                "ইতিহাস বিকৃতির আসল চেহারা দেখতে পারবেন",
                "আধুনিক চরমপন্থী বয়ানের উৎস চিনতে পারবেন",
                "নিজের বিশ্বাসের শিকড় খুঁজে পাবেন",
                "উম্মাহর ঐক্যের গুরুত্ব অনুধাবন করবেন",
              ].map((text, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <CheckCircle
                    size={14}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-sm font-bold text-gray-700 leading-tight">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 p-5 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                সিদ্ধান্ত আপনার:
              </p>
              <p className="text-base lg:text-lg font-black text-white leading-tight mb-1">
                আপনি কি আধুনিক প্রচারণার ঘোরে থাকবেন?
              </p>
              <p className="text-base lg:text-lg font-black text-emerald-400 leading-tight">
                নাকি প্রামাণ্য ইতিহাস দিয়ে জ্ঞানকে শানিত করবেন?
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs font-bold text-gray-500">
                কেবল একটি বই, কিন্তু এটি আপনার জীবনদৃষ্টি বদলে দিতে পারে।
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <CTAButtonGroup
            onOrderClick={onOrderClick!}
            previewLink={previewLink}
            bookTitle={bookTitle}
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionAuthority;
