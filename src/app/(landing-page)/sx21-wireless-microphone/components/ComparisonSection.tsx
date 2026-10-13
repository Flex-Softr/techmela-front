import { FiX, FiCheck } from "react-icons/fi";
import { MdVolumeOff, MdMic } from "react-icons/md";

const ComparisonSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-primary font-bold text-xs sm:text-sm tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
            পার্থক্য নিজেই যাচাই করুন
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            কেন সাধারণ মোবাইল দিয়ে ভিডিও বানালে সাউন্ড নষ্ট হয়ে যায়?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            ক্যামেরা যতই ভালো হোক, সাউন্ড কোয়ালিটি বাজে হলে বা বাইরের আওয়াজ থাকলে দর্শক ৫ সেকেন্ডেই ভিডিও স্কিপ করে।
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Ordinary Mobile Microphone (Negative) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-200/80 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-bl-2xl">
              সাধারণ মোবাইল মাইক
            </div>
            <div>
              <div className="size-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-5">
                <MdVolumeOff />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                সাধারণ ফোন মাইকের তীব্র সমস্যা
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                মোবাইলের বিল্ট-ইন মাইক সব ধরণের অবাঞ্ছিত শব্দ একসাথে রেকর্ড করে ফেলে।
              </p>

              <ul className="space-y-4 text-sm sm:text-base text-slate-800">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiX className="text-sm" />
                  </div>
                  <span>বাতাস, ফ্যান ও গাড়ির হর্নে বয়ান বা কিরাতের মূল কথা ঢেকে যায়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiX className="text-sm" />
                  </div>
                  <span>ফোন থেকে মাত্র ২-৩ হাত দূরে গেলেই আওয়াজ অনেক নিচু ও অস্পষ্ট হয়ে যায়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiX className="text-sm" />
                  </div>
                  <span>রুমের ভেতরে রেকর্ড করলে তীব্র ইকো (Echo) ও ফাঁপা আওয়াজ সৃষ্টি হয়।</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiX className="text-sm" />
                  </div>
                  <span>দামি ওয়্যারলেস মাইকের দাম ৫,০০০ থেকে ১০,০০০ টাকা হওয়ায় কেনা সম্ভব হয় না।</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-red-100 text-sm text-red-600 font-bold text-center">
              ফলাফল: ভিডিওর ভিউ কম ও কনটেন্ট নষ্ট হওয়া
            </div>
          </div>

          {/* Card 2: SX21 Wireless Microphone (Positive) */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl relative overflow-hidden flex flex-col justify-between ring-4 ring-emerald-500/10">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-bl-2xl">
              SX21 ওয়্যারলেস ম্যাজিক মাইক
            </div>
            <div>
              <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-5">
                <MdMic />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                SX21 ব্যবহারের চমৎকার ম্যাজিক সুবিধা
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                মাত্র ১,০০০ টাকার মধ্যে স্টুডিও লেভেলের সাউন্ড ও প্রফেশনাল কন্ট্রোল।
              </p>

              <ul className="space-y-4 text-sm sm:text-base text-slate-800">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-slate-800">
                    <strong className="text-emerald-700">ANC নয়েজ ক্যান্সেলেশন:</strong> বাতাস বা কোলাহল থাকলেও শুধু আপনার কণ্ঠস্বরই ক্রিস্টাল ক্লিয়ার শোনা যাবে।
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-slate-800">
                    <strong className="text-emerald-700">ম্যাজিক ইকো (Echo) মোড:</strong> কিরাত, হামদ-নাত বা ইসলামী আলোচনায় মিষ্টি রিভার্ব সাউন্ড তৈরি করবে।
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-slate-800">
                    <strong className="text-emerald-700">ডুয়াল মাইক (২ জন):</strong> একই সাথে দুজন কথা রেকর্ড করতে পারবেন কোনো ওভারল্যাপিং ছাড়া।
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-sm" />
                  </div>
                  <span className="font-medium text-slate-800">
                    <strong className="text-emerald-700">বাজেট ফ্রেন্ডলি:</strong> মাত্র ১,০০০ টাকার মধ্যে প্রিমিয়াম ডুয়াল ওয়্যারলেস মাইক সেট।
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-200 text-sm text-emerald-700 font-bold text-center">
              ফলাফল: ১০০% প্রফেশনাল ও স্টুডিও কোয়ালিটি সাউন্ড
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;
