import Banner from "@/components/home/Banner/Banner";
import BannerSkeleton from "@/components/home/Banner/BannerSkeleton";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import CategorySectionFetcher from "@/components/home/category/CategorySectionFetcher";
import CategorySectionSkeleton from "@/components/home/category/CategorySectionSkeleton";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import HomepageSectionsFetcher from "@/components/home/homePageSections/HomepageSectionsFetcher";
import HomepageSectionSkeleton from "@/components/home/homePageSections/HomepageSectionSkeleton";
import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import TCategory from "@/types/categories/categories";
import { THomePageSection } from "@/types/homepageSection";
import { TProduct } from "@/types/products/product";
import { TPaginatedData } from "@/types/response";
import { TSliders } from "@/types/sliders/slider";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `${SITE.nameBn} | ${SITE.taglineBn}`,
  description: `${SITE.nameBn}-এ আপনাকে স্বাগতম। ${SITE.descriptionBn}`,
  keywords: [
    SITE.nameBn,
    SITE.nameEn,
    "টেকমেল্লা",
    "TechMela",
    "অনলাইন গ্যাজেট শপ",
    "স্মার্ট গ্যাজেট বাংলাদেশ",
    "ইলেকট্রনিক্স বাংলাদেশ",
    "হেডফোন",
    "ইয়ারবাড",
    "স্মার্টওয়াচ",
    "মাইক্রোফোন",
    "পাওয়ার ব্যাংক",
    "ব্লুটুথ স্পিকার",
    "মোবাইল এক্সেসরিজ",
    "ক্যাশ অন ডেলিভারি গ্যাজেট",
    "অনলাইন শপিং বাংলাদেশ",
  ].join(", "),
  openGraph: {
    title: `${SITE.nameBn} | ${SITE.taglineBn}`,
    description: `${SITE.nameBn}-এ আপনাকে স্বাগতম। ${SITE.descriptionBn}`,
    url: SITE.baseUrl,
    siteName: SITE.nameBn,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE.baseUrl}${SITE.logoPath}`,
        alt: SITE.nameBn,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameBn} | ${SITE.taglineBn}`,
    description: `${SITE.nameBn}-এ আপনাকে স্বাগতম। ${SITE.descriptionBn}`,
    images: [`${SITE.baseUrl}${SITE.logoPath}`],
  },
};

const Home = async () => {
  const sliderBannerPromise = serverSideFetcher<TSliders[]>({
    url: "/slider-banner?isActive=true",
    tags: ["sliderBanner"],
  });
  const categoryPromise = serverSideFetcher<TPaginatedData<TCategory[]>>({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });
  const featuredProductsPromise = serverSideFetcher<TProduct[]>({
    url: "/products/featured",
    tags: ["featuredProducts"],
  });
  const homepageSectionsPromise = serverSideFetcher<THomePageSection[]>({
    url: "/homepage-sections?isActive=true",
    tags: ["homepageSections"],
  });
  const bestSellingProductsPromise = serverSideFetcher<TProduct[]>({
    url: "/products/best-selling",
    tags: ["bestSellingProducts"],
  });

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": ["Store", "OnlineStore"],
    name: SITE.nameBn,
    description: `${SITE.nameBn}-এ আপনাকে স্বাগতম। ${SITE.descriptionBn}`,
    url: SITE.baseUrl,
    image: `${SITE.baseUrl}${SITE.logoPath}`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "হাতিরপুল, ঢাকা",
      postalCode: "1205",
      addressCountry: "BD",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.nameBn,
    url: SITE.baseUrl,
    inLanguage: "bn-BD",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.baseUrl}/shop?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={storeSchema} />
      <JsonLd data={websiteSchema} />
      <h1 className="sr-only">
        {SITE.nameBn} - {SITE.taglineBn}
      </h1>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner promise={sliderBannerPromise} />
      </Suspense>
      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySectionFetcher promise={categoryPromise} />
      </Suspense>
      <Suspense fallback={<HomepageSectionSkeleton />}>
        <FeaturedProducts promise={featuredProductsPromise} />
      </Suspense>
      <Suspense fallback={<HomepageSectionSkeleton />}>
        <HomepageSectionsFetcher promise={homepageSectionsPromise} />
      </Suspense>
      <Suspense fallback={<HomepageSectionSkeleton />}>
        <BestSellingProducts promise={bestSellingProductsPromise} />
      </Suspense>
    </>
  );
};
export default Home;
