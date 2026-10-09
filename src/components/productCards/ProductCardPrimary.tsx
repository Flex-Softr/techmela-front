import { Button } from "@/components/ui/button";
import { formatStockStatus, stockStatusColor } from "@/const/product.const";
import { cn, getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  product: TProduct;
  className?: string;
  priority?: boolean;
};

const ProductCardPrimary = ({
  product,
  className,
  priority = false,
}: TProps) => {
  const title = product?.title || "";
  const truncatedTitle = title.length > 48 ? `${title.slice(0, 48)}...` : title;

  return (
    <article
      className={cn(
        "group/card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      {product.discountPercent > 0 && (
        <div className="absolute left-2.5 top-2.5 z-20 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold leading-none text-destructive-foreground shadow-sm">
          -{Math.round(product.discountPercent)}%
        </div>
      )}

      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-gradient-to-b from-muted/30 to-transparent"
      >
        <Image
          src={getImageSrc(product?.thumbnail?.src)}
          alt={product?.thumbnail?.alt || title}
          height={320}
          width={320}
          className="aspect-square w-full object-contain p-3 transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 pt-2">
        <Link href={`/product/${product.slug}`} className="block">
          <h2
            title={title}
            className="line-clamp-2 min-h-[2.25rem] text-[12px] font-semibold leading-snug text-foreground transition-colors group-hover/card:text-primary sm:text-[13px]"
          >
            {truncatedTitle}
          </h2>
        </Link>

        {/* Amber rating indicator matching Stitch spec */}
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="text-warning text-xs font-semibold">★ 4.9</span>
          <span className="text-[10px] text-muted-foreground">(24)</span>
        </div>

        <div className="flex items-center justify-between gap-1.5 mt-auto pt-1">
          <div className="min-w-0">
            {product?.salePrice ? (
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-sm font-bold tracking-tight text-foreground">
                  ৳{product.salePrice}
                </span>
                <span className="text-[11px] text-muted-foreground line-through">
                  ৳{product.regularPrice}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold tracking-tight text-foreground">
                ৳{product?.regularPrice}
              </span>
            )}
          </div>
          {product?.stockStatus ? (
            <span
              className={cn(
                "shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent/50",
                stockStatusColor(product.stockStatus)
              )}
            >
              {formatStockStatus(product.stockStatus)}
            </span>
          ) : null}
        </div>
      </div>

      <Button
        size="sm"
        asChild
        className="m-3 mt-1 h-8 w-[calc(100%-1.5rem)] text-xs rounded-full bg-primary hover:bg-secondary text-primary-foreground shadow-sm transition-all"
      >
        <Link href={`/product/${product.slug}`}>
          <Eye className="!size-3.5 mr-1" />
          View Details
        </Link>
      </Button>
    </article>
  );
};

export default ProductCardPrimary;
