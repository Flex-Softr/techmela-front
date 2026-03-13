import Banner from "@/components/home/Banner/Banner";
import HomepageSectionContent from "@/components/home/homePageSections/HomepageSectionContent";
import TCategory from "@/types/categories/categories";
import { THomePageSection } from "@/types/homepageSection";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CategorySection from "../../components/home/category/CategorySection";
import FeaturedProducts from "@/components/home/featuredProducts/FeaturedProducts";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import Facilities from "@/components/home/facilities/Facilities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "হোম",
};

const Home = async () => {
  const [categoryRes, sectionRes] = await Promise.all([
    serverSideFetcher<TPaginatedData<TCategory[]>>({
      url: "/categories?isActive=true",
      tags: ["categories"],
    }),
    serverSideFetcher<THomePageSection[]>({
      url: "/homepage-sections?isActive=true",
      tags: ["homepageSections"],
    }),
  ]);

  const categories = categoryRes?.data?.data || [];
  const homePageSection = sectionRes?.data || [];

  return (
    <>
      <Banner />
      <Facilities />
      <CategorySection categories={categories} />
      <FeaturedProducts />
      {homePageSection?.map((section) => (
        <HomepageSectionContent key={section._id} content={section} />
      ))}
      <BestSellingProducts />
    </>
  );
};
export default Home;
