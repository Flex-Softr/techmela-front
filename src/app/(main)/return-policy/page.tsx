"use client";
// import EcButton from "@/components/EcButton/EcButton";
import React from "react";

const ReturnPolicyPage: React.FC = () => {
  // Todo: Return policy form link
  // const handleRedirect = () => {
  //   window.open(
  //     "https://docs.google.com/forms/d/1dB5WDBUcWtlxp3NTgET5uxUIjk8OTc_IQxVg4OJ_b54/edit",
  //     "_blank"
  //   );
  // };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 mt-14">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        সিদ্দীকিয়া প্রকাশনী রিটার্ন পলিসি
      </h1>

      <section className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
          ভূমিকা:
        </h2>
        <p className="text-gray-600 leading-relaxed">
          প্রিয় গ্রাহক! সিদ্দীকিয়া প্রকাশনী গ্রাহকদের সর্বোত্তম সেবা নিশ্চিত
          করার জন্য প্রতিশ্রুতিবদ্ধ। আমরা চাই আপনি আমাদের পণ্য কিনে সন্তুষ্ট
          হোন। তবে কোনো কারণে যদি আপনাকে পণ্য ফেরত দিতে হয়, তাহলে এই নীতিমালা
          আপনাকে সঠিক পদ্ধতি সম্পর্কে জানাবে।
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
            রিটার্নের সময়সীমা:
          </h2>
          <p className="text-gray-600">
            পণ্যটি পাওয়ার{" "}
            <span className="font-bold text-primary">২৪ ঘণ্টার</span> মধ্যে
            রিটার্নের জন্য আবেদন করতে হবে।
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm ">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
            পণ্য ফেরতের পদ্ধতি:
          </h2>
          <p className="text-gray-600 text-sm">
            পণ্য ফেরত দেওয়ার জন্য কারণ উল্লেখ করে আমাদের কাস্টমার কেয়ারে দ্রুত
            যোগাযোগ করুন এবং নির্দেশিকা অনুসরণ করুন।
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-green-50/30 p-6 rounded-xl border border-green-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-green-800 border-b border-green-100 pb-2">
            কখন পণ্য ফেরত নেয়া হবে:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>দোষপূর্ণ পণ্য: ম্যানুফ্যাকচারিং ত্রুটি বা কাজ না করলে।</li>
            <li>ভুল পণ্য: আপনাকে ভুল পণ্য পাঠানো হলে।</li>
            <li>ক্ষতিগ্রস্ত পণ্য: ডেলিভারির সময় ক্ষতিগ্রস্ত হলে।</li>
          </ul>
        </section>

        <section className="bg-red-50/30 p-6 rounded-xl border border-red-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-red-800 border-b border-red-100 pb-2">
            কখন ফেরত নেয়া হবে না:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>গ্রাহকের ব্যবহারজনিত ক্ষতি।</li>
            <li>প্যাকেজিং ক্ষতিগ্রস্ত হলে।</li>
            <li>নির্ধারিত সময়ের পরে আবেদন করলে।</li>
            <li>সেলের আইটেম (সাধারণত ফেরতযোগ্য নয়)।</li>
          </ul>
        </section>
      </div>

      <section className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">
          টাকা রিফান্ড প্রক্রিয়া:
        </h2>
        <p className="text-gray-600 leading-relaxed">
          রিটার্ন পণ্যটি আমাদের হাতে পৌঁছানোর পর পরীক্ষা করে{" "}
          <span className="font-bold">৩ কার্যদিবসের</span> মধ্যে আপনার পেমেন্ট
          ফেরত দেওয়া হবে। রিফান্ডের জন্য আপনি যে পেমেন্ট পদ্ধতি ব্যবহার করেছেন,
          সেই পদ্ধতিতেই টাকা ফেরত দেয়া হবে।
        </p>
      </section>
      {/* ToDo: retun apply form link */}
      {/* <div className="flex flex-col items-center justify-center gap-4 bg-primary/5 p-8 rounded-2xl border border-primary/10">
        <p className="text-gray-700 font-medium">
          নিচে ক্লিক করে এখনই আবেদন করুন:
        </p>
        <EcButton
          onClick={handleRedirect}
          className="text-white px-10 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          রিটার্নের জন্য আবেদন করুন
        </EcButton>
      </div> */}

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-1 text-sm">যোগাযোগ:</p>
        <p className="text-xl font-bold text-gray-800">01602431167</p>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
