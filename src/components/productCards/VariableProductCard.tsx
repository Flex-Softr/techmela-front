import { formatStockStatus, stockStatusColor } from "@/const/product.const";
import { cn, getImageSrc } from "@/lib/utils";
import { TVariableProduct } from "@/types/products/variableProduct";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type TProps = {
  product: TVariableProduct;
  className?: string;
};

const VariableProductCard = ({ product, className }: TProps) => {
  const minPrice = product.minSalePrice || product.minRegularPrice || 0;
  const maxPrice = product.maxSalePrice || product.maxRegularPrice || 0;
  const hasMultiplePrices = minPrice !== maxPrice;

  // Max discount for badge
  const maxDiscount = product.maxDiscountPercent || 0;
  const maxPriceSave = product.maxPriceSave || 0;

  // Slug fallback
  const productSlug = product.slug;

  return (
    <div
      className={cn(
        "border border-border group/card sm:w-[300px] rounded-lg overflow-hidden bg-background flex flex-col justify-between shadow-sm mx-auto h-full",
        className
      )}
    >
      <div className="flex flex-col gap-3 p-1 md:p-3 relative">
        {/* Discount Badge */}
        {maxDiscount > 0 && (
          <p className="absolute top-2 left-2 text-[10px] md:text-xs bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-sm font-semibold border border-white/20">
            -{maxDiscount}% Off
          </p>
        )}
        {/* Price Save Badge */}
        {maxPriceSave > 0 && (
          <p className="absolute top-2 right-2 text-[10px] md:text-xs bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-sm font-medium border border-white/20">
            Save ৳{maxPriceSave}
          </p>
        )}

        <Link className="block" href={`/product/${productSlug}`}>
          <Image
            src={getImageSrc(product?.thumbnail?.src)}
            alt={product?.thumbnail?.alt || ""}
            height={400}
            width={400}
            className="w-full aspect-square object-cover mx-auto rounded-md"
            priority
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
                <span className="font-bold text-xs md:text-sm">
                  &#2547;{minPrice}
                  {hasMultiplePrices && ` - ${maxPrice}`}
                </span>
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
        <Link href={`/product/${productSlug}`}>View options</Link>
      </Button>
    </div>
  );
};

export default VariableProductCard;
