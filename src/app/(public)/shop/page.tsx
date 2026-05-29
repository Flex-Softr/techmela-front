import ShopBanner from "@/app/(public)/shop/components/ShopBanner";
import JsonLd from "@/components/shared/JsonLd";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { TPaginatedData } from "@/types/response";
import TCategory from "@/types/categories/categories";
import TBrand from "@/types/brands/brands";
import TCollection from "@/types/collections/collections";
import ShopFilters from "./components/ShopFilters";

export const metadata: Metadata = {
  title: "ইসলামিক বইয়ের বিশাল সংগ্রহ",
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

const ShopPage = async () => {
  // Fetch filter data in parallel
  const [categoriesRes, brandsRes, collectionsRes, priceRangeRes] =
    await Promise.all([
      serverSideFetcher<TPaginatedData<TCategory[]>>({
        url: "/categories?isActive=true",
        tags: ["categories"],
      }),
      serverSideFetcher<TPaginatedData<TBrand[]>>({
        url: "/brands?isActive=true",
        tags: ["brands"],
      }),
      serverSideFetcher<TPaginatedData<TCollection[]>>({
        url: "/collections?isActive=true",
        tags: ["collections"],
      }),
      serverSideFetcher<{ minPrice: number; maxPrice: number }>({
        url: "/products/price-range",
        tags: ["priceRange"],
      }),
    ]);

  const categories = categoriesRes?.data?.data || [];
  const brands = brandsRes?.data?.data || [];
  const collections = collectionsRes?.data?.data || [];
  const priceRange = priceRangeRes?.data || { minPrice: 0, maxPrice: 10000 };

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
              name: "সকল বই",
              item: "https://siddikiaprokashoni.com/shop",
            },
          ],
        }}
      />
      <ShopBanner />
      <ShopContent
        minPrice={priceRange.minPrice}
        maxPrice={priceRange.maxPrice}
      >
        <ShopFilters
          categories={categories}
          brands={brands}
          collections={collections}
          priceRange={priceRange}
        />
      </ShopContent>
    </>
  );
};

export default ShopPage;
