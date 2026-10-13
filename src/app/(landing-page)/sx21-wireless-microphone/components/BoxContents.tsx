import { FiCheckCircle } from "react-icons/fi";
import { MdInbox } from "react-icons/md";

const boxItems = [
  {
    title: "২টি ওয়্যারলেস ট্রান্সমিটার মাইক্রোফোন",
    desc: "ক্লিপ-অন ডিজাইন, অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC) ও মিষ্টি ইকো মোড সম্বলিত ডুয়াল মাইক সেট।",
  },
  {
    title: "১টি প্লাগ অ্যান্ড প্লে টাইপ-সি রিসিভার",
    desc: "কোনো অ্যাপ বা ব্লুটুথ ঝামেলা ছাড়াই ফোনে লাগিয়ে সরাসরি রেকর্ড শুরু করার উচ্চগতির রিসিভার।",
  },
  {
    title: "১টি স্পেশাল আইফোন OTG অ্যাডাপ্টার",
    desc: "আইফোন ব্যবহারকারীদের জন্য স্পেশাল মেটাল ওটিজি অ্যাডাপ্টার — আইফোনে ১০০% প্লাগ-অ্যান্ড-প্লে সংযোগ।",
  },
  {
    title: "১টি টাইপ-সি ফাস্ট চার্জিং ক্যাবল",
    desc: "মাইক্রোফোন দুটি দ্রুততম সময়ে রিচার্জ করার স্ট্যান্ডার্ড ও টেকসই টাইপ-সি ফাস্ট চার্জিং ক্যাবল।",
  },
];

const BoxContents = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-3">
            <MdInbox />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            বক্সের ভেতরে যা যা পাচ্ছেন
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            প্রতিটি প্যাকেটে পাবেন সম্পূর্ণ প্রস্তুত ও প্রিমিয়াম ৪টি এক্সেসরিজ সেট।
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {boxItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-emerald-500/40 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4">
                  <FiCheckCircle />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BoxContents;


