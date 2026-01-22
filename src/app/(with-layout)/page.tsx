import Banner from "@/components/home/Banner/Banner";
import HomepageSectionContent from "@/components/home/HomepageSectionContent";
import TCategory from "@/types/categories/categories";
import { THomePageSection } from "@/types/homepageSection";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CategorySection from "./shop/components/CategorySection";

const Home = async () => {
  const { data: categories = [] } = await serverSideFetcher<TCategory[]>({
    url: "/categories",
    tags: ["allCategories"],
  });
  const { data: homePageSection = [] } = await serverSideFetcher<
    THomePageSection[]
  >({
    url: "/homepage-sections",
    tags: ["homepageSections"],
  });

  return (
    <>
      <Banner />
      <CategorySection categories={categories} />
      {homePageSection?.map((section) => (
        <HomepageSectionContent key={section._id} content={section} />
      ))}
      {/* <BestSellingProducts />
      <AllProducts />
      <BestSellingProducts /> */}
    </>
  );
};
export default Home;
