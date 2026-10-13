import { FiTruck, FiPhoneCall, FiRefreshCw } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";

const guarantees = [
  {
    icon: FiRefreshCw,
    title: "৩ মাসের রিপ্লেসমেন্ট গ্যারান্টি",
    desc: "প্রোডাক্টে যেকোনো ধরণের টেকনিক্যাল বা ফাংশনাল সমস্যা দেখা দিলে সম্পূর্ণ ফ্রিতে রিপ্লেসমেন্ট দেওয়া হবে।",
    highlight: true,
  },
  {
    icon: MdOutlinePayment,
    title: "ক্যাশ অন ডেলিভারি সুবিধা",
    desc: "কোনো অগ্রিম পেমেন্ট ছাড়াই প্রোডাক্ট হাতে পেয়ে চেক করে টাকা দেওয়ার পূর্ণ সুযোগ।",
    highlight: false,
  },
  {
    icon: FiTruck,
    title: "সারাদেশে দ্রুত হোম ডেলিভারি",
    desc: "অর্ডার কনফার্মের পর দ্রুততম সময়ে আপনার ঠিকানায় পার্সেল পৌঁছে দেওয়া হয়।",
    highlight: false,
  },
  {
    icon: FiPhoneCall,
    title: "সার্বক্ষণিক হেল্পলাইন সাপোর্ট",
    desc: "ব্যবহারের নিয়ম ও সেটআপ সংক্রান্ত যেকোনো প্রয়োজনে আমাদের ডেডিকেটেড সাপোর্ট টিম।",
    highlight: false,
  },
];

const TrustGuarantees = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-amber-50 to-orange-50/50 border-2 border-amber-300 shadow-md ring-2 ring-amber-400/20"
                    : "bg-slate-50 border border-slate-100 hover:shadow-xs"
                }`}
              >
                <div
                  className={`size-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    item.highlight
                      ? "bg-amber-500 text-slate-950 shadow-sm"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <h4
                      className={`font-bold text-base ${
                        item.highlight ? "text-amber-950 font-black" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.highlight ? "text-amber-900/90 font-medium" : "text-slate-600"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustGuarantees;
