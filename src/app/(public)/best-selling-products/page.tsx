import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { BookOpen, Star } from "lucide-react";
import { Metadata } from "next";
import BestSellingContent from "./components/BestSellingContent";

export const metadata: Metadata = {
  title: "বেস্ট সেলিং বইসমূহ | সিদ্দিকীয়া প্রকাশনী",
  description: "আমাদের সবথেকে জনপ্রিয় এবং বেস্ট সেলিং বইগুলো দেখে নিন।",
};

const BestSellingPage = () => {
  return (
    <>
      <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-white">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <ContainerMax>
          <div className="relative py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-fxl md:text-3xl font-bold leading-snug">
                  বেস্ট সেলিং বইসমূহ
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed max-w-lg">
                  আমাদের পাঠকদের সবথেকে পছন্দের এবং জনপ্রিয় বইগুলোর তালিকা থেকে
                  আপনার প্রয়োজনীয় বইটি বেছে নিন
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium border border-white/10 shadow-lg">
                <BookOpen className="w-4 h-4" />
                <span>জনপ্রিয় সংগ্রহ</span>
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
      <BestSellingContent />
    </>
  );
};

export default BestSellingPage;
