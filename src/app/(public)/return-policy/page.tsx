import Image from "next/image";
import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUndoAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50/30 font-hind-siliguri">
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Custom Brand Image with Overlay */}
        <Image
          src="/images/return_hero_new.png"
          alt="রিটার্ন পলিসি"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            রিটার্ন পলিসি
          </h1>
          <div className="h-1.5 w-16 bg-white/30 mx-auto rounded-full mb-3" />
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            গ্রাহক সন্তুষ্টি আমাদের মূল লক্ষ্য। আমাদের পণ্য ফেরতের নিয়মাবলী নিচে
            বিস্তারিত দেওয়া হলো।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-5xl py-6 md:py-8">
        {/* Introduction Card */}
        <section className="bg-white rounded-[1.5rem] p-5 md:p-6 shadow-xl shadow-gray-200/50 mb-6 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FaUndoAlt size={20} />
            </span>
            ভূমিকা
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            প্রিয় গ্রাহক! সিদ্দীকিয়া প্রকাশনী গ্রাহকদের সর্বোত্তম সেবা নিশ্চিত
            করার জন্য প্রতিশ্রুতিবদ্ধ। আমরা চাই আপনি আমাদের পণ্য কিনে সন্তুষ্ট
            হোন। তবে কোনো কারণে যদি আপনাকে পণ্য ফেরত দিতে হয়, তাহলে এই নীতিমালা
            আপনাকে সঠিক পদ্ধতি সম্পর্কে জানাবে।
          </p>
        </section>

        {/* Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Timeline Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-lg shadow-gray-100/50">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <FaClock size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              রিটার্নের সময়সীমা
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              পণ্যটি পাওয়ার{" "}
              <span className="text-primary font-bold">২৪ ঘণ্টার</span> মধ্যে
              রিটার্নের জন্য আবেদন করতে হবে। সময়ের ব্যাপারে সচেতন থাকা জরুরি।
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-lg shadow-gray-100/50">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
              <FaPhoneAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              পণ্য ফেরতের পদ্ধতি
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              পণ্য ফেরত দেওয়ার জন্য উপযুক্ত কারণ উল্লেখ করে আমাদের কাস্টমার
              কেয়ারে দ্রুত যোগাযোগ করুন এবং আমাদের গাইডলাইন অনুসরণ করুন।
            </p>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Eligibility Card */}
          <section className="bg-emerald-50/50 rounded-[1.5rem] p-6 md:p-8 border border-emerald-100 shadow-sm relative overflow-hidden">
            <FaCheckCircle className="absolute -right-6 -bottom-6 text-emerald-200/30 text-9xl rotate-12" />
            <h2 className="text-2xl font-bold text-emerald-900 mb-8 border-b border-emerald-100 pb-4">
              কখন পণ্য ফেরত নেয়া হবে:
            </h2>
            <ul className="space-y-4">
              {[
                "দোষপূর্ণ পণ্য: ম্যানুফ্যাকচারিং ত্রুটি বা ছাপার ভুল থাকলে।",
                "ভুল পণ্য: অর্ডার করা বইয়ের বদলে অন্য বই পাঠানো হলে।",
                "ক্ষতিগ্রস্ত পণ্য: ডেলিভারির সময় বই ছিঁড়ে গেলে বা নষ্ট হলে।",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-emerald-800"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Rejection Card */}
          <section className="bg-rose-50/50 rounded-[1.5rem] p-6 md:p-8 border border-rose-100 shadow-sm relative overflow-hidden">
            <FaTimesCircle className="absolute -right-6 -bottom-6 text-rose-200/30 text-9xl -rotate-12" />
            <h2 className="text-2xl font-bold text-rose-900 mb-8 border-b border-rose-100 pb-4">
              কখন ফেরত নেয়া হবে না:
            </h2>
            <ul className="space-y-4">
              {[
                "গ্রাহকের ব্যবহারজনিত কারণে কোনো ক্ষতি হলে।",
                "বইয়ের মূল প্যাকেজিং ক্ষতিগ্রস্ত বা হারানো গেলে।",
                "নির্ধারিত ২৪ ঘণ্টা সময় পার হওয়ার পর আবেদন করলে।",
                "সেলের আইটেম বা বিশেষ অফারে কেনা পণ্য।",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-rose-800">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Refund Process */}
        <section className="bg-primary text-white rounded-[1.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border-b-4 border-amber-500/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            টাকা রিফান্ড প্রক্রিয়া
          </h2>
          <p className="text-white/90 text-lg leading-relaxed font-light max-w-3xl">
            রিটার্ন পণ্যটি আমাদের হাতে পৌঁছানোর পর পরীক্ষা করে{" "}
            <span className="text-amber-300 font-bold underline decoration-amber-500/50 underline-offset-4">
              ৩ কার্যদিবসের
            </span>{" "}
            মধ্যে আপনার পেমেন্ট ফেরত দেওয়া হবে। রিফান্ডের জন্য আপনি যে পেমেন্ট
            পদ্ধতি ব্যবহার করেছেন, সম্ভবত সেই মাধ্যমেই টাকা ফেরত দেয়া হবে।
          </p>
        </section>

        {/* Final Contact Footer */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em]">
            আরও তথ্যের জন্য
          </p>
          <div className="inline-flex items-center gap-4 py-3 px-8 bg-white rounded-full shadow-lg border border-gray-100">
            <FaPhoneAlt className="text-primary" />
            <span className="text-2xl font-black text-gray-900 tracking-wider">
              ০১৩৩৯-৯৫৫১৫৫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
