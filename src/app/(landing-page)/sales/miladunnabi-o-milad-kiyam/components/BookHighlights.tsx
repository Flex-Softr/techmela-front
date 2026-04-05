"use client";
import {
  BadgeCheck,
  CheckCircle,
  Shield,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  previewLink?: string;
  bookTitle?: string;
};

const BookHighlights = ({ onOrderClick, previewLink, bookTitle }: Props) => {
  const highlights = [
    {
      title: '১. "বিদআত" আসলে কী?',
      questions: [
        "বিদআতের প্রকৃত সংজ্ঞা কী? সব নতুন জিনিসই কি বিদআত?",
        '"کل بدعة ضلالة" হাদিসের সঠিক ব্যাখ্যা কী?',
      ],
      conclusion:
        "এই অধ্যায় না বুঝলে পুরো বিতর্কই ভুলভাবে বুঝবেন। বিদআতের প্রকৃত ধারণা এখানে স্পষ্ট করা হয়েছে।",
    },
    {
      title: "২. উসূলুল ফিকহের আলোকে বিশ্লেষণ",
      questions: [
        "ইবাদতের ক্ষেত্রে কিয়াস কীভাবে কাজ করে?",
        '"الأصل في العبادة التوقيف" এর প্রকৃত অর্থ কী?',
      ],
      conclusion:
        "যারা যুক্তি দিয়ে বিষয়টি বুঝতে চান, এই তাত্ত্বিক আলোচনা তাদের জন্য চোখ খুলে দেবে।",
    },
    {
      title: "৩. ৬৪ জন বরেণ্য ইমামের স্পষ্ট বিশ্লেষণ",
      questions: [
        "বিভিন্ন যুগের ফকীহ, মুহাদ্দিস ও মুজতাহিদদের অভিমত কী?",
        "একই মলাটে এত বিশাল স্কেলের দলিল কি আর কোথাও পাওয়া সম্ভব?",
      ],
      conclusion:
        "বইটির সবচেয়ে শক্তিশালী অংশ। বড় বড় ইমামদের বক্তব্য একত্রে এবং রেফারেন্সসহ দেওয়া হয়েছে।",
    },
    {
      title: "৪. মিলাদ উদযাপনের পক্ষে শক্তিশালী দলিল",
      questions: [
        "কুরআন ও সহীহ হাদিস থেকে কী কী প্রমাণ রয়েছে?",
        "ইমামদের ইজতিহাদ ও দলিলভিত্তিক আলোচনার গভীরতা কতটুকু?",
      ],
      conclusion:
        "শুধু আবেগ নয়, প্রমাণের ওপর দাঁড়িয়েই এই আমলটির গ্রহণযোগ্যতা প্রমাণিত।",
    },
    {
      title: "৫. 'মিলাদ বিদআত' দাবির অকাট্য ও দাঁতভাঙা জবাব",
      questions: [
        '"মিলাদ বিদআত", এই দাবির তাত্ত্বিক ও দালিলিক দুর্বলতা কী?',
        "বিরোধীদের মূল যুক্তিগুলো কেন দালিলিকভাবে টিকছে না?",
      ],
      conclusion:
        "এই অংশটি পড়ার পর আপনি শুধু নিজের সংশয় দূর করবেন না, বরং বিভ্রান্তিকারীদের যেকোনো যুক্তির দালিলিক ও অকাট্য উত্তর দিতে পারবেন।",
    },
    {
      title: "৬. ভুল মিলাদ বনাম সঠিক মিলাদ",
      questions: [
        "কোন মিলাদ গ্রহণযোগ্য এবং কোন কাজগুলো পরিত্যাজ্য?",
        "সীমা কোথায় টানতে হবে? ভারসাম্যপূর্ণ দৃষ্টিভঙ্গি কোনটি?",
      ],
      conclusion:
        "Blind support নয়, বরং প্রামাণ্য এবং ভারসাম্যপূর্ণ এক উপলব্ধি এখানে পাবেন।",
    },
  ];

  return (
    <section className="bg-white py-1 lg:py-2 px-4 overflow-hidden relative border-t border-gray-100">
      <div className="max-w-6xl mx-auto space-y-4 lg:space-y-5 relative z-10">
        {/* Header with Authority Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          <div className="lg:col-span-7 space-y-2 lg:space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
              <BadgeCheck size={10} />
              অকাট্য প্রামাণ্য দলিল
            </div>
            <h2 className="text-lg lg:text-2xl font-black text-gray-900 leading-tight">
              এই বই শুধু তথ্য নয়, এটি{" "}
              <span className="text-emerald-600 underline decoration-wavy decoration-emerald-200 underline-offset-4">
                সঠিক সমাধান
              </span>{" "}
              খুঁজে পাওয়ার নির্ভরযোগ্য গাইড
            </h2>
            <p className="text-[13px] lg:text-[14px] font-bold text-gray-500 leading-relaxed max-w-2xl">
              এই বইটি না নিলে আপনি আসলেই একটি গভীর গবেষণালব্ধ কাজ হারাবেন। ৪৪৯
              পৃষ্ঠার এই গ্রন্থে ধাপে ধাপে একটি বিতর্কিত বিষয়কে অকাট্য দলিল,
              ইতিহাস ও ইমামদের বক্তব্য দিয়ে বুঝিয়ে বলা হয়েছে।
            </p>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 bg-gray-900 text-white p-4 lg:p-5 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Shield size={60} />
            </div>
            <div className="relative z-10 space-y-2">
              <h3 className="text-base lg:text-lg font-black leading-tight">
                পড়ার পর আপনার ভাবনা:
                <br />
                <span className="text-emerald-400">আর কোনো সংশয় থাকবে না</span>
              </h3>
              <ul className="space-y-1.5">
                {[
                  "অকাট্য বিষয়টি যাচাই করতে পারবেন",
                  "আত্মবিশ্বাসের সাথে নিজের অবস্থান ব্যাখ্যা করতে পারবেন",
                  "অজ্ঞতা দূর করে নিশ্চিত জ্ঞান অর্জন করবেন",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[12px] font-bold text-gray-300"
                  >
                    <CheckCircle
                      size={12}
                      className="text-emerald-500 shrink-0"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Investigative Grid */}
        <div className="space-y-3 pt-2">
          <div className="text-center space-y-1">
            <h3 className="text-base lg:text-xl font-black text-gray-900 uppercase tracking-normal lg:tracking-tight">
              বইয়ের ভেতরের কিছু{" "}
              <span className="text-emerald-600">চ্যাপ্টার</span>
            </h3>
            <div className="h-1 w-12 bg-emerald-500/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white p-3 lg:p-4 rounded-[1.5rem] border border-gray-100 shadow-[0_2px_10px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-8px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Decorative background curve */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50 to-transparent opacity-60 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110" />

                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 shadow-sm relative z-10">
                    <BookOpen size={14} />
                  </div>
                  <h4 className="font-black text-gray-900 text-[14px] lg:text-[15px] leading-snug mt-1 relative z-10 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="space-y-1.5 mb-3 flex-grow relative z-10">
                  {item.questions.map((q, qIndex) => (
                    <div key={qIndex} className="flex items-start gap-1.5">
                      <ChevronRight
                        size={14}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <p className="text-[12px] lg:text-[13px] font-bold text-gray-600 leading-snug">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-2.5 border-t border-dashed border-gray-200 relative z-10">
                  <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-50/50 group-hover:bg-emerald-50 transition-colors">
                    <span className="text-emerald-700 font-black uppercase tracking-wider text-[9px] bg-emerald-100/80 px-1.5 rounded inline-block mb-1">
                      ফলশ্রুতি
                    </span>
                    <p className="text-[11px] lg:text-[12px] font-black text-gray-800 leading-snug">
                      {item.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-center">
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

export default BookHighlights;
