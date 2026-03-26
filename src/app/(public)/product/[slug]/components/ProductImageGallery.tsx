"use client";
import { getImageSrc } from "@/lib/utils";
import { TGalleryImage } from "@/types/products/singleProduct";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImageGallery = ({
  gallery,
  discount,
}: {
  gallery: TGalleryImage[];
  discount: number;
}) => {
  const galleryImages = gallery?.map((image) => ({
    original: getImageSrc(image?.src),
    thumbnail: getImageSrc(image?.src),
    crossOrigin: "anonymous",
  }));

  return (
    <div className="relative">
      <ImageGallery
        items={galleryImages}
        lazyLoad
        showNav={false}
        autoPlay // TODO: enable this
        infinite //TODO: enable this
      />
      {discount > 0 && (
        <div className="absolute -top-3 -right-3 lg:-top-5 lg:-right-5 z-10 w-14 h-14 lg:w-20 lg:h-20 flex items-center justify-center pointer-events-none drop-shadow-xl transition-transform duration-300 hover:rotate-12">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path
              d="M50 0 L56.5 7.5 L64.5 3.5 L69 12 L78.5 10.5 L80.5 20 L89.5 21 L88.5 30.5 L96.5 34 L93 43 L99 49 L93 55 L96.5 64 L88.5 67.5 L89.5 77 L80.5 78 L78.5 87.5 L69 86 L64.5 94.5 L56.5 90.5 L50 98 L43.5 90.5 L35.5 94.5 L31 86 L21.5 87.5 L19.5 78 L10.5 77 L11.5 67.5 L3.5 64 L7 55 L1 49 L7 43 L3.5 34 L11.5 30.5 L10.5 21 L19.5 20 L21.5 10.5 L31 12 L35.5 3.5 L43.5 7.5 Z"
              fill="#dc2626"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="rgba(251, 191, 36, 0.5)"
              strokeWidth="2.5"
              strokeDasharray="2.5 2.5"
            />
          </svg>
          <div className="absolute inset-0 text-white flex flex-col items-center justify-center leading-none">
            <span className="font-black text-sm lg:text-xl tracking-tighter">
              {Math.round(discount)}%
            </span>
            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-wider">
              ছাড়
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
