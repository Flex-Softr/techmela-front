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
  title: "হোম",
};

const Home = async () => {
  return (
    <>
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
