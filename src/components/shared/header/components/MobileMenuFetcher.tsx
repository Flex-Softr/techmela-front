import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import NavLinks from "./NavLinks";

const MobileMenuFetcher = async () => {
  const categoryRes = await serverSideFetcher<TPaginatedData<TCategory[]>>({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });

  const categories = categoryRes?.data?.data || [];

  return <NavLinks categories={categories} />;
};

export default MobileMenuFetcher;
