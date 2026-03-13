import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import BottomHeader from "./bottomHeader/BottomHeader";
import MainHeader from "./components/MainHeader";
import TopHeader from "./components/TopHeader";
import TCategory from "@/types/categories/categories";

const Header = async () => {
  const { data: categoryResponse } = await serverSideFetcher<
    TPaginatedData<TCategory[]>
  >({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });

  const categories = categoryResponse?.data || [];

  return (
    <>
      <header className="fixed top-0 left-0 w-full mb-16 z-40 shadow-lg sm:static sm:shadow-none sm:bg-transparent sm:mb-0 bg-background">
        <TopHeader />
        <MainHeader categories={categories} />
        <BottomHeader categories={categories} />
      </header>
      <div className="h-[60px] w-full block sm:hidden"></div>
    </>
  );
};

export default Header;
