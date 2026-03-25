"use client";
import { AlertTriangle } from "lucide-react";

const PsychologicalDisruption = () => {
  return (
    <section className="relative pb-6 pt-2 lg:pb-8 px-4 overflow-hidden bg-white border-t border-gray-100 border-b">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-red-100 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-orange-100 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto space-y-4 lg:space-y-8 relative z-10">
        <div className="text-center space-y-2 lg:space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full font-black uppercase tracking-wider lg:tracking-[0.2em] border border-red-100 text-[10px] lg:text-[12px]">
            <AlertTriangle size={12} className="shrink-0" />
            বিভ্রান্তির এই যুগে সঠিক আসলে কোনটি?
          </div>

          <h2 className="text-lg lg:text-3xl font-black text-gray-900 leading-[1.3] lg:leading-tight">
            একদল বলছে &apos;জায়েজ&apos;, অন্যদল বলছে{" "}
            <span className="text-red-600 underline decoration-wavy decoration-red-200 underline-offset-4">
              &apos;বিদআত&apos;!
            </span>
          </h2>

          <p className="text-[13px] lg:text-base font-bold text-gray-500 leading-relaxed max-w-2xl mx-auto px-2">
            এই পরস্পরবিরোধী বক্তব্যের মাঝে সাধারণ মানুষ আজ দিশেহারা। কিয়ামতের
            দিন যখন হিসাব দিতে হবে, তখন কি শুধু &quot;অমুক শাইখ বা বক্তার কাছে
            শুনেছি&quot; বলে পার পাওয়া যাবে? একটি ভুল বিশ্বাস আপনার সারাজীবনের
            আমলকে প্রশ্নবিদ্ধ করতে পারে।
          </p>
        </div>

        {/* Shock Warning Card - The Comprehensive Quote */}
        <div className="relative group max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white border border-red-100 p-4 lg:p-8 rounded-[2rem] shadow-xl overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50" />

            <div className="mx-auto w-10 h-10 lg:w-16 lg:h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200 mb-3 lg:mb-4 relative z-10">
              <AlertTriangle size={20} className="text-white lg:w-7 lg:h-7" />
            </div>

            <h3 className="text-xs lg:text-lg font-black text-red-600 uppercase tracking-widest mb-1 lg:mb-2 relative z-10">
              একটি ভয়াবহ সতর্কতা!
            </h3>

            <p className="text-gray-900 font-bold text-balance text-sm lg:text-xl leading-relaxed relative z-10">
              &quot;কোনো কিছুকে বিদআত বলার আগে, এগুলো আমাদের ভালো মত বুঝা ও জানা
              প্রয়োজন। না বুঝেই যদি কোনো কিছুকে আমি-আপনি বিদআত বলি, আর সেটা যদি
              আসলেই বিদআত না হয়, মনে রাখবেন, তাহলে আমি-আপনি নিজেই কিন্তু দ্বীন
              ইসলাম ও শরীয়ত বিকৃতিকারী তথা বিদআতী হবো!&quot;
            </p>
          </div>
        </div>

        {/* Transition */}
        <div className="text-center pt-1 lg:pt-4 max-w-2xl mx-auto space-y-2 lg:space-y-4">
          <h3 className="text-base lg:text-3xl font-black text-gray-900 leading-[1.3] lg:leading-tight">
            তাহলে, এই <span className="text-red-600">বিভ্রান্তির অন্ধকার</span>{" "}
            থেকে বের হওয়ার উপায় কী?
          </h3>
          <p className="text-[13px] lg:text-base font-bold text-gray-600 leading-relaxed px-4">
            কে কী বললো—শুধু সেই শোনা কথা বা গালগল্প দিয়ে বিশ্বাস গড়া কি নিরাপদ?
            কিয়ামতের কঠিন ময়দানে এর জবাবদিহিতা কিভাবে করবেন? সঠিক পথ পেতে হলে—
          </p>
          <div className="inline-block bg-red-50 px-4 py-2 lg:px-6 lg:py-3 rounded-2xl border border-red-100 shadow-sm mt-1 lg:mt-4">
            <p className="font-black text-red-600 text-[14px] lg:text-xl uppercase tracking-wider">
              শোনা কথা নয়, আপনার প্রয়োজন অকাট্য দলিল!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychologicalDisruption;
