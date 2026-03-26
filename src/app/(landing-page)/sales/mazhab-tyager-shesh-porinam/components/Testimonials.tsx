import { FiStar } from "react-icons/fi";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
  onPreviewClick?: () => void;
};

const Testimonials = ({ onOrderClick, onPreviewClick }: Props) => {
  const reviews = [
    {
      title: "আমার অনেক ভুল ধারণা ভেঙে গেছে",
      content:
        "আমি আগে ভাবতাম, মাযহাব মানা আসলে জরুরি না। কিন্তু এই বই পড়ার পর বুঝলাম, আমি বিষয়টাকে খুবই সরলভাবে দেখছিলাম। এখন আমার দৃষ্টিভঙ্গি পুরোপুরি বদলে গেছে।",
      rating: 5,
    },
    {
      title: "দ্বীনের ব্যাপারে নতুনভাবে চিন্তা করতে শিখেছি",
      content:
        "এই বই আমাকে শিখিয়েছে, দ্বীনকে নিজের মতো বুঝা কতটা ঝুঁকিপূর্ণ হতে পারে। এখন বুঝতে পারছি, কেন ইমামদের অনুসরণ জরুরি।",
      rating: 5,
    },
    {
      title: "দলিল ও যুক্তির দিক থেকে অসাধারণ",
      content:
        "অনেক বইয়ে আবেগ বেশি থাকে, কিন্তু এখানে প্রতিটি কথার পেছনে দলিল আছে। পড়তে গিয়ে মনে হয়েছে, আমি সত্যিই কিছু শিখছি।",
      rating: 5,
    },
    {
      title: "আমার ভিতরের সন্দেহ দূর হয়েছে",
      content:
        "কিছুদিন ধরে দ্বিধায় ছিলাম, কোনটা ঠিক বুঝতে পারছিলাম না। এই বই আমাকে সেই বিভ্রান্তি থেকে বের হতে সাহায্য করেছে।",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-6 lg:py-6 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            সত্যিকারের পরিবর্তন বোঝা যায়:
            <br />
            <span className="text-emerald-600 mt-1 block">
              যখন মানুষ নিজের অভিজ্ঞতা শেয়ার করে
            </span>
          </h2>
          <p className="text-sm font-bold text-gray-600">
            এই বই শুধু তাত্ত্বিক আলোচনা নয়, এটি মানুষের চিন্তা বদলাতে সক্ষম
            হয়েছে।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex gap-1 text-amber-400 text-sm mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-black text-gray-900 mb-1">
                  “{review.title}”
                </h4>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <CTAButtonGroup
            onOrderClick={onOrderClick}
            onPreviewClick={onPreviewClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
