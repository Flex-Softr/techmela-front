import { FiStar } from "react-icons/fi";

const Testimonials = () => {
  const reviews = [
    {
      title: "আগে আমি প্রচণ্ড বিভ্রান্ত ছিলাম...",
      content:
        "একজন বলতেন বিদআত, আরেকজন বলতেন জায়েজ। বুঝতে পারতাম না কাকে মানবো। এই বইয়ের দলিলগুলো পড়ার পর আজ আমি নিশ্চিত হয়ে আমল করতে পারছি। মনের সব কুয়াশা কেটে গেছে!",
      rating: 5,
    },
    {
      title: "তাত্ত্বিক ও দালিলিক এক অসাধারণ বই",
      content:
        "৪৪৯ পৃষ্ঠার এই বইয়ে কুরআন-হাদিস ও উসূলুল ফিকহের আলোকে যে বিশ্লেষণ দেওয়া হয়েছে, তা সচরাচর পাওয়া যায় না। সঠিক বিষয়টি জানতে হলে এই বইটি পড়া সবার জন্য জরুরি।",
      rating: 5,
    },
    {
      title: "ফেসবুক-ইউটিউবের তর্কের অবসান",
      content:
        "এতদিন শুধু ভিডিও দেখে বিভ্রান্ত হয়েছি। এই বইতে বরেণ্য ইমামদের মতামতগুলো পড়ার পর মিলাদ-কিয়াম নিয়ে আমার ধারণা পাল্টে গেছে। দলিলই শেষ কথা, এটা আজ বুঝলাম।",
      rating: 5,
    },
    {
      title: "পরিবারসহ সবাই উপকৃত হয়েছি",
      content:
        "বইটি পড়ার পর আমাদের ঘরের অনেক ভুল ধারণা দূর হয়েছে। এখন আমরা শান্তিতে দলিলভিত্তিক আমল করতে পারি। সিদ্দীকিয়া প্রকাশনীকে ধন্যবাদ এমন একটি কাজ করার জন্য।",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-4 lg:py-6 px-4 overflow-hidden relative border-t border-b border-gray-100">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-100/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-5 lg:space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm text-emerald-600 font-bold text-[10px] uppercase tracking-widest mx-auto">
            <FiStar className="fill-amber-400 stroke-amber-400 size-3" />
            পাঠক প্রতিক্রিয়া
            <FiStar className="fill-amber-400 stroke-amber-400 size-3" />
          </div>
          <h2 className="text-xl lg:text-3xl font-black text-gray-900 leading-[1.3] lg:leading-tight">
            বাস্তব পরিবর্তন বোঝা যায়,
            <br />
            যখন মানুষ{" "}
            <span className="text-emerald-600 relative inline-block">
              নিজের অভিজ্ঞতা
              <svg
                className="absolute w-full h-2.5 -bottom-1 left-0 text-emerald-200"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 Q 50 0 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            তুলে ধরেন
          </h2>
          <p className="text-[13px] lg:text-[15px] font-bold text-gray-500 max-w-xl mx-auto leading-relaxed">
            এই বই শুধু তাত্ত্বিক আলোচনা নয়, এটি মানুষের আমলী ও ঈমানী জীবনে শতভাগ
            নিশ্চয়তা এবং এক গভীর প্রশান্তি আনতে সক্ষম হয়েছে।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-5 lg:p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_-8px_rgba(16,185,129,0.15)] hover:border-emerald-100 transition-all duration-500 relative group flex flex-col h-full"
            >
              <div className="flex gap-1 text-amber-400 text-sm mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>

              {/* Title & Content */}
              <div className="relative z-10 flex-grow">
                <h4 className="text-[16px] lg:text-[18px] font-black text-gray-900 mb-2 leading-tight">
                  “{review.title}”
                </h4>
                <p className="text-gray-600 text-[13px] lg:text-sm font-bold leading-relaxed">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
