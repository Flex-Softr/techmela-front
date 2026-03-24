"use client";
import { FiStar } from "react-icons/fi";

const Testimonials = () => {
  const reviews = [
    {
      title: "ইতিহাসের এই গোপন অধ্যায় আগে জানতাম না",
      content:
        "আমি আগে ভাবতাম—ইউটিউবে যা শুনি তাই সত্য। কিন্তু এই বইয়ের ৩১০ পৃষ্ঠায় ব্রিটিশ গোয়েন্দা ‘জন ফিলবি’ ও ইবনে সৌদের সেই গোপন ‘দারিন চুক্তি’র দালিলিক প্রমাণ পড়ার পর আমার চোখ খুলে গেছে। আমরা আসলে ভুল ইতিহাসে বাস করছি।",
      rating: 5,
    },
    {
      title: "ফিলিস্তিন বিক্রির তথ্য জেনে শিউরে উঠেছি",
      content:
        "৩৩৫ পৃষ্ঠার এই পর্বতসম গবেষণাটি পড়ার পর বুঝলাম, কেন আমাদের পূর্বপুরুষদের আমলকে আমরা আজ ‘শিরক-বিদআত’ বলছি। ফিলিস্তিন রাষ্ট্রটি ইহুদিদের হাতে তুলে দেওয়ার পেছনে তৎকালীন শাসকদের যে গোপন চিঠি ও ২০ মিলিয়ন পাউন্ডের প্রস্তাবের কথা বইটিতে দালিলিকভাবে এসেছে জানলে আপনি শিউরে উঠবেন।",
      rating: 5,
    },
    {
      title: "৮৫+ উলামার ফতোয়া ও অকাট্য দলিল",
      content:
        "আল্লামা আনোয়ার শাহ কাশ্মীরী রহ. ও হুসাইন আহমদ মাদানী রহ.-এর সতর্কবাণীগুলো এই বইটিকে সাধারণ ইতিহাস থেকে আলাদা করে দিয়েছে। আরবের শীর্ষ আলেমদের সম্মিলিত ফতোয়া ও দালিলিক প্রতিরোধই প্রমাণ করে—এটি কোনো আবেগ নয়, বরং খাঁটি দলিলের সংকলন।",
      rating: 5,
    },
    {
      title: "মক্কা-মদিনায় রক্তপাতের নেপথ্যে ব্রিটিশ ষড়যন্ত্র",
      content:
        "মক্কা-মদিনার পবিত্র ভূমিতে আহলে সুন্নাতের আলেমদের সাথে যে নৃশংস আচরণ করা হয়েছে এবং ব্রিটিশদের থেকে ১০ মিলিয়ন পাউন্ড মাসোহারা প্রাপ্তির তথ্যটি উম্মাহর শেষ খিলাফত পতনের নেপথ্য কারণগুলো বুঝতে সাহায্য করেছে। অসাধারণ গবেষণা!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-6 lg:py-10 px-4 overflow-hidden relative border-t border-gray-100">
      <div className="max-w-6xl mx-auto relative z-10 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            সত্যিকারের পরিবর্তন বোঝা যায়—
            <br />
            <span className="text-emerald-600 mt-1 block">
              যখন মানুষ নিজের অভিজ্ঞতা শেয়ার করে
            </span>
          </h2>
          <p className="text-sm font-bold text-gray-600">
            এই বই শুধু তাত্ত্বিক আলোচনা নয়, এটি মানুষের চিন্তার জগতে এক বৈপ্লবিক
            পরিবর্তন আনতে সক্ষম হয়েছে।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-1 text-amber-400 text-sm mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
                <h4 className="text-[15px] font-black text-gray-900 mb-2 leading-tight">
                  “{review.title}”
                </h4>
                <p className="text-gray-600 text-[13px] lg:text-sm font-bold leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
