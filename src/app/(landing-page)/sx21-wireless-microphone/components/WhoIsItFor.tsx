import { 
  MdOutlineSchool, 
  MdOutlineMosque, 
  MdOutlineMenuBook, 
  MdOutlineVideocam, 
  MdOutlineCardTravel,
  MdOutlinePhoneAndroid
} from "react-icons/md";

const userCategories = [
  {
    icon: MdOutlineSchool,
    title: "মাদ্রাসার শিক্ষার্থী ও তালিবে ইলম",
    description: "মাদ্রাসায় পড়াশোনা করেন? মধুর কণ্ঠে সুন্দর কিরাত, হামদ-নাত, হিফজ পাঠ বা ইসলামিক কনটেন্ট রেকর্ড করতে এটি সেরা সঙ্গী।",
    badge: "মাদ্রাসা স্পেশাল",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    icon: MdOutlineMosque,
    title: "মসজিদের ইমাম, খতিব ও হুজুর",
    description: "মসজিদে জুমার খুতবা, বয়ান, ইসলামিক নসিহা ও তালীমি আলোচনা মোবাইল দিয়ে স্পষ্ট ও গম্ভীর সাউন্ডে ভিডিও রেকর্ড করতে পারবেন।",
    badge: "ইমাম ও খতিব",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    icon: MdOutlineMenuBook,
    title: "শিক্ষক ও এডুকেশনাল কনটেন্ট ক্রিয়েটর",
    description: "অনলাইন ক্লাস, একাডেমিক লেকচার, কোচিং ও স্কিল ডেভেলপমেন্ট ভিডিও বানাতে যারা সহজ ও স্বল্প বাজেটের মাইক খুঁজছেন।",
    badge: "শিক্ষামূলক কনটেন্ট",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    icon: MdOutlineCardTravel,
    title: "ডেইলি ভ্লগার ও ট্রাভেলার",
    description: "বাইরে বা রাস্তায় ঘুরে ঘুরে ভিডিও করেন? বাতাসে বা গাড়ির হর্নেও কথা থাকবে সম্পূর্ণ পরিষ্কার ও শ্রুতিমধুর।",
    badge: "আউটডোর ভ্লগিং",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    icon: MdOutlineVideocam,
    title: "ফেসবুক ও ইউটিউব ভিডিও মেকার",
    description: "ফেসবুক পেইজ বা ইউটিউব চ্যানেলের জন্য নিয়মিত টকিং-হেড, রিভিউ বা টিউটোরিয়াল ভিডিও বানানোর প্রফেশনাল অডিও পার্টনার।",
    badge: "ইউটিউব ও ফেসবুক",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
  {
    icon: MdOutlinePhoneAndroid,
    title: "মোবাইল দিয়ে যেকোনো ভিডিও কনটেন্ট মেকার",
    description: "বাজেট সীমিত (মাত্র ১,০০০ টাকার মধ্যে) কিন্তু মোবাইল দিয়ে ক্রিস্টাল ক্লিয়ার প্রফেশনাল সাউন্ডে ভিডিও বানাতে চান।",
    badge: "স্বল্প বাজেট মেকার",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
];

const WhoIsItFor = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-widest uppercase bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full inline-block mb-3">
            টার্গেটেড ইউজার
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            মূলত কাদের জন্য এই SX21 ওয়্যারলেস ম্যাজিক মাইক্রোফোন?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            সীমিত বাজেটের মধ্যে মোবাইল দিয়ে যারা পরিষ্কার ও স্টুডিও কোয়ালিটি সাউন্ডে ভিডিও বানাতে চান—তাদের জন্যই এটি তৈরি।
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-amber-400/50 rounded-2xl p-6 backdrop-blur-xs transition-all duration-300 hover:bg-white/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <Icon />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span>✓</span> ১০০% পারফেক্ট সাউন্ড সাপোর্ট
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhoIsItFor;
