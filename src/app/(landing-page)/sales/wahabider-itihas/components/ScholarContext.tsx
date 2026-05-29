import Image from "next/image";
import { FiAward, FiBookOpen, FiFeather } from "react-icons/fi";

const ScholarContext = () => {
  return (
    <section className="bg-gray-900 text-white py-6 lg:py-10 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
            ঐতিহাসিক প্রামাণ্যতা ও{" "}
            <span className="text-primary underline underline-offset-8 decoration-primary/30">
              নির্ভরযোগ্যতা
            </span>
          </h2>
          <p className="text-gray-400 font-bold max-w-2xl mx-auto text-sm lg:text-base">
            ইতিহাসের সত্যনিষ্ঠ বয়ান তখনই সম্ভব, যখন তা প্রামাণ্য উৎস ও
            নির্ভরযোগ্য ব্যক্তিত্বের মাধ্যমে উপস্থাপিত হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AUTHOR */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform">
              <FiFeather />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-white">মূল লেখক</h4>
              <p className="text-emerald-400 font-black text-sm">
                আহমদ জাওদাত পাশা (রহ.)
              </p>
            </div>
            <p className="text-gray-400 font-bold text-sm leading-relaxed">
              উসমানীয় তুরস্কের প্রাক্তন শিক্ষামন্ত্রী ও জগদ্বিখ্যাত ঐতিহাসিক।
              যিনি সরাসরি উসমানীয় আর্কাইভে রাখা নথিপত্র থেকে নিরপেক্ষেভাবে
              ইতিহাস সংকলন করেছেন।
            </p>
          </div>

          {/* TRANSLATOR */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl group-hover:scale-110 transition-transform">
              <FiAward />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-white">
                অনুবাদ ও সম্পাদনা
              </h4>
              <p className="text-emerald-400 font-black text-sm">
                ইয়াসির আরাফাত আল হিন্দী
              </p>
            </div>
            <p className="text-gray-400 font-bold text-sm leading-relaxed">
              ইসলামী জ্ঞানের দালিলিক প্রসারে নিবেদিতপ্রাণ গবেষক ও অনুবাদক। তিনি
              মূল টেক্সটের পবিত্রতা রক্ষা করে অত্যন্ত সাবলীল ভাষায় ও প্রামাণ্য
              রেফারেন্সসহ অনুবাদ সম্পন্ন করেছেন।
            </p>
          </div>

          {/* PUBLISHER */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 transition-transform">
              <FiBookOpen />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-white">প্রকাশনী</h4>
              <p className="text-emerald-400 font-black text-sm">
                সিদ্দীকিয়া প্রকাশনী
              </p>
            </div>
            <p className="text-gray-400 font-bold text-sm leading-relaxed">
              উন্নত মুদ্রণ ও বিশুদ্ধ ইসলামী সাহিত্যের প্রসারে সিদ্দীকিয়া
              প্রকাশনী উম্মাহর সেবায় কাজ করে যাচ্ছে। আমাদের প্রতিটি বই আকিদাগত
              বিশুদ্ধতা ও দালিলিক প্রমাণের সমন্বয়।
            </p>
          </div>
        </div>

        {/* Siddikia Badge */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Image
                src="/logo.webp" // Use fallback logo
                alt="Siddikia Logo"
                width={40}
                height={40}
                className="opacity-80"
              />
            </div>
            <div>
              <p className="font-black text-white text-lg leading-tight italic decoration-indigo-200">
                সিদ্দীকিয়া প্রকাশনী
              </p>
              <p className="text-xs font-bold text-gray-400 italic">
                প্রামাণ্য ইসলামী সাহিত্যের নির্ভরযোগ্য নাম।
              </p>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
            <p className="text-emerald-400 font-black text-sm italic">
              &quot;ইতিহাসের প্রতিটি অধ্যায় দালিলিকভাবে প্রমাণিত&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarContext;
