import { getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import { TSliders } from "@/types/sliders/slider";
import Image from "next/image";
import Link from "next/link";

const CarouselUi = ({
  slider,
  bannerSideProducts,
}: {
  slider: TSliders;
  bannerSideProducts: TProduct[];
}) => {
  return (
    <Link href={slider?.bannerLink || ""} className="mt-7 rounded-sm">
      <Image
        className={`w-full ${bannerSideProducts?.length ? "w-[100%] md:h-[440px]" : "md:h-[500px]"}`}
        src={getImageSrc(slider?.image?.src)}
        alt={slider?.image?.src || ""}
        height={1200}
        width={700}
      />
    </Link>
  );
};

export default CarouselUi;
