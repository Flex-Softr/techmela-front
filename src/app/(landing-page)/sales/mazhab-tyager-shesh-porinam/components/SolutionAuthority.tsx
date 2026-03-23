import { FiCheckCircle } from "react-icons/fi";
import CTAButtonGroup from "./CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
  onPreviewClick?: () => void;
  thumbnailSrc?: string;
};

const SolutionAuthority = ({ onOrderClick, onPreviewClick }: Props) => {
  return (
    <section className="bg-[#FAFAFA] py-6 lg:py-6 px-4 overflow-hidden relative">
      <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8 relative z-10">
        {/* UNIFIED SOLUTION & AUTHORITY */}
        <div className="space-y-6 lg:space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-[1.1]">
              সত্যকে চিনতে হলে— নিজের ধারণা নয়,
              <br />
              <span className="text-primary mt-1 block">
                সঠিক পদ্ধতির প্রয়োজন
              </span>
            </h2>
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-gray-100 shadow-sm inline-block mx-auto mt-2">
              <p className="text-sm font-bold text-gray-600">
                আপনি যদি নিশ্চিত হতে চান—
              </p>
              <p className="text-lg font-black text-emerald-600">
                “আমি সঠিক পথে আছি কিনা”
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-md space-y-2 flex flex-col justify-center">
              <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">
                সেই প্রয়োজন পূরণ করতেই—
              </p>
              <h3 className="text-xl font-black leading-tight border-b border-gray-800 pb-2">
                মাজহাব ত্যাগের শেষ পরিণাম ইসলাম ত্যাগ
              </h3>
              <p className="text-gray-400 font-bold text-sm pt-1 leading-tight">
                সংকলন: আল্লামা ইমাম জাহিদ আল-কাউসারী (রহ.)
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <p className="text-base font-black text-gray-800 border-b border-gray-50 pb-2">
                বইটি আপনাকে কীভাবে সাহায্য করবে?
              </p>
              <div className="space-y-2">
                {[
                  "কেন হাজার বছর উম্মাহ মাজহাবের উপর ঐক্যবদ্ধ ছিল",
                  "কেন হঠাৎ এই ধারাকে অস্বীকার করা শুরু হলো",
                  "দলিল + যুক্তি + ইতিহাসের সমন্বয়",
                ].map((text, i) => (
                  <div key={i} className="flex gap-2">
                    <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5 text-sm" />
                    <p className="text-sm font-bold text-gray-700 leading-tight">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: "মাজহাব অনুসরণ “অন্ধত্ব” নয়",
                d: "এটি একটি সুসংগঠিত, নিরাপদ পদ্ধতি",
              },
              {
                t: "ইমামদের অনুসরণ দুর্বলতা নয়",
                d: "বরং জ্ঞানীদের পথ অনুসরণ করা",
              },
              {
                t: "“নিজে বুঝা” সবসময় সঠিক না",
                d: "এটি প্রায়ই বিভ্রান্তির দরজা খুলে দেয়",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
              >
                <p className="text-gray-900 font-black mb-1">{item.t}</p>
                <p className="text-gray-600 font-bold text-sm leading-tight">
                  {item.d}
                </p>
              </div>
            ))}
          </div>

          {/* AUTHOR SECTION (Tight) */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="shrink-0 text-center md:text-left">
              <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-1">
                প্রামাণিকতা নিশ্চিত করেছেন—
              </p>
              <h3 className="text-base font-black text-blue-900">
                ইমাম জাহিদ আল-কাউসারী (রহ.)
              </h3>
            </div>
            <div className="h-px w-12 bg-blue-200 hidden md:block"></div>
            <div className="flex flex-wrap justify-start gap-x-4 gap-y-1">
              {[
                "উম্মাহর স্বীকৃত একজন মুহাক্কিক আলিম",
                "আকীদা, ফিকহ ও উসূলে গভীর দক্ষতা",
                "বিভ্রান্ত মতবাদগুলোর বিরুদ্ধে শক্ত অবস্থানকারী",
                "উসমানীয় খেলাফতের শেষ নায়েবে শাইখুল ইসলাম",
              ].map((text, i) => (
                <p
                  key={i}
                  className="text-sm font-bold text-gray-700 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>{" "}
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-6 text-white rounded-2xl shadow-lg text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              সিদ্ধান্ত আপনার—
            </p>
            <div className="space-y-1 text-base lg:text-lg font-black leading-tight">
              <p>— আপনি কি নিজের সীমিত বুঝের উপর ভরসা করবেন?</p>
              <p className="text-emerald-400">
                — নাকি স্বীকৃত ইমামের গবেষণার উপর?
              </p>
            </div>
          </div>
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

export default SolutionAuthority;
