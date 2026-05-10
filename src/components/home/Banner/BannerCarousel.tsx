import { TSliders } from "@/types/sliders/slider";
import ClientBannerCarousel from "./BannerCarouselClient";
import TGenericResponse from "@/types/response";

const BannerCarousel = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<TSliders[]>>;
}) => {
  const { data } = await promise;
  const slides = data || [];

  return (
    <div className="max-w-full">
      <ClientBannerCarousel sliders={slides} />
    </div>
  );
};

export default BannerCarousel;
