import Banner from "@/components/home/Banner/Banner";
import BannerSkeleton from "@/components/home/Banner/BannerSkeleton";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import CategorySectionFetcher from "@/components/home/category/CategorySectionFetcher";
import CategorySectionSkeleton from "@/components/home/category/CategorySectionSkeleton";
import Facilities from "@/components/home/facilities/Facilities";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import HomepageSectionsFetcher from "@/components/home/homePageSections/HomepageSectionsFetcher";
import HomepageSectionSkeleton from "@/components/home/homePageSections/HomepageSectionSkeleton";
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
    "ইসলামিক বই কিনুন",
    "সিদ্দীকিয়া প্রকাশনী",
    "Bangla Islamic Books",
    "Darunnajat Madrasa Books",
    "আহলে সুন্নাত ওয়াল জামাআত বই",
  ].join(", "),
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

  return (
    <>
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
