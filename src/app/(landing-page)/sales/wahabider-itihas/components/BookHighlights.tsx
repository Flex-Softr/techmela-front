"use client";
import { BadgeCheck, CheckCircle, Shield } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
};

const BookHighlights = ({ onOrderClick, onPreviewClick }: Props) => {
  const trustStats = [
    { num: "৩৩৫", label: "পৃষ্ঠার দালিলিক ইতিহাস" },
    { num: "৮৫+", label: "শীর্ষ উলামার ফতোয়া" },
    { num: "১০ মি.", label: "পাউন্ডের ব্রিটিশ রহস্য" },
    { num: "১০০%", label: "নির্ভরযোগ্য রেফারেন্স" },
  ];

  const highlights = [
    {
      title: "১. নজদ ও রাসূল (সা.)-এর ভবিষ্যৎবাণী",
      questions: [
        "রাসূল (সা.)-এর সেই নজদ বিষয়ক ভবিষ্যৎবাণীগুলোর সঠিক দালিলিক ব্যবচ্ছেদ কী?",
        "ইমাম ইবনে আবিদিন শামী রহ. কেন এই মতবাদকে ‘খারেজী’ বলেছেন? [৭৮৩]",
      ],
      conclusion:
        "নজদ অঞ্চলের ভৌগোলিক প্রেক্ষাপট এবং হাদীস ও ইমামদের ফতোয়ার আলোকে এর ভয়াবহতা এখানে ফুটে উঠেছে।",
    },
    {
      title: "২. মুহাম্মদ ইবনে আব্দুল ওয়াহাব—কে এই ব্যক্তি?",
      questions: [
        "তার জন্ম, বেড়ে ওঠা এবং উম্মাহর প্রচলিত ধারার বিরুদ্ধে বিদ্রোহের আদ্যোপান্ত কী?",
        "তার নিজের বাবা ও ভাই কি তাকে নিয়ে আগে থেকেই সতর্ক করেছিলেন?",
      ],
      conclusion:
        "ওয়াহাবি আন্দোলনের সংস্থাপকের জীবন ও তার চিন্তাধারার রক্তাক্ত বিবর্তন দালিলিক তথ্যের ভিত্তিতে বিশ্লেষণ করা হয়েছে।",
    },
    {
      title: "৩. ব্রিটিশ ও ইবনে সৌদ: গোপন চুক্তির রহস্য",
      questions: [
        "১৯১৫ সালের ‘দারিন চুক্তি’ ও ব্রিটিশদের থেকে মাসোহারা প্রাপ্তির নেপথ্য কাহিনী কী? [৩১০]",
        "ফিলিস্তিন রাষ্ট্রটি ইহুদিদের হাতে তুলে দেওয়ার পেছনে তৎকালীন শাসকদের গোপন চিঠি ও ২০ মিলিয়ন পাউন্ডের প্রস্তাব। [৩৭৭, ৩৮১]",
      ],
      conclusion:
        "ব্রিটিশ গোয়েন্দা জন ফিলবি ও লরেন্স অফ অ্যারাবিয়ার মরণফাঁদে পা দিয়ে খিলাফত ধ্বংসের নীল নকশা এখানে উন্মোচিত।",
    },
    {
      title: "৪. মক্কা ও মদিনায় রক্তগঙ্গা ও বিভীষিকা",
      questions: [
        "মক্কা-মদিনার পবিত্র ভূমিতে আহলে সুন্নাতের আলেমদের সাথে কী নৃশংস আচরণ করা হয়েছিল?",
        "অসংখ্য নিরপরাধ মুসলিম ও হাজীদের শাহাদাত বরণের সেই লোমহর্ষক ইতিবৃত্ত কী?",
      ],
      conclusion:
        "এক মর্মান্তিক ও রক্তাক্ত বাস্তবতার চিত্রায়ন, যা ইতিহাসের পাতায় আধুনিক প্রচারণার আড়ালে ধামাচাপা দেওয়া হয়।",
    },
    {
      title: "৫. ঐতিহাসিক নিদর্শন ধ্বংসের করুণ ইতিবৃত্ত",
      questions: [
        "কেন তারা জান্নাতুল বাকী ও জান্নাতুল মুয়াল্লার পবিত্র স্মৃতিগুলো মাটির সাথে মিশিয়ে দিয়েছিল?",
        "সাহাবায়ে কেরাম ও আহলে বায়তের মাজার গুঁড়িয়ে দেওয়ার পেছনে তাদের ‘তাকফিরি’ যুক্তি কী ছিল?",
      ],
      conclusion:
        "মুসলিম উম্মাহর হাজার বছরের ঐতিহ্য ও শেকড় উপড়ে ফেলার সেই ভয়াবহ ইতিহাস এখানে বর্ণিত হয়েছে।",
    },
    {
      title: "৬. আকাবিরে দেওবন্দ ও উম্মাহর উলামাদের অবস্থান",
      questions: [
        "আল্লামা আনোয়ার শাহ কাশ্মীরী রহ. ও হুসাইন আহমদ মাদানী রহ. কেন এই নজদী ফিতনা নিয়ে কঠোর ছিলেন?",
        "আরব, মিশর ও তুরস্কের শীর্ষ আলেমদের সম্মিলিত ফতোয়া ও দালিলিক প্রতিরোধ কী ছিল?",
      ],
      conclusion:
        "উম্মাহর বিজ্ঞ আলেমদের দৃষ্টিভঙ্গি ও ৮৫+ নির্ভরযোগ্য সূত্রের ভিত্তিতে ওয়াহাবি মতবাদের ব্যবচ্ছেদ জানুন।",
    },
  ];

  return (
    <section className="bg-white py-10 lg:py-16 px-4 overflow-hidden relative border-t border-gray-50">
      <div className="max-w-6xl mx-auto space-y-10 lg:space-y-16 relative z-10">
        {/* Header with Authority Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
              <BadgeCheck size={12} />
              অকাট্য প্রামাণ্য দলিল
            </div>
            <h2 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight">
              এই বই শুধু ইতিহাস নয়—এটি{" "}
              <span className="text-emerald-600 underline decoration-wavy decoration-emerald-200 underline-offset-4">
                বিস্মৃত সত্যের
              </span>{" "}
              এক দালিলিক প্রতিচ্ছবি
            </h2>
            <p className="text-sm lg:text-base font-bold text-gray-500 leading-relaxed max-w-2xl">
              আপনি যা জানেন তা হয়তো কেবল প্রচারণার ক্ষুদ্র অংশ। এই ৩৩৫ পৃষ্ঠার
              পর্বতসম গবেষণাপত্রে ধামাচাপা দেওয়া সত্যগুলো প্রতিটি নির্ভরযোগ্য
              রেফারেন্স সহ উন্মোচন করা হয়েছে।
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {trustStats.map((s, i) => (
                <div
                  key={i}
                  className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100 text-center"
                >
                  <p className="text-xl font-black text-emerald-600">{s.num}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 bg-gray-900 text-white p-6 lg:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <Shield size={120} />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl lg:text-2xl font-black leading-tight">
                পড়ার পর আপনার সামনে—
                <br />
                <span className="text-emerald-400">
                  ইতিহাস হবে আয়নার মতো পরিষ্কার
                </span>
              </h3>
              <ul className="space-y-3">
                {[
                  "ভ্রান্ত মতবাদের শিকড় চিনতে পারবেন",
                  "ঐতিহাসিক নীল নকশা উন্মোচিত হবে",
                  "নিজের বিশ্বাসের ভিত্তি শানিত হবে",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm font-bold text-gray-300"
                  >
                    <CheckCircle
                      size={14}
                      className="text-emerald-500 shrink-0"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 6-Point Investigative Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
              ইনভেস্টিগেটিভ চ্যাপ্টারসমূহ—
            </p>
            <div className="h-1 w-20 bg-emerald-500/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="group bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <h4 className="font-black text-gray-900 text-lg leading-tight">
                    {item.title}
                  </h4>

                  <div className="space-y-1 pl-3 border-l-2 border-gray-100">
                    {item.questions.map((q, qIndex) => (
                      <p
                        key={qIndex}
                        className="text-sm font-black text-gray-700"
                      >
                        — {q}
                      </p>
                    ))}
                  </div>

                  <p className="text-sm font-bold text-gray-800 pt-2 border-t border-gray-50">
                    <span className="text-primary font-black mr-1">
                      সারমর্ম:
                    </span>
                    {item.conclusion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-2">
              এই বইয়ের বিশেষ বৈশিষ্ট্য
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-700">
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    আবেগ নয়, দলিলভিত্তিক আলোচনা:
                  </span>
                  কুরআন, হাদীস এবং নির্ভরযোগ্য ঐতিহাসিক সূত্রের আলোকে প্রতিটি
                  বিষয় বিশ্লেষণ করা হয়েছে।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    গোপন নথিপত্রের উন্মোচন:
                  </span>
                  ব্রিটিশ ও অটোমান নথিপত্রের আলোকে এই আন্দোলনের নেপথ্য কারিগরদের
                  চিনে নিন।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    জটিল ইতিহাস সহজভাবে উপস্থাপন:
                  </span>
                  কঠিন ও গবেষণাধর্মী বিষয়গুলোকে সাধারণ মানুষের জন্য অত্যন্ত
                  সাবলীল ভাষায় লেখা হয়েছে।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    উম্মাহর ঐক্যের গুরুত্ব অনুধাবন:
                  </span>
                  কেন এবং কীভাবে উম্মাহর ঐক্যে ফাটল ধরানো হয়েছিল, তা স্পষ্টভাবে
                  বুঝতে পারবেন।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    ৩৩৫ পৃষ্ঠার প্রামাণ্য দলিল:
                  </span>
                  একই মলাটে ইতিহাসের চাঞ্চল্যকর সব তথ্যের এক বিশাল তথ্যসমৃদ্ধ
                  সংকলন।
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtonGroup
            onOrderClick={onOrderClick!}
            onPreviewClick={onPreviewClick}
          />
        </div>
      </div>
    </section>
  );
};

export default BookHighlights;
