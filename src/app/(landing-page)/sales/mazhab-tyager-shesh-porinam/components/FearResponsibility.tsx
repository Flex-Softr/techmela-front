import CTAButtonGroup from "./CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
};

const FearResponsibility = ({ onOrderClick, onPreviewClick }: Props) => {
  const values = [
    {
      title: "১. ঈমান আমলকে নিরাপদ রাখার সচেতনতা",
      points: [
        "আপনি বুঝতে পারবেন কোন চিন্তা ধীরে ধীরে ভুল পথে নিয়ে যেতে পারে",
        "অর্থাৎ আপনি নিজেকে সুরক্ষিত রাখতে পারবেন",
      ],
    },
    {
      title: "২. সঠিক পথের স্পষ্ট দিকনির্দেশনা",
      points: [
        "বিভ্রান্তির মাঝে কোনটা অনুসরণ করবেন, তা পরিষ্কার হয়ে যাবে",
        "আপনার মাঝে আর কোনো দ্বিধা থাকবে না",
      ],
    },
    {
      title: "৩. দলিলভিত্তিক আত্মবিশ্বাস",
      points: [
        "শুধু “বিশ্বাস” করবেন না, বরং জানবেন—কেন বিশ্বাস করছেন",
        "কুরআন, হাদীস, ইজমা ও যুক্তি মিলে একটি দৃঢ় ভিত্তি",
      ],
    },
    {
      title: "৪. বিভ্রান্ত চিন্তা চেনার ক্ষমতা",
      points: [
        "কেউ কিছু বললেই আর আপনি বিভ্রান্ত হবেন না",
        "নিজেই বুঝতে পারবেন কোনটা সঠিক, আর কোনটা ভুল",
      ],
    },
  ];

  return (
    <section className="bg-white py-6 lg:py-6 px-4 overflow-hidden relative border-t border-gray-50">
      <div className="max-w-4xl mx-auto space-y-5 lg:space-y-6">
        {/* Hook */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            কিছু বই জ্ঞান বাড়ায়…
            <br />
            <span className="text-emerald-600 mt-1 block">
              আর কিছু বই আপনার পথ ঠিক করে দেয়
            </span>
          </h2>
          <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl inline-block">
            <p className="text-sm font-black text-gray-900 leading-relaxed">
              এই বই আপনার চিন্তার ভিত্তি ঠিক করে দেবে ইনশাআল্লাহ।
            </p>
          </div>
        </div>

        {/* Value List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
            >
              <h4 className="font-black text-gray-900 mb-1">{v.title}</h4>
              <ul className="space-y-0.5">
                {v.points.map((p, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-sm font-bold text-gray-600 flex items-start gap-1.5 leading-tight"
                  >
                    <span className="text-gray-400">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The Choice (Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 lg:p-6 rounded-2xl border border-gray-200">
          <div className="space-y-3">
            <h4 className="text-2xl font-black text-red-800">
              আপনি যদি এটি না পড়েন—
            </h4>
            <ul className="space-y-2.5 text-sm font-bold text-gray-800 pb-3 border-b md:border-b-0 border-gray-200">
              <li className="leading-tight">
                — আপনি হয়ত অজান্তেই এমন কোনো পথে চলছেন যা কুরআন-হাদীসের প্রকৃত
                চেতনার পরিপন্থী।
              </li>
              <li className="leading-tight">
                — বিশেষজ্ঞ ইমামদের পথ বর্জন করে নিজের খেয়াল-খুশির অনুসরণে পড়ার
                ঝুঁকি থেকে যাবে।
              </li>
              <li className="leading-tight">
                — আধুনিক চটকদার স্লোগানের আড়ালে থাকা বিভ্রান্তি আপনার ঈমানের
                ভিত্তি নড়বড়ে করতে পারে।
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:pl-5 md:border-l border-gray-200">
            <h4 className="text-2xl font-black text-emerald-800">
              আর যদি পড়েন—
            </h4>
            <div className="space-y-2.5">
              <ul className="space-y-2.5 text-sm font-bold text-gray-800">
                <li className="leading-tight">
                  — ১৪০০ বছরের সোনালী ইতিহাস ও ইমামদের সুশৃঙ্খল পদ্ধতির উপর
                  আপনার আস্থা মজবুত হবে।
                </li>
                <li className="leading-tight">
                  — দলিল ও যুক্তির আলোকে ‘বিরাজমান ফেতনা’ ও ‘ভুল পথ’ চেনার মতো
                  বিচক্ষণতা অর্জন করবেন।
                </li>
                <li className="leading-tight">
                  — নিজের ঈমান ও আমলকে বিচ্যুতি থেকে বাঁচিয়ে সঠিক গন্তব্যে
                  পৌঁছানোর পরিষ্কার রোডম্যাপ পাবেন।
                </li>
              </ul>
              <p className="text-sm font-black text-emerald-600 pt-1">
                সিদ্ধান্ত নিতে পারবেন— চোখ বন্ধ করে না, চোখ খুলে।
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-2xl font-black text-gray-900 leading-tight">
            সিদ্ধান্ত এখন আপনার
          </h3>
          <p className="font-bold text-gray-600">
            আপনি কি নিশ্চিত জ্ঞান নিয়ে চলবেন, নাকি অনুমানের উপর?
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <CTAButtonGroup
            onOrderClick={onOrderClick!}
            onPreviewClick={onPreviewClick}
          />
        </div>
      </div>
    </section>
  );
};

export default FearResponsibility;
