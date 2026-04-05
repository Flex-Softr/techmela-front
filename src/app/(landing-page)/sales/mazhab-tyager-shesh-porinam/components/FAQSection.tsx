import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
  previewLink?: string;
  bookTitle?: string;
};

const FAQSection = ({ onOrderClick, previewLink, bookTitle }: Props) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFAQ = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const faqs = [
    {
      q: "এই বইটি কি শুধু আলেমদের জন্য?",
      a: "একেবারেই না। বরং সাধারণ মুসলমানরা যেন সহজে বুঝতে পারে, সেই লক্ষ্যেই অত্যন্ত সাবলীল ভাষায় ও সহজ যুক্তিতে বইটি অনুবাদ ও সম্পাদনা করা হয়েছে। সাধারণ মুসলিম, ছাত্র, আলেম, সবার জন্য। \n\nবিশেষ করে তাদের জন্য, যারা দ্বীনের বিষয়ে নিশ্চিত হতে চান এবং বিভ্রান্তি থেকে বাঁচতে চান।",
    },
    {
      q: "বইটি কি খুব কঠিন? বা পড়তে গিয়ে কি আমার বুঝতে সমস্যা হবে?",
      a: "না, এটি গবেষণাধর্মী হলেও সহজ ও বোধগম্য ভাষায় লেখা। \n\nআপনি ধীরে ধীরে পড়লে সহজেই বুঝতে পারবেন। প্রতিটি বিষয়ের পর উদাহরণ দেওয়া হয়েছে যেন সাধারণ পাঠকের জন্য বুঝতে সহজ হয়। জটিল আরবি পরিভাষাগুলো এড়িয়ে স্পষ্ট বাংলা ব্যবহার করা হয়েছে।",
    },
    {
      q: "আমি সরাসরি কুরআন-হাদিস মানি, তারপরও কি এই বই আমার প্রয়োজন?",
      a: "অবশ্যই প্রয়োজন! কুরআন ও হাদীস সরাসরি মানা সবারই কাম্য। কিন্তু প্রশ্ন হলো, 'আপনার বুঝ' কি সাহাবা, তাবেয়ীন এবং সর্বসম্মত মুজতাহিদ ইমামদের বুঝের চেয়ে বেশি সঠিক হতে পারে?\n\nএই বইটিতে অত্যন্ত যৌক্তিকভাবে দেখানো হয়েছে, শুধু অনুবাদ পড়েই সরাসরি সিদ্ধান্ত নেওয়া কেন বিপদজনক এবং হাদীস থেকে সমাধান বের করার সঠিক নীতিমালা (উসূল) না থাকলে মানুষ কীভাবে নিজের অজান্তেই মারাত্মক বিভ্রান্তির শিকার হতে পারে। এটি আপনার চিন্তার জগতকে নতুন করে সাজাতে সাহায্য করবে।",
    },
    {
      q: "মাযহাব না মানলে কি সমস্যা?",
      a: "এই বইতে বিস্তারিতভাবে দেখানো হয়েছে, কীভাবে এই চিন্তা ধীরে ধীরে বিভ্রান্তির দিকে নিয়ে যায়। ইতিহাস সাক্ষী, যখনই মানুষ বিশেষজ্ঞ ইমামদের পথ ছেড়েছে, তখনই উম্মাহর মধ্যে অনৈক্য ও আকিদাগত বিচ্যুতি দেখা দিয়েছে। \n\nতাই অনুমান না করে, দলিল ও যুক্তি দিয়ে সত্যটা জানাই বুদ্ধিমানের কাজ।",
    },
    {
      q: "আমি তো অন্যভাবে দ্বীন পালন করছি—তা কি ভুল?",
      a: "ভুল কি না, সেটা যাচাই করার জন্যই আপনার এই বইটি পড়া প্রয়োজন। হতে পারে আপনি সঠিক পথেই আছেন, আবার হতে পারে আপনি যেটাকে সঠিক ভাবছেন সেটা আসলে সুক্ষ্ম কোনো বিভ্রান্তি। \n\nসত্য জানার পর যদি দেখেন আপনি সঠিক আছেন, তবে আপনার আত্মবিশ্বাস আরও বাড়বে। আর যদি ভুল চিনে ফেলেন, তবে তা শুধরানোর এটিই সেরা সুযোগ।",
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
                  className="w-full flex items-center justify-between py-3 lg:py-4 text-left focus:outline-none group"
                >
                  <span
                    className={`text-base lg:text-lg font-black pr-4 transition-colors ${isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}
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
                      ? "max-h-[500px] opacity-100 mb-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="text-gray-600 font-bold leading-relaxed whitespace-pre-wrap pr-6 lg:pr-10 text-sm">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <CTAButtonGroup
            onOrderClick={onOrderClick}
            previewLink={previewLink}
            bookTitle={bookTitle}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
