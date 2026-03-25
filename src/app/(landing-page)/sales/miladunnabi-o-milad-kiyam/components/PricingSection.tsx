"use client";
import { FiCheckCircle, FiChevronRight, FiClock } from "react-icons/fi";
import PricingDisplay from "../../../_components/PricingDisplay";

type Props = {
  onOrderClick: () => void;
  onPreviewClick?: () => void;
  regularPrice: number;
  salePrice: number;
};

const PricingSection = ({ onOrderClick, regularPrice, salePrice }: Props) => {
  return (
    <section
      id="order"
      className="bg-gray-50 py-4 lg:py-6 px-4 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-5 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-200 mb-1">
            <FiClock className="animate-pulse size-3" /> আজকের জন্য বিশেষ অফার!
          </div>
          <h2 className="text-lg lg:text-2xl font-black text-gray-900 leading-[1.3] lg:leading-tight">
            সঠিক জ্ঞান অর্জন করার জন্য— দেরি করাটাই সবচেয়ে বড় ক্ষতি!
            <br className="hidden sm:block" />
            <span className="text-emerald-600">
              সাশ্রয়ী মূল্যে এখনই অকাট্য দলিল সংগ্রহ করুন।
            </span>
          </h2>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          <div className="bg-emerald-600 p-4 lg:p-6 text-white flex-1 space-y-3">
            <h3 className="text-[16px] lg:text-lg font-black">
              কেন এখনই অর্ডার করবেন?
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {[
                "বর্তমানে ৩৮% বিশাল ছাড় চলছে।",
                "স্টক শেষ হওয়ার আগেই অর্ডার করুন।",
                "সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা।",
                "বই হাতে পেয়ে মূল্য পরিশোধের সুযোগ।",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FiCheckCircle className="text-emerald-300 shrink-0 mt-0.5 size-4" />
                  <span className="font-bold text-[13px] lg:text-[14px] text-emerald-50 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 lg:p-6 flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <div className="space-y-0.5">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] mb-1">
                বইয়ের বর্তমান মূল্য
              </p>
              <PricingDisplay
                regularPrice={regularPrice}
                salePrice={salePrice}
                isLarge={true}
              />
            </div>

            <button
              onClick={onOrderClick}
              className="w-full bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl text-[15px] lg:text-base font-black shadow-lg hover:shadow-xl transition-all group flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              এখনই অর্ডার করুন
              <FiChevronRight className="group-hover:translate-x-1 transition-transform size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
