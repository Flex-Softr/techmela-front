"use client";
import { X, Check } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
};

const FearResponsibility = ({ onOrderClick, onPreviewClick }: Props) => {
  return (
    <section className="bg-white py-6 lg:py-8 px-4 overflow-hidden relative border-t border-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Choice comparison */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-red-50/50 p-5 lg:p-6 space-y-3 border-b md:border-b-0 md:border-r border-red-100">
              <h4 className="text-xl font-black text-red-800 tracking-tight">যদি না পড়েন—</h4>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                {[
                  "অজান্তেই কোনো ভ্রান্ত মতবাদের উপর দাঁড়িয়ে থাকবেন যা ঈমানি ঝুঁকি তৈরি করছে।",
                  "ইতিহাস বিকৃতির আড়ালে থাকা সত্য আপনার কাছে চিরকাল অস্পষ্ট থেকে যাবে।",
                  "আপনার পরিবার ও পরবর্তী প্রজন্ম চরমপন্থী চিন্তার সহজ শিকারে পরিণত হতে পারে।",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 leading-tight">
                    <X size={14} className="text-red-400 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50/50 p-5 lg:p-6 space-y-3">
              <h4 className="text-xl font-black text-emerald-800 tracking-tight">যদি পড়েন—</h4>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                {[
                  "গত ২০০ বছরের রক্তাক্ত ইতিহাস সম্পর্কে আপনার ধারণা আয়নার মতো পরিষ্কার হবে।",
                  "সঠিক আকীদার পথ খুঁজে পাবেন এবং সকল বিভ্রান্তিকর বয়ানের সামনে অটল থাকবেন।",
                  "সত্যকে আঁকড়ে ধরার প্রশান্তি ও এক নতুন ঈমানি শক্তি অনুভব করবেন ইনশাআল্লাহ।",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 leading-tight">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1 pt-2">
          <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">সিদ্ধান্ত এখন আপনার</h3>
          <p className="font-bold text-gray-500 text-sm">প্রামাণ্য ইতিহাস নিয়ে চলবেন, নাকি লোকমুখের প্রচারণায়?</p>
        </div>

        <div className="flex justify-center">
          <CTAButtonGroup onOrderClick={onOrderClick!} onPreviewClick={onPreviewClick} />
        </div>
      </div>
    </section>
  );
};

export default FearResponsibility;
