import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  highlights?: { icon: string; title: string; description: string }[];
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
};

const BookHighlights = ({ onOrderClick, onPreviewClick }: Props) => {
  const highlights = [
    {
      title: "১. মাজহাবের স্বরূপ ও আবশ্যকতা",
      questions: [
        "মাজহাব কি নিছক ব্যক্তিগত মত, নাকি সুসংগঠিত ফিকহি পদ্ধতি?",
        "দলিল ও যুক্তির আলোকে এর তাত্ত্বিক ও ব্যবহারিক প্রয়োজনীয়তা কী?",
      ],
      conclusion:
        "মাজহাবের প্রকৃত পরিচয় ও দ্বীনের ওপর টিকে থাকতে এর অপরিহার্য ভূমিকা এখানে সুনিপুণভাবে ব্যাখ্যা করা হয়েছে।",
    },
    {
      title: "২. নস ও ইজতিহাদের সঠিক নীতিমালা",
      questions: [
        "কুরআন-হাদীস কি যে কেউ সরাসরি বুঝতে পারে?",
        "নীতিমালার অভাব কীভাবে মানুষকে চরম বিভ্রান্তির দিকে ঠেলে দেয়?",
      ],
      conclusion:
        "কুরআন ও সুন্নাহর বিধানগুলো নির্ভুলভাবে বোঝার প্রামাণিক উসূল ও শারঈ মানদণ্ড এখানে উপস্থাপিত হয়েছে।",
    },
    {
      title: "৩. মুজতাহিদ ইমামগণের অনুসরণের বাস্তবতা",
      questions: [
        "জগদ্বিখ্যাত চার ইমামের অনুসরণ কি “অন্ধত্ব”, নাকি বিশেষজ্ঞের দেখানো পথ?",
        "কেন উম্মাহর চার সোনালী ধারাকে আঁকড়ে ধরা নিরাপদ?",
      ],
      conclusion:
        "ইমামদের সুশৃঙ্খল পদ্ধতির অনুসরণ যে মূলত সুন্নাহরই অনুসরণ—তা এখানে অকাট্য দলিলে প্রমাণিত হয়েছে।",
    },
    {
      title: "৪. লা-মাযহাব চিন্তার সূক্ষ্ম ব্যবচ্ছেদ",
      questions: [
        "“মাজহাব ছাড়ো” স্লোগানের পেছনের আসল উদ্দেশ্য ও ইতিহাস কী?",
        "এই ভ্রান্ত চিন্তার তাত্ত্বিক অসারতা ও দলিলগুলো কতটা দুর্বল?",
      ],
      conclusion:
        "আধুনিক ‘লা-মাযহাব’ ফেতনার অসারতা ও উম্মাহর ঐক্যে এর নেতিবাচক প্রভাবগুলো এখানে উন্মোচিত হয়েছে।",
    },
    {
      title: "৫. বিচ্যুতি ও ইতিহাসের অমোঘ শিক্ষা",
      questions: [
        "সালাফে সালেহীন ও সোনালী যুগ থেকে বিচ্যুত হওয়ার ঐতিহাসিক পরিণতি কী?",
        "অতীতে যখনই মানুষ মাজহাব ছেড়েছে, সমাজে কি কি সংকট তৈরি হয়েছে?",
      ],
      conclusion:
        "বাস্তব ইতিহাস ও দৃষ্টান্ত দিয়ে দেখানো হয়েছে— বিশেষজ্ঞরা রাস্তা না মানলে আধ্যাত্মিক ও সামাজিক বিপর্যয় অনিবার্য।",
    },
    {
      title: "৬. আকিদার প্রশ্নে আপসহীন সতর্কতা",
      questions: [
        "ভুল ইজতিহাদি পদ্ধতি কীভাবে অলক্ষেই ঈমানের মূল ভিত্তি বা আকিদাকে দুষিত করে?",
        "কীভাবে নিজের আকিদাকে এই সব বিচ্যুতি থেকে রক্ষা করবেন?",
      ],
      conclusion:
        "বিপথগামী প্রতিটি পা ফেলে কীভাবে আকিদায় ফাটল ধরে এবং তা থেকে বাঁচার উপায় এখানে বর্ণনা করা হয়েছে।",
    },
  ];

  return (
    <section
      className="bg-white py-8 lg:py-8 px-4 overflow-hidden relative"
      id="highlights"
    >
      <div className="max-w-screen-2xl mx-auto space-y-8 lg:space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-5">
          <h2 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight">
            এই বই শুধু একটি মতামত নয়—
            <br />
            <span className="text-primary mt-2 block">
              এটি একটি পূর্ণাঙ্গ বিশ্লেষণ
            </span>
          </h2>
          <div className="pt-4 flex flex-col md:flex-row items-center justify-center">
            <p className="text-lg font-bold text-gray-500 mb-1">
              আপনি হয়তো ভাবছেন—
            </p>
            <p className="text-xl font-black text-gray-800 bg-gray-50 inline-block px-6 py-2 rounded-xl border border-gray-100">
              “এই বইয়ে নতুন কী আছে?”
            </p>
          </div>
        </div>

        {/* The 7 Points Grid */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-black text-gray-900 border-b-2 border-primary inline-block pb-1">
              বইয়ের ভিতরে আপনি যা পাবেন
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-gray-300 transition-colors flex flex-col h-full"
              >
                <div className="space-y-3 flex-grow">
                  <h4 className="text-lg font-black text-gray-900 leading-tight">
                    {item.title}
                  </h4>

                  <div className="space-y-1 pl-3 border-l-2 border-gray-100">
                    {item.questions.map((q, qIndex) => (
                      <p
                        key={qIndex}
                        className="text-sm font-black text-gray-700"
                      >
                        — {q}
                      </p>
                    ))}
                  </div>

                  <p className="text-sm font-bold text-gray-800 pt-2 border-t border-gray-50">
                    <span className="text-primary font-black mr-1">
                      সারমর্ম:
                    </span>
                    {item.conclusion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-2">
              এই বইয়ের বৈশিষ্ট্য
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-700">
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    আবেগ নয়, দলিলভিত্তিক আলোচনা:
                  </span>
                  কুরআন, সহীহ হাদীস এবং ইজমার আলোকে প্রতিটি বিষয় তাত্ত্বিকভাবে
                  বিশ্লেষণ করা হয়েছে।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    জটিল বিষয় সহজভাবে উপস্থাপন:
                  </span>
                  উসূলুল ফিকহ ও আকীদার মতো কঠিন বিষয়গুলো সাধারণ মানুষের জন্য
                  সহজবোধ্য করে ব্যাখ্যা করা হয়েছে।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    তাত্ত্বিক না, বাস্তবতার সাথে সংযোগ:
                  </span>
                  বর্তমান সময়ের ‘লা-মাযহাব’ ফেতনার স্বরূপ ও এর নেতিবাচক
                  প্রভাবগুলো সরাসরি তুলে ধরা হয়েছে।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    শুধু তথ্য না, চিন্তার পরিবর্তন:
                  </span>
                  এটি শুধু বই নয়, বরং আপনার দ্বীনি বুঝ ও বিশ্বাসের ভিত্তি মজবুত
                  করার একটি প্রামাণিক গাইড।
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary shrink-0">✓</span>
                <div>
                  <span className="text-gray-900 block font-black">
                    বিশ্বস্ত পাথেয়:
                  </span>
                  উম্মাহর শ্রেষ্ঠ মুহাক্কিক ইমাম জাহিদ আল-কাউসারী (রহ.)-এর
                  গবেষণালব্ধ শক্তিশালী লেখনী।
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
            <h3 className="text-xl font-black leading-tight">
              এই বই পড়ার পর—
              <br />
              <span className="text-primary mt-2 block">
                আপনি আর আগের মতো চিন্তা করতে পারবেন না
              </span>
            </h3>
            <p className="text-sm font-bold text-gray-400 mt-4 border-t border-gray-800 pt-4">
              কারণ এটি কেবল আপনার তথ্যের ভাণ্ডার বাড়াবে না, বরং আপনার লালিত
              বিশ্বাসের ভিত্তি ও চিন্তার পদ্ধতিকেই আমূল বদলে দেবে। আপনি বুঝতে
              পারবেন— তথাকথিত “নিজে সরাসরি বুঝার” পদ্ধতিটি আসলে কতটা ঝুঁকিপূর্ণ
              ও বিভ্রান্তিকর হতে পারে।
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButtonGroup
            onOrderClick={onOrderClick!}
            onPreviewClick={onPreviewClick}
          />
        </div>
      </div>
    </section>
  );
};

export default BookHighlights;
