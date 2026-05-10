import { formatStockStatus, stockStatusColor } from "@/const/product.const";
import { cn, getImageSrc } from "@/lib/utils";
import { TVariableProduct } from "@/types/products/variableProduct";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type TProps = {
  product: TVariableProduct;
  className?: string;
  priority?: boolean;
};

const VariableProductCard = ({
  product,
  className,
  priority = false,
}: TProps) => {
  const minPrice = product.minSalePrice || product.minRegularPrice || 0;
  const maxPrice = product.maxSalePrice || product.maxRegularPrice || 0;
  const hasMultiplePrices = minPrice !== maxPrice;

  // Determine previous price for strikethrough
  const previousPrice =
    product.minSalePrice && product.minSalePrice < product.maxRegularPrice
      ? product.maxRegularPrice
      : null;

  // Max discount for badge
  const maxDiscount = product.maxDiscountPercent || 0;
  // const maxPriceSave = product.maxPriceSave || 0;

  // Slug fallback
  const productSlug = product.slug;

  return (
    <div
      className={cn(
        "border border-border group/card sm:w-[300px] rounded-lg bg-background flex flex-col justify-between shadow-sm mx-auto h-full relative",
        className
      )}
    >
      <div className="flex flex-col gap-1.5 md:gap-3 p-1 md:p-3 relative">
        {/* Discount Badge */}
        {maxDiscount > 0 && (
          <div className="absolute -top-1.5 -left-1.5 md:-top-1 md:-left-1 z-20 w-9 h-9 md:w-14 md:h-14 flex items-center justify-center pointer-events-none drop-shadow-md transition-transform duration-300 group-hover/card:rotate-12">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M50 0 L56.5 7.5 L64.5 3.5 L69 12 L78.5 10.5 L80.5 20 L89.5 21 L88.5 30.5 L96.5 34 L93 43 L99 49 L93 55 L96.5 64 L88.5 67.5 L89.5 77 L80.5 78 L78.5 87.5 L69 86 L64.5 94.5 L56.5 90.5 L50 98 L43.5 90.5 L35.5 94.5 L31 86 L21.5 87.5 L19.5 78 L10.5 77 L11.5 67.5 L3.5 64 L7 55 L1 49 L7 43 L3.5 34 L11.5 30.5 L10.5 21 L19.5 20 L21.5 10.5 L31 12 L35.5 3.5 L43.5 7.5 Z"
                fill="#dc2626"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="rgba(251, 191, 36, 0.5)"
                strokeWidth="2.5"
                strokeDasharray="2.5 2.5"
              />
            </svg>
            <div className="relative text-white flex flex-col items-center justify-center leading-none">
              <span className="font-black text-[9px] md:text-sm tracking-tighter">
                {Math.round(maxDiscount)}%
              </span>
              <span className="text-[6px] md:text-[8px] font-black uppercase tracking-wider">
                ছাড়
              </span>
            </div>
          </div>
        )}
        {/* Price Save Badge */}
        {/* {maxPriceSave > 0 && (
          <div className="absolute rounded-full top-1 right-1 md:top-2 md:right-2 z-10 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white text-[8px] md:text-[11px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 shadow-md flex items-center justify-center border border-white/20 uppercase tracking-tighter">
            সাশ্রয় &#2547;{maxPriceSave}
          </div>
        )} */}

        <Link className="block" href={`/product/${productSlug}`}>
          <Image
            src={getImageSrc(product?.thumbnail?.src)}
            alt={product?.thumbnail?.alt || ""}
            height={400}
            width={400}
            className="w-full aspect-square object-contain mx-auto rounded-md transition-transform duration-300 group-hover/card:scale-105 bg-gray-50/50"
            priority={priority}
          />
        </Link>
        <div className="flex flex-col gap-2 xms:px-1 xls:px-1 sm:px-1 md:px-2">
          <h2 className="font-semibold text-foreground text-sm md:text-base">
            {product?.title?.length < 40 ? (
              product?.title
            ) : (
              <>{product?.title?.slice(0, 40)}...</>
            )}
          </h2>
          <div className="flex justify-between items-center">
            <div>
              {minPrice > 0 ? (
                <>
                  {previousPrice && !hasMultiplePrices && (
                    <span className="text-muted-foreground text-xs md:text-sm mr-1">
                      &#2547;
                      <del>{previousPrice}</del>
                    </span>
                  )}
                  <span className="font-bold text-xs md:text-sm">
                    &#2547;{minPrice}
                    {hasMultiplePrices && ` - ${maxPrice}`}
                  </span>
                </>
              ) : (
                <span className="font-bold text-xs md:text-sm text-gray-400">
                  Unavailable
                </span>
              )}
            </div>
            <div>
              <span
                className={cn(
                  "text-xs md:text-sm font-semibold",
                  stockStatusColor(product.stockStatus)
                )}
              >
                {formatStockStatus(product.stockStatus)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button size={"sm"} asChild className="m-1 md:m-3 mt-0">
        <Link href={`/product/${productSlug}`}>অপশনগুলো দেখুন</Link>
      </Button>
    </div>
  );
};

export default VariableProductCard;
