import {
  MdOutlineBatteryChargingFull,
  MdOutlinePhoneAndroid,
  MdOutlineRecordVoiceOver,
  MdOutlineSettingsInputAntenna,
  MdOutlineSpatialAudio,
  MdOutlineTune
} from "react-icons/md";

const features = [
  {
    icon: MdOutlineSpatialAudio,
    title: "ANC (অ্যাক্টিভ নয়েজ ক্যান্সেলেশন)",
    desc: "স্মার্ট ANC চিপ বাইরের বাতাস, গাড়ির হর্ন ও ট্রাফিকের বিরক্তিকর শব্দ স্বয়ংক্রিয়ভাবে ফিল্টার করে শুধু আপনার স্পষ্ট কণ্ঠস্বর রেকর্ড করে।",
    badge: "স্মার্ট ANC মোড",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: MdOutlineTune,
    title: "ম্যাজিক ইকো (Echo / Reverb) মোড",
    desc: "কিরাত, হামদ-নাত, ইসলামী সংগীত বা আলোচনার জন্য এতে রয়েছে চমৎকার ইকো/রিভার্ব মোড, যা আপনার সাউন্ডে স্টুডিও পরিবেশ তৈরি করে।",
    badge: "ইকো মোড",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: MdOutlineRecordVoiceOver,
    title: "ডুয়াল ট্রান্সমিটার (একসাথে ২ জন)",
    desc: "একই রিসিভারে ২টি মাইক্রোফোন একসাথে সংযুক্ত। মাদ্রাসা ও মসজিদের দুজন সাথী বা ইন্টারভিউয়ের জন্য সেরা ডুয়াল রেকর্ডিং সুবিধা।",
    badge: "ডাবল মাইক",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: MdOutlinePhoneAndroid,
    title: "অ্যান্ড্রয়েড ও আইফোন (OTG সহ)",
    desc: "সব ধরনের মোবাইল ফোনে সাপোর্ট করে। আইফোন ইউজারদের জন্য সাথে দেওয়া হবে আলাদা আইফোন OTG অ্যাডাপ্টার।",
    badge: "অল-ডিভাইস",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    icon: MdOutlineSettingsInputAntenna,
    title: "২৫ মিটার বাধাহীন ওয়্যারলেস রেঞ্জ",
    desc: "2.4GHz আল্ট্রা-স্টেবল ফ্রিকোয়েন্সি টেকনোলজি। খোলা জায়গায় ২৫ মিটার দূর থেকেও কোনো ল্যাগ বা সাউন্ড ড্রপ ছাড়াই কাজ করে।",
    badge: "2.4GHz ওয়্যারলেস",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: MdOutlineBatteryChargingFull,
    title: "৬ ঘণ্টা + পর্যন্ত লং ব্যাটারি ব্যাকআপ",
    desc: "একবার চার্জ দিয়ে একটানা সারাদিন ভিডিও রেকর্ডিং ও আলোচনা করতে পারবেন। সাথে রয়েছে টাইপ-সি ফাস্ট চার্জিং সুবিধা।",
    badge: "লং ব্যাকআপ",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-primary font-bold text-xs sm:text-sm tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
            ম্যাজিক ফিচারসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            SX21 ওয়্যারলেস ম্যাজিক মাইক্রোফোনের স্পেশাল ফিচার
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            মাত্র ১,০০০ টাকার মধ্যে এমন প্রিমিয়াম ফিচার বাজারে আর কোনো মাইক্রোফোনে পাবেন না।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-slate-50/80 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="size-14 rounded-2xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center text-3xl transition-colors duration-300">
                    <Icon />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${feature.badgeColor}`}>
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeatureHighlights;
