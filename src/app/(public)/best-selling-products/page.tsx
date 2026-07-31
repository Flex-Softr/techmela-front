import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import { Sparkles, Star } from "lucide-react";
import { Metadata } from "next";
import BestSellingContent from "./components/BestSellingContent";

export const metadata: Metadata = {
  title: "সেরা বিক্রিত পণ্যসমূহ",
  description: `${SITE.nameBn}র সবচেয়ে জনপ্রিয় ও সেরা বিক্রিত কসমেটিক্স ও বিউটি প্রোডাক্টের তালিকা। ক্রেতাদের পছন্দের শীর্ষে থাকা পণ্যগুলো এখান থেকে সংগ্রহ করুন।`,
  keywords: [
    "বেস্ট সেলিং কসমেটিক্স",
    "জনপ্রিয় বিউটি প্রোডাক্ট",
    "Best Selling Cosmetics",
    `হিট পণ্য ${SITE.nameBn}`,
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/best-selling-products`,
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
              item: SITE.baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "সেরা বিক্রিত পণ্যসমূহ",
              item: `${SITE.baseUrl}/best-selling-products`,
            },
          ],
        }}
      />
      <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground font-hind-siliguri">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl pointer-events-none" />

        <ContainerMax>
          <div className="relative py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-hind-siliguri">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-foreground/15 rounded-xl backdrop-blur-sm flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug">
                  সেরা বিক্রিত পণ্যসমূহ
                </h1>
                <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1 leading-relaxed max-w-lg">
                  আমাদের ক্রেতাদের সবথেকে পছন্দের এবং জনপ্রিয় পণ্যগুলোর তালিকা
                  থেকে আপনার প্রয়োজনীয় পণ্যটি বেছে নিন
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium border border-primary-foreground/10 shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>জনপ্রিয় সংগ্রহ</span>
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
