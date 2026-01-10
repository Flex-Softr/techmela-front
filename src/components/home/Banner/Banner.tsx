import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import BannerCarousel from "./components/BannerCarousel";

const Banner = async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { data } = await serverSideFetcher<any>({
    url: "/products/featured",
    tags: ["products"],
  });
  const bannerSideProducts = (data as TProduct[]) || [];

  return (
    <section className="mt-[54.663px] sm:mt-0">
      <BannerCarousel bannerSideProducts={bannerSideProducts} />
    </section>
  );
};

export default Banner;
