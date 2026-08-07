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
  title: "Huge Collection of Cosmetics & Beauty Products",
  description: `Welcome to the ${SITE.nameBn} online shop. Discover thousands of skincare, makeup, haircare, perfume, and beauty accessories from local and international brands.`,
  keywords: [
    "Online Cosmetics Shop",
    "Cosmetics & Beauty Product Collection",
    "Buy Skincare Makeup",
    "Cosmetics Shop Bangladesh",
    "Buy Beauty Products Online",
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
              name: "Home",
              item: SITE.baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "All Products",
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
