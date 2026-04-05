import { AlertTriangle } from "lucide-react";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
  previewLink?: string;
  bookTitle?: string;
};

const PsychologicalDisruption = ({
  onOrderClick,
  previewLink,
  bookTitle,
}: Props) => {
  const spiralSteps = [
    {
      step: "১",
      title: '"তাকফিরি" ফিতনার বিষবাষ্প',
      desc: "নাম দেওয়া হয়েছিল তাওহিদের দাওয়াত, কিন্তু শুরু হয় নির্বিচারে অন্য মুসলিমকে 'গোমরাহ' বা 'মুশরিক' বলার বিপজ্জনক প্রবণতা।",
      numBg: "bg-orange-500",
    },
    {
      step: "২",
      title: '"অন্য সবার আকীদা ভুল—শুধু আমরাই সঠিক"',
      desc: "নিজস্ব ব্যাখ্যার বাইরে সবাইকে 'গোমরাহ' বা 'মুশরিক' আখ্যা দেওয়ার প্রবণতা শুরু হয়।",
      numBg: "bg-red-500",
    },
    {
      step: "৩",
      title: "বিভাজন ও আমলী ঐক্যের ধ্বংস",
      desc: "শিরক-বিদআতের তকমা দিয়ে শত শত বছরের ঐক্যে ফাটল ধরানো—আরব ও অনারবের এক করুণ ইতিহাস।",
      numBg: "bg-red-700",
    },
  ];

  const consequences = [
    "১৯১৫-এর ‘দারিন চুক্তি’ ও খিলাফত পতন",
    "তাকফিরি ফিতনা ও উম্মাহর ধর্মীয় বিভক্তি",
    "মক্কা-মদিনায় আহলে সুন্নাহর রক্তপাত",
    "ঐতিহাসিক পবিত্র নিদর্শন ও মাজার ধ্বংস",
    "ব্রিটিশদের ১০ মিলিয়ন পাউন্ডের মাসোহারা",
    "অটোমান সাম্রাজ্যের পতন ও নীল নকশা",
  ];

  return (
    <section className="relative py-6 lg:py-8 px-4 overflow-hidden bg-gray-50/50">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-red-100 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-orange-100 blur-3xl" />
      </div>

      <div className="max-w-screen-xl mx-auto space-y-6 relative z-10">
        {/* Header & Impact */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1 rounded-full font-black uppercase tracking-[0.2em] border border-red-100/50">
            <AlertTriangle size={14} />
            সতর্ক বার্তা
          </div>
          <h2 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight">
            আজকের মুসলিম বিভাজনের{" "}
            <span className="text-red-600 underline decoration-wavy decoration-red-200 underline-offset-4">
              আসল কারণ
            </span>{" "}
            কি আপনি জানেন?
          </h2>
          <p className="text-sm lg:text-lg font-bold text-gray-500 leading-relaxed">
            কেন আমাদের মসজিদের জামায়াতগুলোতে হঠাৎ অনৈক্য তৈরি হলো? কেন একদল
            মুসলমান অন্য সব মুসলমানকে &quot;শিরক&quot;, &quot;বিদআত&quot; ও
            &quot;কুফুর&quot;—এর তকমা দিয়ে বাতিলের কাতারে ঠেলে দিচ্ছে? এর পেছনে
            কাজ করছে গত{" "}
            <span className="text-red-600 font-black">
              ২০০ বছরের এক সুপরিকল্পিত ইতিহাস বিকৃতি।
            </span>
          </p>
        </div>

        {/* The Core Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {spiralSteps.map((step, i) => (
            <div
              key={i}
              className="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${step.numBg} text-white flex items-center justify-center font-black text-xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}
              >
                {step.step}
              </div>
              <h3 className="font-black text-gray-900 leading-tight text-lg mb-2">
                {step.title}
              </h3>
              <p className="font-bold text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Consequences - Ultra Compact */}
        <div className="bg-white/40 border border-red-100/30 p-4 rounded-[2rem] relative overflow-hidden backdrop-blur-md">
          <p className="font-black text-red-700/60 mb-4 uppercase tracking-[0.2em] text-center">
            এই বিচ্যুতির ঐতিহাসিক ও ধর্মীয় পরিণতি
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative z-10">
            {consequences.map((text, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="text-gray-900 font-black text-sm leading-tight">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transition - Ultra Minimalist */}
        <div className="text-center pt-2">
          <p className="text-lg lg:text-xl font-black text-gray-900 leading-tight">
            তাহলে এই বিভ্রান্তি থেকে বাঁচার পথ কী?
          </p>
          <p className="text-sm font-black text-primary/80 mt-1">
            কীভাবে নিশ্চিত হবেন আপনি সত্যের উপর আছেন?
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <CTAButtonGroup
            onOrderClick={onOrderClick}
            previewLink={previewLink}
            bookTitle={bookTitle}
          />
        </div>
      </div>
    </section>
  );
};

export default PsychologicalDisruption;
