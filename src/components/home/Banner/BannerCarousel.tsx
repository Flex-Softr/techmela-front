import { TSliders } from "@/types/sliders/slider";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import ClientBannerCarousel from "./BannerCarouselClient";

const BannerCarousel = async () => {
  const { data } = await serverSideFetcher<TSliders[]>({
    url: "/slider-banner?isActive=true",
    tags: ["sliderBanner"],
  });
  const slides = data || [];

  return (
    <div className="max-w-full">
      <ClientBannerCarousel sliders={slides} />
    </div>
  );
};

export default BannerCarousel;
