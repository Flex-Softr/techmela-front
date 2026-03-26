import { FiAlertCircle } from "react-icons/fi";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
  onPreviewClick?: () => void;
};

const PsychologicalDisruption = ({ onOrderClick, onPreviewClick }: Props) => {
  return (
    <section className="bg-white py-6 lg:py-6 px-4 overflow-hidden relative">
      <div className="max-w-5xl mx-auto space-y-6 lg:space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            সমস্যা শুরু হয় তখন:
            <br />
            <span className="text-red-600 block mt-1 leading-snug">
              যখন মানুষ মনে করে তার নিজের সীমিত জ্ঞানই ইসলামের গভীর সত্য
              উপলব্ধির জন্য যথেষ্ট
            </span>
          </h2>
          <p className="font-bold text-gray-600 max-w-4xl mx-auto leading-relaxed text-sm lg:text-base">
            আজকের যুগে “মাযহাব বা বিশেষজ্ঞ ইমামের প্রয়োজন নেই, আমি সরাসরি
            কুরআন-হাদীস বুঝব” - এমন চটকদার স্লোগান আপাতদৃষ্টিতে ভালো মনে হলেও,
            এটিই মানুষকে চূড়ান্ত বিভ্রান্তির দিকে নিয়ে যায়। ইতিহাস সাক্ষী,
            বিশেষজ্ঞহীন এই পথ মানুষকে ঈমানি বিচ্যুতি ও আকিদাগত দুর্বলতার দিকে
            ধাবিত করে।
          </p>
        </div>

        {/* Unified Analogy & Spiral */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-5 lg:p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-black text-sm">
                A
              </div>
              <p className="font-bold text-gray-700 leading-tight">
                অসুস্থ হলে আমরা বিশেষজ্ঞ ডাক্তারের শরণাপন্ন হই, কারণ নিজের
                সিদ্ধান্তে ভুল চিকিৎসা জীবনের জন্য হুমকি হতে পারে।
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-black text-sm">
                B
              </div>
              <p className="font-bold text-gray-700 leading-tight">
                আইনি জটিলতায় আমরা অভিজ্ঞ আইনজীবীর পরামর্শ নেই, কারণ আইনের
                মারপ্যাঁচ নিজে ব্যাখ্যা করা অসম্ভব ও ঝুঁকিপূর্ণ।
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="inline-flex items-center gap-1.5 font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase tracking-wide">
                <FiAlertCircle /> এখানেই শুরু হয় বিপদ
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  t: "“মাযহাব মানবো না, শুধু কুরআন-হাদীস মানবো”",
                  d: "আপাতদৃষ্টিতে এটি চমৎকার স্লোগান মনে হলেও, উসূল ও নীতিমালা ছাড়া সরাসরি কুরআন-হাদীস থেকে বিধান বের করতে গিয়ে মানুষ নিজের অজান্তেই মারাত্মক বিভ্রান্তির জালে জড়িয়ে পড়ে। এটিই বিচ্যুতির প্রথম ধাপ।",
                },
                {
                  t: "“ইমামদের অনুসরণের প্রয়োজন নেই”",
                  d: "চৌদ্দশ বছরের সোনালী ইতিহাস ও জগদ্বিখ্যাত মুজতাহিদ ইমামদের সুসংগঠিত ফিকহি পদ্ধতি ছেড়ে দিয়ে ‘নিজের বুঝকে’ প্রাধান্য দেয়া মূলত নিজের খেয়াল-খুশির অনুসরণ ছাড়া আর কিছু নয়।",
                },
                {
                  t: "“যেকোনো মত বা ফতোয়াই সঠিক হতে পারে”",
                  d: "যখন প্রতিটি ব্যক্তি নিজেই ‘মুজতাহিদ’ বনে যায়, তখন দ্বীনের মূল ভিত্তি নড়বড়ে হয়ে পড়ে। এর শেষ পরিণতি হয় এক চরম আকিদাগত বিপর্যয় ও উম্মাহর মধ্যে অনৈক্য।",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm space-y-2"
                >
                  <div className="w-6 h-6 rounded-md bg-gray-900 text-white flex items-center justify-center font-black">
                    {i + 1}
                  </div>
                  <p className="font-black text-gray-900 leading-tight">
                    {step.t}
                  </p>
                  <p className="font-bold text-gray-500 text-sm leading-tight">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reality Check (Condensed) */}
        <div className="bg-gray-900 px-5 py-4 rounded-2xl text-center space-y-3 shadow-lg">
          <p className="md:text-base font-bold text-gray-200 leading-relaxed">
            কুরআন-হাদীস বুঝা শুধু পড়ার বিষয় না, এটি{" "}
            <span className="text-emerald-400 font-black">
              গভীর জ্ঞান ও পদ্ধতির বিষয়।
            </span>{" "}
            এ পথ ছেড়ে দিলে তৈরি হয়:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["তীব্র মতভেদ", "উম্মাহর বিভক্তি", "আকীদায় সন্দেহ"].map(
              (item, i) => (
                <span
                  key={i}
                  className="bg-white/5 text-gray-300 px-3 py-1 rounded-lg font-bold border border-white/10"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* Transition (Tight) */}
        <div className="text-center space-y-2">
          <div className="space-y-1 text-base lg:text-lg font-black text-gray-900 leading-tight">
            <p>তাহলে নিরাপদ পথ কী?</p>
            <p className="text-emerald-600">
              কীভাবে নিশ্চিত হবেন আপনি সঠিক পথে আছেন?
            </p>
          </div>
          <p className="font-bold text-gray-400">
            বইটি আপনাকে সেই পথের সন্ধান দেবে…
          </p>
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

export default PsychologicalDisruption;
