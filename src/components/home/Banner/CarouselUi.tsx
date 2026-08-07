import { cn, getImageSrc } from "@/lib/utils";
import { TSliders } from "@/types/sliders/slider";
import Image from "next/image";
import Link from "next/link";

const CarouselUi = ({ slider }: { slider: TSliders }) => {
  const { bannerLink, image } = slider;

  const content = (
    <div
      className={cn(
        "block relative w-full aspect-[2/1] sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-md md:rounded-xl overflow-hidden shadow-sm group border border-border",
        bannerLink && "cursor-pointer"
      )}
    >
      <Image
        className="w-full h-full object-cover transition-transform duration-700"
        src={getImageSrc(image?.src)}
        alt={image?.alt || "ShajGhor beauty product banner"}
        height={1200}
        width={1920}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
        priority
      />
      <div className="absolute inset-0 bg-foreground/5" />
    </div>
  );

  if (bannerLink) {
    return <Link href={bannerLink}>{content}</Link>;
  }

  return content;
};

export default CarouselUi;
