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
      q: "এই বইটি কি শুধু আলেম বা গবেষকদের জন্য?",
      a: "একেবারেই না। বরং যারা আধুনিক প্রচারণার ঘোরে না থেকে ইতিহাসের নির্জলা সত্য জানতে চান, তাদের জন্য এটি সমানভাবে গুরুত্বপূর্ণ। অত্যন্ত সহজ ও সাবলীল বাংলায় লেখা হয়েছে যেন একজন সাধারণ পাঠকও ইতিহাসের গভীর রস আস্বাদন করতে পারেন।",
    },
    {
      q: "ওয়াহাবি আন্দোলন সম্পর্কে তো অনেক কিছু শুনি, এই বইয়ে নতুন কী আছে?",
      a: "জনসাধারণের কাছে অনেক সময় কেবল একপক্ষীয় প্রচারণা পৌঁছায়। এই বইটি আপনাকে ১৯১৫ সালের ‘দারিন চুক্তি’, ইবনে সৌদের মাসোহারা প্রাপ্তি এবং ফিলিস্তিন নিয়ে হওয়া গোপন ষড়যন্ত্রের দালিলিক ইতিহাসের মুখোমুখি করবে, যা সচরাচর আলোচনার বাইরে রাখা হয়।",
    },
    {
      q: "বইটিতে কতগুলো রেফারেন্স বা দলিল আছে?",
      a: "৩৩৫ পৃষ্ঠার এই পর্বতসম বইটিতে বহু প্রামাণ্য রেফারেন্স ও দলিল ব্যবহার করা হয়েছে। অটোমান আর্কাইভ, ব্রিটিশ গোয়েন্দাদের রিপোর্ট, ৫টি দেশের প্রাচীন লাইব্রেরির পাণ্ডুলিপি এবং ৮৫+ শীর্ষ আলেমদের দালিলিক প্রমাণ এখানে সংকলিত হয়েছে।",
    },
    {
      q: "বইটি কি সংগ্রহ করা আমার জন্য জরুরি?",
      a: "আপনি যদি নিজের আকিদা ও ইতিহাসের সঠিক ধারা সম্পর্কে নিশ্চিত হতে চান এবং সমসাময়িক বিভ্রান্তিগুলো থেকে নিজেকে ও পরিবারকে বাঁচাতে চান, তবে এই বইটি আপনার সংগ্রহে রাখা অত্যন্ত জরুরি।",
    },
    {
      q: "অর্ডার করার কতদিনের মধ্যে বই হাতে পাবো?",
      a: "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টা এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে আপনি ক্যাশ অন ডেলিভারি সুবিধায় বই হাতে পাবেন ইনশাআল্লাহ।",
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
      </div>
    </section>
  );
};

export default FAQSection;
