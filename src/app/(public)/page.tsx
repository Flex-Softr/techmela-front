import Banner from "@/components/home/Banner/Banner";
import BannerSkeleton from "@/components/home/Banner/BannerSkeleton";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import CategorySectionFetcher from "@/components/home/category/CategorySectionFetcher";
import CategorySectionSkeleton from "@/components/home/category/CategorySectionSkeleton";
import Facilities from "@/components/home/facilities/Facilities";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import HomepageSectionsFetcher from "@/components/home/homePageSections/HomepageSectionsFetcher";
import HomepageSectionSkeleton from "@/components/home/homePageSections/HomepageSectionSkeleton";
import JsonLd from "@/components/shared/JsonLd";
import TCategory from "@/types/categories/categories";
import { THomePageSection } from "@/types/homepageSection";
import { TProduct } from "@/types/products/product";
import { TPaginatedData } from "@/types/response";
import { TSliders } from "@/types/sliders/slider";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "সেরা ইসলামিক বইয়ের সমাহার",
  description:
    "সিদ্দীকিয়া প্রকাশনীতে আপনাদের স্বাগতম। এখানে পাবেন আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক মানসম্পন্ন ইসলামিক বই ও মাদরাসার কিতাবসমূহ।",
  keywords: [
    // Brand
    "সিদ্দীকিয়া প্রকাশনী",
    "Siddikia Prokashoni",
    "দারুননাজাত মাদরাসা কিতাব",
    // Generic intent
    "ইসলামিক বই কিনুন",
    "ইসলামিক বই অনলাইন",
    "বাংলা ইসলামিক বই",
    "Bangla Islamic Books",
    "Islamic Books Bangladesh",
    "Online Islamic Bookshop Bangladesh",
    // Subject-specific
    "ফিকহের বই",
    "হাদিসের বই",
    "তাফসিরের বই",
    "আকিদার বই",
    "সিরাতের বই",
    "তাসাউফের বই",
    "মাদরাসার কিতাব",
    "উসুলুল ফিকহ বই",
    "নাহু সরফ কিতাব",
    "আরবি গ্রামার বই",
    "দোয়া ও আমলের বই",
    "ইসলামিক ইতিহাসের বই",
    "খলিফাদের জীবনী বই",
    "রাসুলের জীবনী বই",
    "সাহাবাদের জীবনী বই",
    "ইসলামিক উপন্যাস",
    "ওলামায়ে কেরামের বই",
    "ইজতিমায়ী মাসায়েল",
    "কবর ও আখেরাতের বই",
    "ইসলামিক শিশু বই",
    "Darunnajat Madrasa Books",
    "আহলে সুন্নাত ওয়াল জামাআত বই",
    // Delivery / Ecommerce
    "বাংলাদেশে বই ডেলিভারি",
    "ক্যাশ অন ডেলিভারি বই",
    "অনলাইনে বই কিনুন বাংলাদেশ",
  ].join(", "),
  openGraph: {
    title: "সিদ্দীকিয়া প্রকাশনী | সেরা ইসলামিক বইয়ের সমাহার",
    description:
      "সিদ্দীকিয়া প্রকাশনীতে আপনাদের স্বাগতম। এখানে পাবেন আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক মানসম্পন্ন ইসলামিক বই ও মাদরাসার কিতাবসমূহ।",
    url: "https://siddikiaprokashoni.com",
    siteName: "সিদ্দীকিয়া প্রকাশনী",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "https://siddikiaprokashoni.com/logo/logo.webp",
        alt: "সিদ্দীকিয়া প্রকাশনী",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সিদ্দীকিয়া প্রকাশনী | সেরা ইসলামিক বইয়ের সমাহার",
    description:
      "সিদ্দীকিয়া প্রকাশনীতে আপনাদের স্বাগতম। এখানে পাবেন আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক মানসম্পন্ন ইসলামিক বই ও মাদরাসার কিতাবসমূহ।",
    images: ["https://siddikiaprokashoni.com/logo/logo.webp"],
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

  const bookstoreSchema = {
    "@context": "https://schema.org",
    "@type": ["BookStore", "OnlineStore"],
    name: "সিদ্দীকিয়া প্রকাশনী",
    description:
      "সিদ্দীকিয়া প্রকাশনীতে আপনাদের স্বাগতম। এখানে পাবেন আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক মানসম্পন্ন ইসলামিক বই ও মাদরাসার কিতাবসমূহ।",
    url: "https://siddikiaprokashoni.com",
    image: "https://siddikiaprokashoni.com/logo/logo.webp",
    telephone: "+8801339955155",
    email: "siddikiyaprokashoni@gmail.com",
    priceRange: "৳৳",
    address: { "@type": "PostalAddress", addressCountry: "BD" },
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
    name: "সিদ্দীকিয়া প্রকাশনী",
    url: "https://siddikiaprokashoni.com",
    inLanguage: "bn-BD",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://siddikiaprokashoni.com/shop?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={bookstoreSchema} />
      <JsonLd data={websiteSchema} />
      <h1 className="sr-only">
        সিদ্দীকিয়া প্রকাশনী - সেরা ইসলামিক বইয়ের সমাহার
      </h1>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner promise={sliderBannerPromise} />
      </Suspense>
      <Facilities />
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
