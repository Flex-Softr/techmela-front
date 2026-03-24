"use client";
import { FiCheck, FiShield, FiTruck } from "react-icons/fi";
import CTAButtonGroup from "../../../_components/CTAButtonGroup";
import PricingDisplay from "../../../_components/PricingDisplay";

type Props = {
  regularPrice: number;
  salePrice: number;
  onOrderClick: () => void;
  onPreviewClick?: () => void;
};

const PricingSection = ({
  regularPrice,
  salePrice,
  onOrderClick,
  onPreviewClick,
}: Props) => {
  return (
    <section className="bg-[#FAFAFA] py-8 lg:py-8 px-4 overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative z-10 space-y-8 lg:space-y-8">
        {/* Core Message / Urgency */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            জ্ঞান অর্জন করার জন্য—
            <br />
            <span className="text-primary mt-1 block">
              দেরি করাটাই সবচেয়ে বড় ক্ষতি
            </span>
          </h2>
          <p className="text-sm font-bold text-gray-600">
            সঠিক পথ জানার সুযোগ বারবার আসে না। বইটি আপনার নাজাতের উসিলা হতে
            পারে।
          </p>
        </div>

        {/* Pricing Box Segment */}
        <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-primary to-emerald-400"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative z-10">
            {/* Left Column: Why Buy Now */}
            <div className="space-y-6 lg:border-r border-gray-100 lg:pr-10">
              <div className="bg-emerald-50 text-emerald-800 text-sm font-black px-4 py-2 rounded-full inline-flex items-center gap-2 border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                স্পেশাল অফার চলছে
              </div>

              <h3 className="text-2xl font-black text-gray-900">
                আজই কেন সংগ্রহ করবেন?
              </h3>

              <ul className="space-y-4">
                {[
                  "সীমিত সময়ের জন্য বিশেষ ডিসকাউন্ট",
                  "সারা বাংলাদেশে কুরিয়ার চার্জ প্রযোজ্য",
                  "বই হাতে পেয়ে মূল্য পরিশোধের সুযোগ",
                ].map((text, i) => (
                  <li key={i} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <FiCheck className="text-primary text-xs font-black" />
                      </div>
                      <span className="text-base font-bold text-gray-800">
                        {text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-50 flex items-center gap-4 text-sm font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <FiTruck className="text-emerald-500 text-lg" />
                  হোম ডেলিভারি
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <FiShield className="text-emerald-500 text-lg" />
                  মানি ব্যাক গ্যারান্টি
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Pricing & CTA */}
            <div className="space-y-8 flex flex-col items-center justify-center text-center bg-gray-50 p-6 lg:p-8 rounded-3xl border border-gray-100">
              <div className="space-y-1 w-full">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">
                  আপনার বিনিয়োগ
                </p>
                <PricingDisplay
                  regularPrice={regularPrice}
                  salePrice={salePrice}
                  isLarge={true}
                  className="justify-center"
                />
              </div>

              <div className="w-full space-y-4">
                <CTAButtonGroup
                  onOrderClick={onOrderClick}
                  onPreviewClick={onPreviewClick}
                  className="w-full justify-center"
                />

                <p className="text-xs font-bold text-gray-400">
                  * স্টক শেষ হওয়ার আগেই অর্ডার করুন
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Psychological Reassurance */}
        <div className="text-center space-y-3 bg-gray-900 text-white p-7 rounded-3xl shadow-xl border border-gray-800">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            সিদ্ধান্ত আপনার—
          </p>
          <div className="space-y-1 text-base lg:text-lg font-black leading-tight">
            <p>— কিছু টাকা হয়তো আপনি এমনিতেই খরচ করেন?</p>
            <p className="text-emerald-400">
              — নাকি এই টাকা আপনার ঈমান ও নাজাতের পাথেয় হবে?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
