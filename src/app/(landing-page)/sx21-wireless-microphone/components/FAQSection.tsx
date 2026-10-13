"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";

const faqs = [
  {
    q: "আমার ফোনে কি এই SX21 মাইক্রোফোনটি কাজ করবে?",
    a: "হ্যাঁ, এটি সকল টাইপ-সি (Type-C) পোর্টযুক্ত অ্যান্ড্রয়েড ফোন এবং সকল আইফোনে শতভাগ কাজ করবে। আইফোন ইউজারদের জন্য আমরা পার্সেলের সাথে আলাদা প্রিমিয়াম আইফোন OTG অ্যাডাপ্টার দিয়ে থাকি।",
  },
  {
    q: "অর্ডার করার সময় আইফোন ভার্সন কীভাবে সিলেক্ট করব?",
    a: "অর্ডার ফর্মের ওপরে থাকা 'আইফোন ভার্সন (+ OTG সহ)' অপশনটি ক্লিক করে নির্বাচন করে দিন। এতে আমাদের টিম আপনার জন্য আইফোন ওটিজি অ্যাডাপ্টারটি প্যাকেজে যুক্ত করে দেবে।",
  },
  {
    q: "ANC (নয়েজ ক্যান্সেলেশন) এবং ইকো (Echo) মোড কীভাবে চালু করব?",
    a: "মাইক্রোফোনের সাইডে থাকা ডেডিকেটেড বাটন চেপে এক ক্লিকেই ANC অ্যাক্টিভ নয়েজ কাট অন করতে পারবেন। আর পাওয়ার বাটন দুইবার প্রেস করলেই আকর্ষণীয় ইকো (Reverb) মোড চালু হয়ে যাবে—যা মধুর কিরাত ও আলোচনার জন্য চমৎকার!",
  },
  {
    q: "মাত্র এক হাজার টাকার মধ্যে এটি কি সত্যিই ভালো কোয়ালিটি দেবে?",
    a: "অবশ্যই! টেকমেলা সরাসরি সোর্সিং করে সীমিত বাজেটের কনটেন্ট ক্রিয়েটর ও মাদ্রাসা/মসজিদের ইমাম-শিক্ষার্থীদের কাছে সুলভ মূল্যে এটি পৌঁছে দিচ্ছে। পেজে থাকা র' ছবি ও রিভিউ ভিডিওগুলো দেখলেই কোয়ালিটি বুঝতে পারবেন।",
  },
  {
    q: "ডেলিভারি পেতে কতদিন সময় লাগবে এবং ক্যাশ অন ডেলিভারি পাওয়া যাবে কি?",
    a: "হ্যাঁ, সম্পূর্ণ ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন। ঢাকার ভিতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ দিনের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়।",
  },
  {
    q: "পার্সেল রিসিভ করার সময় চেক করার সুযোগ আছে কি?",
    a: "হ্যাঁ! ডেলিভারিম্যানের সামনে পার্সেল চেক করে দেখে নিশ্চিত হয়ে তারপর টাকা পরিশোধ করার পূর্ণ সুবিধা রয়েছে। সাথে থাকছে ৩ মাসের ফুল রিপ্লেসমেন্ট গ্যারান্টি।",
  },
  {
    q: "৩ মাসের রিপ্লেসমেন্ট গ্যারান্টি কীভাবে কাজ করে?",
    a: "প্রোডাক্ট নেওয়ার পর টানা ৩ মাসের মধ্যে মাইক্রোফোনে কোনো ধরণের টেকনিক্যাল বা ফাংশনাল ত্রুটি দেখা দিলে আমাদের কাস্টমার কেয়ার হেল্পলাইনে জানালেই আমরা দ্রুত সম্পূর্ণ ফ্রিতে রিপ্লেসমেন্ট পার্সেল পাঠিয়ে দেব।",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto mb-4">
            <MdHelpOutline />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            অর্ডার করার আগে আপনার মনের সাধারণ প্রশ্নগুলোর দ্রুত উত্তর
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`size-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-slate-500"
                    }`}
                  >
                    <FiChevronDown />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
