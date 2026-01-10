import AllProducts from "@/components/home/AllProducts/AllProducts";
import Banner from "@/components/home/Banner/Banner";
import BestSellingProducts from "@/components/home/bestSellingProducts/BestSellingProducts";
import TCategory from "@/types/categories/categories";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CategorySection from "./shop/components/CategorySection";

const Home = async () => {
  const { data: categories = [] } = await serverSideFetcher<TCategory[]>({
    url: "/categories",
    tags: ["allCategories"],
  });

  return (
    <>
      <Banner />
      <CategorySection categories={categories} />
      <BestSellingProducts />
      <AllProducts />
      <BestSellingProducts />
    </>
  );
};
export default Home;
