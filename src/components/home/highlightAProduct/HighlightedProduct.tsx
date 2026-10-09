import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HighlightAProduct = ({ product }: { product: TProduct | null }) => {
  if (!product) return null;

  return (
    <section className="py-8 md:py-12">
      <ContainerMax>
        <Link
          href={`/product/${product?.slug}`}
          className="relative block overflow-hidden rounded-2xl md:rounded-3xl border border-border/80 bg-gradient-to-r from-accent/50 via-card to-accent/30 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="size-3 text-warning fill-warning" />
                <span>Editorial Spotlight</span>
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {product?.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Handcrafted formulation tested for quality, purity, and long-lasting vitality.
              </p>
              <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
                <span className="text-lg md:text-xl font-bold text-primary">
                  ৳{product?.salePrice || product?.regularPrice}
                </span>
                {product?.salePrice && (
                  <span className="text-xs md:text-sm text-muted-foreground line-through">
                    ৳{product?.regularPrice}
                  </span>
                )}
                <Button
                  size="sm"
                  className="rounded-full px-5 ml-2 bg-primary hover:bg-secondary text-primary-foreground pointer-events-none"
                >
                  <span>Order Now</span>
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </div>

            <div className="shrink-0 relative size-28 sm:size-36 md:size-44 rounded-2xl bg-card border border-border/60 p-3 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src={getImageSrc(product?.image?.src || product?.thumbnail?.src)}
                alt={product?.image?.alt || product?.title || ""}
                width={180}
                height={180}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Link>
      </ContainerMax>
    </section>
  );
};

export default HighlightAProduct;
