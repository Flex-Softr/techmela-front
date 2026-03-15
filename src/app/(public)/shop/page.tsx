import ShopBanner from "@/app/(public)/shop/components/ShopBanner";
import { Metadata } from "next";
import ShopContent from "./components/ShopContent";
import ShopFiltersFetcher from "./components/ShopFiltersFetcher";

export const metadata: Metadata = {
  title: "শপ",
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  return (
    <>
      <ShopBanner />
      <ShopContent>
        <ShopFiltersFetcher searchParams={searchParams} />
      </ShopContent>
    </>
  );
};

export default ShopPage;
