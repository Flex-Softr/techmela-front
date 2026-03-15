import ShopBanner from "@/app/(public)/shop/components/ShopBanner";
import JsonLd from "@/components/shared/JsonLd";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";
import ShopFiltersFetcher from "./components/ShopFiltersFetcher";

export const metadata: Metadata = {
  title: "ইসলামিক বইয়ের বিশাল সংগ্রহ | সিদ্দীকিয়া প্রকাশনী",
  description:
    "সিদ্দীকিয়া প্রকাশনীর অনলাইন শপে আপনাকে স্বাগতম। এখানে পাবেন দেশি-বিদেশি লেখকের কয়েক হাজার ইসলামিক বই, মাদরাসার কিতাব এবং গবেষণামূলক কিতাবসমূহ।",
  keywords: [
    "অনলাইন ইসলামিক শপ",
    "ইসলামিক বই সংগ্রহ",
    "মাদরাসার কিতাব কিনুন",
    "Islamic Book Shop Bangladesh",
    "Buy Islamic Books Online",
  ].join(", "),
  alternates: {
    canonical: "https://siddikiaprokashoni.com/shop",
  },
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
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
              name: "শপ",
              item: "https://siddikiaprokashoni.com/shop",
            },
          ],
        }}
      />
      <ShopBanner />
      <ShopContent>
        <ShopFiltersFetcher searchParams={searchParams} />
      </ShopContent>
    </>
  );
};

export default ShopPage;
