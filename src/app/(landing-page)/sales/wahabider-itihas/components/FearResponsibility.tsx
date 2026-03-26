"use client";
import { X, Check } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
};

const FearResponsibility = ({ onOrderClick, onPreviewClick }: Props) => {
  return (
    <section className="bg-white py-4 lg:py-6 px-4 overflow-hidden relative border-t border-gray-50">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Qualification Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight">
            বইটি কি আপনার পড়া{" "}
            <span className="text-primary italic underline underline-offset-4 decoration-primary/20">
              প্রয়োজন?
            </span>
          </h2>
          <p className="text-xs font-bold text-gray-500">
            সত্যের মুখোমুখি হতে যারা সাহসী, এই বই শুধুমাত্র তাদের জন্য।
          </p>
        </div>

        {/* Choice comparison */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-red-50/50 p-4 lg:p-5 space-y-3 border-b md:border-b-0 md:border-r border-red-100">
              <h4 className="text-lg font-black text-red-800 tracking-tight flex items-center gap-2">
                <X size={16} /> যদি না পড়েন:
              </h4>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                {[
                  "অজান্তেই কোনো ভ্রান্ত মতবাদের ঈমানি ঝুঁকিতে থাকবেন।",
                  "ইতিহাস বিকৃতির আড়ালে থাকা সত্য চিরকাল অস্পষ্ট থাকবে।",
                  "আপনার পরবর্তী প্রজন্ম চরমপন্থী চিন্তার সহজ শিকার হবে।",
                ].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 leading-tight opacity-80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50/50 p-4 lg:p-5 space-y-3">
              <h4 className="text-lg font-black text-emerald-800 tracking-tight flex items-center gap-2">
                <Check size={16} /> যদি পড়েন:
              </h4>
              <ul className="space-y-2 text-sm font-bold text-gray-700">
                {[
                  "গত ২০০ বছরের রক্তাক্ত ইতিহাস আয়নার মতো পরিষ্কার হবে।",
                  "সঠিক আকীদার পথ খুঁজে পাবেন এবং বিভ্রান্তিতে অটল থাকবেন।",
                  "সত্যকে আঁকড়ে ধরার প্রশান্তি ও নতুন ঈমানি শক্তি পাবেন।",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 leading-tight">
                    <Check
                      size={14}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1 pt-1">
          <h3 className="text-lg lg:text-xl font-black text-gray-900 tracking-tight">
            সিদ্ধান্ত এখন আপনার
          </h3>
          <p className="font-bold text-gray-500 text-[11px] lg:text-xs italic">
            &quot;অজ্ঞতা কখনো অজুহাত হতে পারে না&quot;
          </p>
        </div>

        <div className="flex justify-center">
          <CTAButtonGroup
            onOrderClick={onOrderClick!}
            onPreviewClick={onPreviewClick}
          />
        </div>
      </div>
    </section>
  );
};

export default FearResponsibility;
