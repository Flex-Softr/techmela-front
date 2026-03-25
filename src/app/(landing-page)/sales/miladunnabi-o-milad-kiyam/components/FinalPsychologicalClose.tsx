"use client";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
};

const FinalPsychologicalClose = ({ onOrderClick }: Props) => {
  return (
    <section className="bg-emerald-950 py-10 lg:py-16 px-4 text-center relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-800/50 blur-[100px] rounded-full -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/50 blur-[100px] rounded-full -ml-40 -mb-40"></div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        <div className="space-y-4">
          <h2 className="text-2xl lg:text-4xl font-black text-white leading-[1.3] lg:leading-tight">
            সিদ্ধান্ত এখন আপনার:
            <br />
            <span className="text-emerald-400">
              আপনি কি “শোনা কথার ওপর” দ্বীন পালন করবেন? নাকি “দলিলভিত্তিক
              নিশ্চিত জ্ঞান” নিয়ে চলবেন?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-3">
            <h4 className="text-xl font-black text-red-400">
              যদি অকাট্য বিষয়াদি না জানেন:
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm font-bold">
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">•</span>
                অজান্তেই কোনো ভ্রান্ত মতবাদের ওপর দাঁড়িয়ে থাকবেন যা আপনার আমল ও
                ঈমানের জন্য ঝুঁকি তৈরি করছে।
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">•</span>
                সঠিক বিষয় না জেনে ইউটিউব-ফেসবুকে শোনা কথার ওপর আমল করে যাবেন।
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">•</span>
                রাসূল ﷺ-এর প্রতি ভালোবাসার সঠিক এবং ভারসাম্যপূর্ণ রূপটি অজানাই
                থেকে যাবে।
              </li>
            </ul>
          </div>
          <div className="bg-emerald-900/50 border border-emerald-500/20 p-6 rounded-3xl space-y-3 shadow-xl">
            <h4 className="text-xl font-black text-emerald-400">
              আর যদি পড়েন:
            </h4>
            <ul className="space-y-2 text-emerald-50 text-sm font-bold">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                মিলাদ-কিয়াম নিয়ে আপনার মনে থাকা সব সংশয় ও দ্বিধাদ্বন্দ্ব ধূলিসাৎ
                হবে ইনশাআল্লাহ।
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                ৬৪ জন বরেণ্য ইমামের দালিলিক প্রমাণের ওপর ভিত্তি করে আপনার
                বিশ্বাস সুদৃঢ় করতে পারবেন।
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                নবীর ﷺ প্রতি ভালোবাসার এই আবেগগুলোকে দলিল দিয়ে শানিত ও শক্তিশালী
                করতে পারবেন।
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 space-y-8 flex flex-col items-center">
          <div className="space-y-2">
            <h3 className="text-2xl lg:text-3xl font-black text-white">
              আপনার সঠিক পথ চয়ন করুন এখনই
            </h3>
            <p className="text-emerald-200 font-bold text-lg">
              আজকেই আপনার কপিটি সংগ্রহ করুন
            </p>
          </div>

          <CTAButtonGroup
            onOrderClick={onOrderClick}
            className="scale-100 lg:scale-110 xl:scale-125"
          />

          <p className="text-emerald-400/60 font-black text-xs uppercase tracking-widest pt-4">
            সীমিত সময়ের জন্য বিশেষ ছাড় ও নিরাপদ ডেলিভারি
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalPsychologicalClose;
