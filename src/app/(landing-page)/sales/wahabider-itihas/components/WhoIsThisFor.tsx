import { FiCheck, FiX } from "react-icons/fi";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick: () => void;
  previewLink?: string;
  bookTitle?: string;
};

const WhoIsThisFor = ({ onOrderClick, previewLink, bookTitle }: Props) => {
  const isFor = [
    "যারা উম্মাহর বর্তমান বিভক্তির প্রকৃত কারণ জানতে চান।",
    "যারা ইসলামের ইতিহাসের দালিলিক ও প্রামাণ্য বিশ্লেষণে আগ্রহী।",
    "যারা আধুনিক ফিতনার শেকড় ও ব্রিটিশ কানেকশন বুঝতে চান।",
    "যারা আলেমদের দালিলিক প্রতিরোধ সম্পর্কে নিশ্চিত হতে চান।",
  ];

  const isNotFor = [
    "যারা দালিলিক ইতিহাসকে ভয় পান বা এড়িয়ে চলতে চান।",
    "যারা ভাসা ভাসা জ্ঞান নিয়েই সন্তুষ্ট থাকতে পছন্দ করেন।",
    "যারা ইসলামের ইতিহাস বিকৃতি সম্পর্কে জানতে আগ্রহী নন।",
  ];

  return (
    <section className="bg-white p-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            এই বইটি{" "}
            <span className="text-primary italic underline underline-offset-4 decoration-primary/20">
              কাদের জন্য?
            </span>
          </h2>
          <p className="text-sm font-bold text-gray-500 max-w-2xl mx-auto">
            সব বই সবার জন্য নয়। এই বইটি শুধুমাত্র তাদের জন্য যারা সত্যের
            মুখোমুখি হতে সাহসী।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* IS FOR */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-4 lg:p-6 rounded-3xl space-y-5">
            <h3 className="text-xl font-black text-emerald-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <FiCheck />
              </div>
              বইটি আপনার জন্য:
            </h3>
            <ul className="space-y-4">
              {isFor.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FiCheck className="text-emerald-500 shrink-0 mt-1 text-lg" />
                  <p className="text-sm lg:text-base font-bold text-gray-700 leading-tight">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* IS NOT FOR */}
          <div className="bg-red-50/30 border border-red-50 p-4 lg:p-6 rounded-3xl space-y-5">
            <h3 className="text-xl font-black text-red-800/70 flex items-center gap-2 opacity-80">
              <div className="w-8 h-8 rounded-full bg-red-400 text-white flex items-center justify-center">
                <FiX />
              </div>
              বইটি আপনার জন্য নয়:
            </h3>
            <ul className="space-y-4">
              {isNotFor.map((text, i) => (
                <li key={i} className="flex items-start gap-3 opacity-60">
                  <FiX className="text-red-400 shrink-0 mt-1 text-lg" />
                  <p className="text-sm lg:text-base font-bold text-gray-600 leading-tight italic">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
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

export default WhoIsThisFor;
