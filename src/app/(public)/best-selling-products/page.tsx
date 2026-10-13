import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import { Sparkles, Star } from "lucide-react";
import { Metadata } from "next";
import BestSellingContent from "./components/BestSellingContent";

export const metadata: Metadata = {
  title: "সেরা বিক্রিত পণ্যসমূহ | TechMela",
  description: `${SITE.nameBn}-এর সবচেয়ে জনপ্রিয় এবং সর্বাধিক বিক্রিত গ্যাজেট ও প্রযুক্তি পণ্য। গ্রাহকদের পছন্দের সেরা কালেকশন দেখুন।`,
  keywords: [
    "সেরা বিক্রিত গ্যাজেট",
    "জনপ্রিয় টেক পণ্য",
    "Best Selling Products",
    `জনপ্রিয় পণ্য ${SITE.nameBn}`,
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
      <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl pointer-events-none" />

        <ContainerMax>
          <div className="relative py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-foreground/15 rounded-xl backdrop-blur-sm flex-shrink-0">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug">
                  সেরা বিক্রিত পণ্যসমূহ
                </h1>
                <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1 leading-relaxed max-w-lg">
                  আমাদের গ্রাহকদের সবচেয়ে পছন্দের এবং সর্বাধিক বিক্রিত পণ্যের কালেকশন
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium border border-primary-foreground/10 shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>জনপ্রিয় কালেকশন</span>
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
