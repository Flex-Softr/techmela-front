"use client";
import { X, Check, ShieldCheck, AlertCircle } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
};

const FinalPsychologicalClose = ({ onOrderClick }: Props) => {
  return (
    <section className="relative py-8 lg:py-12 px-4 overflow-hidden bg-gray-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[350px] bg-red-900/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        {/* Badge */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-400 uppercase tracking-widest bg-red-900/40 px-5 py-2 rounded-full border border-red-800/50">
            <AlertCircle size={12} />
            শেষ কথা — সিদ্ধান্ত আপনার
          </span>
        </div>

        {/* Headline */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1]">
            অজ্ঞতা কখনো
            <br />
            <span className="text-red-500">অজুহাত হতে পারে না</span>
          </h2>
          <p className="text-gray-400 font-bold text-base max-w-xl mx-auto leading-relaxed">
            যে ইতিহাস আপনার ঈমান ও উম্মাহর ঐক্যের উপর সরাসরি প্রভাব ফেলছে—তা কি আপনি অবহেলা করতে পারেন?
          </p>
        </div>

        {/* Two paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-950/60 border border-red-800/50 rounded-3xl p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-3xl" />
            <h4 className="font-black text-red-400 text-lg pl-3">আজ না নিলে—</h4>
            <ul className="space-y-2 pl-3">
              {[
                "ইতিহাসের ধামাচাপা দেওয়া সত্য চিরকাল অজানা থেকে যাবে",
                "আধুনিক প্রচারণার স্রোতেই গা ভাসিয়ে চলবেন",
                "সন্তানরা একই ভুল ইতিহাস শিখতে থাকবে",
              ].map((t, i) => (
                <li key={i} className="text-gray-400 font-bold text-sm flex items-start gap-2 leading-snug">
                  <X size={14} className="text-red-600 shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-3xl p-5 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-3xl" />
            <h4 className="font-black text-emerald-400 text-lg pl-3">আজ নিলে—</h4>
            <ul className="space-y-2 pl-3">
              {[
                "দালিলিক পথে ইতিহাসের সত্যের মুখোমুখি হবেন ইনশাআল্লাহ",
                "বিভ্রান্তির হাত থেকে নিজেকে ও পরিবারকে রক্ষা করবেন",
                "ঈমানি শান্তি ও মানসিক দৃঢ়তা অনুভব করবেন",
              ].map((t, i) => (
                <li key={i} className="text-gray-300 font-bold text-sm flex items-start gap-2 leading-snug">
                  <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="text-xl lg:text-2xl font-black text-white flex items-center justify-center gap-2">
            <ShieldCheck size={22} className="text-primary" />
            সত্যকে জানুন। নিজেকে সত্যের উপর অবিচল রাখুন।
          </h3>
          <p className="text-sm font-bold text-gray-500 max-w-md mx-auto">
            মাত্র ৳৩৫০ বিনিয়োগে সত্য ও বিভ্রান্তির পার্থক্য বোঝার এই সুযোগ হাতছাড়া করবেন না।
          </p>
          <CTAButtonGroup onOrderClick={onOrderClick!} />
          <div className="flex items-center justify-center gap-5 flex-wrap pt-1">
            {["ক্যাশ অন ডেলিভারি", "সারাদেশে ডেলিভারি", "সীমিত স্টক"].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <Check size={11} className="text-primary" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalPsychologicalClose;
