"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFAQ = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const faqs = [
    {
      q: "এই বইটি কাদের জন্য?",
      a: "যারা মিলাদ-কিয়াম নিয়ে দ্বিধাদ্বন্দ্বে আছেন, যারা ইউটিউব-ফেসবুকের তর্কে বিভ্রান্ত না হয়ে দলিলসহ সত্য জানতে চান এবং যারা নিজেদের আকীদা ও আমলকে পরকালের জন্য সংশয়মুক্ত করতে চান—এই বই তাদের সবার জন্য।",
    },
    {
      q: "মিলাদুন্নবী ও মিলাদ-কিয়াম বিদআত—এটা তো সবারই জানা বিষয়, তাহলে এই বই কেন?",
      a: '“সবাই জানে”—এই কথাটাই আসলে সবচেয়ে বড় বিভ্রান্তির জায়গা। কোনো কিছুকে "বিদআত" বলার আগে তার শরয়ী সংজ্ঞা ও উসূল জানা অপরিহার্য। আমরা অনেক সময় তা না জেনেই কোনো কিছুকে বিদআত বলে ফেলি, যা মারাত্মক গর্হিত কাজ হতে পারে। এই বই আপনাকে ৬৪ জন বরেণ্য ইমামের দলিল দিয়ে দেখাবে যে বিষয়টির প্রকৃত হুকুম কী।',
    },
    {
      q: "এখানে কি শুধু মিলাদের পক্ষে কথা বলা হয়েছে?",
      a: "না, এটি একটি সম্পূর্ণ নিরপেক্ষ গবেষণাধর্মী গ্রন্থ। এখানে মিলাদ-কিয়ামের পক্ষের যেমন অকাট্য দলিল দেওয়া হয়েছে, তেমনি বিরোধীদের যুক্তিগুলোকেও দালিলিকভাবে বিশ্লেষণ করে তার অসারতা প্রমাণ করা হয়েছে। আপনি নিজেই দলিল দেখে সত্য যাচাই করতে পারবেন।",
    },
    {
      q: "বইয়ে কি রেফারেন্স দেওয়া আছে?",
      a: "অবশ্যই। বইটির প্রতিটি তথ্য এবং ইমামদের প্রতিটি বক্তব্য মূল কিতাবের নাম, খণ্ড ও পৃষ্ঠা নম্বরসহ রেফারেন্স দিয়ে উল্লেখ করা হয়েছে। এটি কোনো মনগড়া সংকলন নয়, বরং ১০০% প্রামাণ্য গবেষণা।",
    },
    {
      q: "মিলাদ বিদআত কিনা—এই বই কি চূড়ান্ত সিদ্ধান্ত দেয়?",
      a: "শরীয়তের প্রতিটি বিষয়ের চূড়ান্ত ফায়সালা আসে কুরআন, সুন্নাহ এবং বরেণ্য ইমামদের ইজতিহাদ থেকে। এই বইটি সেই নির্ভরযোগ্য উৎসগুলো থেকেই আপনার সামনে অকাট্য প্রমাণ তুলে ধরেছে। পড়ার পর আপনার মনে আর কোনো সংশয় থাকবে না, ইনশাআল্লাহ।",
    },
    {
      q: "মিলাদ-কিয়াম নিয়ে অনেক মতভেদ আছে, এই বই কি বিভ্রান্তি বাড়াবে?",
      a: "না, বরং এটি বিভ্রান্তি দূর করবে। কারণ এখানে কোনো মনগড়া কথা নেই, বরং শতাব্দী ধরে মুসলিম উম্মাহর নির্ভরযোগ্য ৬৪ জন বরেণ্য ইমাম ও মনীষীর অকাট্য দলিল ও রেফারেন্স তুলে ধরা হয়েছে। অকাট্য বিষয়টি জানার পর আপনার সংশয় দূর হবে।",
    },
    {
      q: "অর্ডার করার কতদিনের মধ্যে বই হাতে পাবো?",
      a: "ঢাকার ভেতরে ২-৩ দিন এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে আপনি আপনার ঠিকানায় বই পেয়ে যাবেন ইনশাআল্লাহ।",
    },
  ];

  return (
    <section className="bg-white py-6 lg:py-6 px-4 overflow-hidden relative">
      <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6 relative z-10">
        <div className="text-center space-y-1">
          <h2 className="text-xl lg:text-2xl font-black text-gray-900">
            সাধারণ জিজ্ঞাসাসমূহ
          </h2>
          <p className="text-sm font-bold text-gray-500">
            বইটি সম্পর্কে আপনার মনে থাকা কিছু প্রশ্নের উত্তর
          </p>
        </div>

        <div className="border-t border-gray-100">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="border-b border-gray-100">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between py-2.5 lg:py-4 text-left focus:outline-none group"
                >
                  <span
                    className={`text-[14px] lg:text-lg font-black pr-4 transition-colors leading-snug ${isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-gray-900" : "text-gray-400 group-hover:text-gray-600"}`}
                  >
                    <FiChevronDown className="text-xl" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[500px] opacity-100 mb-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="text-gray-600 font-bold leading-relaxed whitespace-pre-wrap pr-6 lg:pr-10 text-[13px] lg:text-sm">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
