import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";

const HighlightAProduct = ({ product }: { product: TProduct | null }) => {
  return (
    <section className="pt-20">
      <ContainerMax>
        <Link
          href={`/product/${product?.slug}`}
          className="grid grid-cols-8 md:px-10 md:py-8 px-5 py-4 rounded-md justify-center md:justify-between items-center shadow-md ring-1 ring-base-100 group gap-5 w-full relative overflow-hidden"
        >
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <h2 className="col-span-4 md:col-span-5 text-xs md:text-xl font-light text-end">
            Shop now and save big on our{" "}
            <span className="font-bold text-secondary text-sm md:text-2xl">
              {" "}
              {product?.title}
            </span>
          </h2>
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <div className="bg-muted text-primary-foreground group-hover:bg-primary font-bold rounded-md px-2 py-2 text-center transition-all text-xs md:text-sm max-w-24 md:max-w-32 w-full">
              Starting at
              <br />
              &#2547;{" "}
              {product?.salePrice ? product.salePrice : product?.regularPrice}
            </div>
          </div>
          <div className="mx-auto col-span-2">
            <Image
              src={getImageSrc(product?.image?.src)}
              alt={product?.image?.alt || ""}
              width={200}
              height={200}
              className="w-20 h-20"
            />
          </div>
        </Link>
      </ContainerMax>
    </section>
  );
};

export default HighlightAProduct;
