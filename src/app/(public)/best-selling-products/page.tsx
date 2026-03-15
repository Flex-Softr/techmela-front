import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { BookOpen, Star } from "lucide-react";
import { Metadata } from "next";
import BestSellingContent from "./components/BestSellingContent";

export const metadata: Metadata = {
  title: "সেরা বিক্রিত বইসমূহ | সিদ্দীকিয়া প্রকাশনী",
  description:
    "সিদ্দীকিয়া প্রকাশনীর সবচেয়ে জনপ্রিয় ও সেরা বিক্রিত ইসলামিক বইগুলোর তালিকা। পাঠকদের পছন্দের শীর্ষে থাকা বইগুলো এখান থেকে সংগ্রহ করুন।",
  keywords: [
    "বেস্ট সেলিং ইসলামিক বই",
    "জনপ্রিয় ইসলামিক বই",
    "Best Selling Islamic Books",
    "হিট বই সিদ্দীকিয়া প্রকাশনী",
  ].join(", "),
  alternates: {
    canonical: "https://siddikiaprokashoni.com/best-selling-products",
  },
};

const BestSellingPage = () => {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "হোম",
              item: "https://siddikiaprokashoni.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "সেরা বিক্রিত বইসমূহ",
              item: "https://siddikiaprokashoni.com/best-selling-products",
            },
          ],
        }}
      />
      <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-white font-hind-siliguri">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <ContainerMax>
          <div className="relative py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-hind-siliguri">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug">
                  সেরা বিক্রিত বইসমূহ
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
