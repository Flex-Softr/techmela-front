import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import dynamic from "next/dynamic";

const NavLinks = dynamic(() => import("./NavLinks"));

const MobileMenuFetcher = async () => {
  const categoryRes = await serverSideFetcher<TPaginatedData<TCategory[]>>({
    url: "/categories?isActive=true",
    tags: ["categories"],
  });

  const categories = categoryRes?.data?.data || [];

  return <NavLinks categories={categories} />;
};

export default MobileMenuFetcher;
