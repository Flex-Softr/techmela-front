import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import BannerCarousel from "./BannerCarousel";

const Banner = async () => {
  return (
    <section className="mt-4">
      <ContainerMax>
        <BannerCarousel />
      </ContainerMax>
    </section>
  );
};

export default Banner;
