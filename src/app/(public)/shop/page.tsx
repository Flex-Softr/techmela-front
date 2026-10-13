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
import { SITE } from "@/const/site.const";

export const metadata: Metadata = {
  title: "সকল পণ্য | TechMela",
  description: `${SITE.nameBn} অনলাইন শপে আপনাকে স্বাগতম। সকল প্রিমিয়াম গ্যাজেট ও ইলেকট্রনিক্স অ্যাকসেসরিজ সেরা মূল্যে অর্ডার করুন।`,
  keywords: [
    "অনলাইন গ্যাজেট শপ",
    "ইলেকট্রনিক্স কালেকশন",
    "স্মার্ট গ্যাজেট বাংলাদেশ",
    "TechMela Shop",
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/shop`,
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
              item: SITE.baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "সকল পণ্য",
              item: `${SITE.baseUrl}/shop`,
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
