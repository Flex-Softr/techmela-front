import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TProduct } from "@/types/products/product";
import BannerCarousel from "./components/BannerCarousel";

const Banner = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [{ data }] = await serverSideFetcher<any>("/products/featured");
  const bannerSideProducts = (data as TProduct[]) || [];

  return (
    <section className="mt-[54.663px] sm:mt-0">
      <BannerCarousel bannerSideProducts={bannerSideProducts} />
    </section>
  );
};

export default Banner;
