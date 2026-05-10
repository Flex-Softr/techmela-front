import ContainerMax from "@/components/shared/containerMax/ContainerMax";
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
      <ContainerMax>
        <BannerCarousel promise={promise} />
      </ContainerMax>
    </section>
  );
};

export default Banner;
