import Banner from "@/components/home/Banner/Banner";
import CategorySectionFetcher from "@/components/home/category/CategorySectionFetcher";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import Facilities from "@/components/home/facilities/Facilities";
import HomepageSectionsFetcher from "@/components/home/homePageSections/HomepageSectionsFetcher";
import CategorySectionSkeleton from "@/components/home/category/CategorySectionSkeleton";
import HomepageSectionSkeleton from "@/components/home/homePageSections/HomepageSectionSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "সেরা ইসলামিক বইয়ের সমাহার | সিদ্দীকিয়া প্রকাশনী",
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
  return (
    <>
      <h1 className="sr-only">
        সিদ্দীকিয়া প্রকাশনী - সেরা ইসলামিক বইয়ের সমাহার
      </h1>
      <Banner />
      <Facilities />
      <Suspense fallback={<CategorySectionSkeleton />}>
        <CategorySectionFetcher />
      </Suspense>
      <FeaturedProducts />
      <Suspense fallback={<HomepageSectionSkeleton />}>
        <HomepageSectionsFetcher />
      </Suspense>
      <BestSellingProducts />
    </>
  );
};
export default Home;
