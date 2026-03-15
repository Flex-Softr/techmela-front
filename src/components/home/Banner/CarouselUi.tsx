import { cn, getImageSrc } from "@/lib/utils";
import { TSliders } from "@/types/sliders/slider";
import Image from "next/image";
import Link from "next/link";

const CarouselUi = ({ slider }: { slider: TSliders }) => {
  const { bannerLink, image } = slider;

  const content = (
    <div
      className={cn(
        "block relative w-full h-[200px] sm:h-[300px] md:h-[380px] lg:h-[460px] rounded-xl overflow-hidden shadow-sm group border border-gray-100",
        bannerLink && "cursor-pointer"
      )}
    >
      <Image
        className="w-full h-full object-fill transition-transform duration-700"
        src={getImageSrc(image?.src)}
        alt={image?.alt || "সিদ্দীকিয়া প্রকাশনী ইসলামিক বই ব্যানার"}
        height={1200}
        width={1920}
        priority
      />
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );

  if (bannerLink) {
    return <Link href={bannerLink}>{content}</Link>;
  }

  return content;
};

export default CarouselUi;
