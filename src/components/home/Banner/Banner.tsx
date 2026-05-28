import BannerCarousel from "./BannerCarousel";
import { TSliders } from "@/types/sliders/slider";
import TGenericResponse from "@/types/response";

const Banner = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<TSliders[]>>;
}) => {
  return (
    <section className="mt-4">
      {/* Padding on mobile, contained on desktop */}
      <div className="w-full px-2 md:max-w-7xl md:mx-auto md:px-5">
        <BannerCarousel promise={promise} />
      </div>
    </section>
  );
};

export default Banner;
