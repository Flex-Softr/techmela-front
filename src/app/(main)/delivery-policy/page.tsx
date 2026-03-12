import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Image from "next/image";
import Link from "next/link";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaMapMarkedAlt,
  FaSearchLocation,
  FaTruck,
} from "react-icons/fa";

const DeliveryPolicyPage = async () => {
  const { data: shippingCharges = [] } = await serverSideFetcher<
    TShippingCharges[]
  >({
    url: "/shipping-charges?isActive=true",
    tags: ["shippingCharge"],
  });

  return (
    <div className="min-h-screen bg-gray-50/30 font-hind-siliguri">
      {/* Premium Hero Section */}
      <section className="relative h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden bg-primary">
        <Image
          src="/images/delivery_hero_new.png"
          alt="ডেলিভারি পলিসি"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            ডেলিভারি পলিসি
          </h1>
          <div className="h-1.5 w-16 bg-white/30 mx-auto rounded-full mb-4" />
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            দ্রুত ও নিরাপদ ডেলিভারি আমাদের অঙ্গীকার। আমাদের শিপিং নীতিমালা
            সম্পর্কে বিস্তারিত জানুন।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-5xl py-8 md:py-10">
        {/* Intro Card */}
        <section className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-xl shadow-gray-200/50 mb-8 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <FaTruck size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              ডেলিভারি এলাকা
            </h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            সিদ্দীকিয়া প্রকাশনী বর্তমানে সমগ্র বাংলাদেশে হোম ডেলিভারি সেবা
            প্রদান করছে। ঢাকার ভিতরে এবং ঢাকার বাইরে যেকোনো প্রান্তে আমরা আমাদের
            পণ্য বিশ্বস্ত কুরিয়ার সার্ভিসের মাধ্যমে নিরাপদভাবে পৌঁছে দিতে
            প্রতিশ্রুতিবদ্ধ।
          </p>
        </section>

        {/* Charges and Timelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Charges Card */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100/50 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <FaMapMarkedAlt size={22} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                ডেলিভারি চার্জ
              </h3>
            </div>
            <ul className="space-y-4">
              {shippingCharges.length > 0
                ? shippingCharges.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100"
                    >
                      <span className="font-medium text-gray-700">
                        {item.name}:
                      </span>
                      <span className="font-black text-primary text-xl">
                        &#2547; {item.amount}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
            <p className="mt-4 text-xs text-gray-400 italic flex items-center gap-2">
              <FaCheckCircle className="text-primary/40 shrink-0" />
              বিশেষ অফার বা প্রমোশনের ক্ষেত্রে ডেলিভারি চার্জ পরিবর্তিত হতে
              পারে।
            </p>
          </section>

          {/* Delivery Timeline Card */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <FaClock size={22} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                ডেলিভারি সময়সীমা
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <span className="font-medium text-gray-700">ঢাকার ভিতরে:</span>
                <span className="font-bold text-primary">২৪ - ৪৮ ঘণ্টা</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <span className="font-medium text-gray-700">ঢাকার বাইরে:</span>
                <span className="font-bold text-primary">৩ - ৫ কার্যদিবস</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 italic flex items-center gap-2">
              <FaCheckCircle className="text-primary/40 shrink-0" />
              অনিবার্য কারণে বা দুর্যোগপূর্ণ আবহাওয়াতে সময় কিছুটা বেশি লাগতে
              পারে।
            </p>
          </section>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Packaging Card */}
          <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100 flex items-start gap-5">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
              <FaBoxOpen size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-emerald-900 mb-2">
                সুরক্ষিত প্যাকেজিং
              </h4>
              <p className="text-emerald-800/80 leading-relaxed font-light text-sm">
                আপনার বই যেন সুরক্ষিত থাকে, সেজন্য আমরা আন্তর্জাতিক মানের
                প্যাকেজিং নিশ্চিত করি। প্রতিটি বই বাবল র‍্যাপ এবং মজবুত বক্সে
                প্যাক করা হয়।
              </p>
            </div>
          </div>

          {/* Tracking Card */}
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-sm">
              <FaSearchLocation size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-2">
                অর্ডার ট্র্যাকিং
              </h4>
              <p className="text-gray-700 leading-relaxed font-light text-sm mb-3">
                আপনার অর্ডারের বর্তমান অবস্থা যেকোনো সময় জানতে আমাদের ট্র্যাকিং
                সিস্টেম ব্যবহার করুন। বা আমাদের হেল্পলাইনে কল করুন।
              </p>
              <Link
                href="/track-your-order"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                অর্ডার ট্র্যাক করুন →
              </Link>
            </div>
          </div>
        </div>

        {/* Final Contact CTA */}
        <div className="bg-primary rounded-[1.5rem] p-6 md:p-8 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            আরও তথ্যের জন্য আমাদের হেল্পলাইনে যোগাযোগ করুন
          </h3>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20">
            <span className="text-2xl md:text-3xl font-black tracking-widest">
              ০১৬০২-৪৩১১৬৭
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPolicyPage;
