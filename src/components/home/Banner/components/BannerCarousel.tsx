// export default BannerCarousel;
import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TProduct } from "@/types/products/product";
import { TSliders } from "@/types/sliders/slider";
import ClientBannerCarousel from "./BannerCarouselClient";

type BannerCarouselProps = {
  bannerSideProducts: TProduct[];
};

const BannerCarousel = async ({ bannerSideProducts }: BannerCarouselProps) => {
  const [{ data }] = await serverSideFetcher<TSliders[]>(
    "/slider-banner?isActive=true"
  );
  const slides = data || [];

  return (
    <div className="max-w-full overflow-hidden">
      <ClientBannerCarousel
        bannerSideProducts={bannerSideProducts}
        sliders={slides.slice(0, 5)}
      />
    </div>
  );
};

export default BannerCarousel;
