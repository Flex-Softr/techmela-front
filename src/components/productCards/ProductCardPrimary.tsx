import { formatStockStatus, stockStatusColor } from "@/const/product.const";
import { cn, getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type TProps = {
  product: TProduct;
  className?: string;
};
//
const ProductCardPrimary = ({ product, className }: TProps) => {
  // const discountBadgeClass =
  //   product.discountPercent && Number(product.discountPercent) > 10
  //     ? "bg-red-500 text-white  md:text-xs px-2 py-1 rounded fire-animation"
  //     : "bg-green-500 text-white  md:text-xs px-2 py-1 rounded";

  return (
    <div
      // href={`/product/${product._id}/${product.slug}`}
      className={cn(
        "border border-border group/card sm:w-[300px] rounded-lg overflow-hidden bg-background flex flex-col justify-between shadow-sm mx-auto h-full",
        className
      )}
    >
      <div className="flex flex-col gap-1.5 md:gap-3 p-1 md:p-3 relative">
        {product.discountPercent > 0 && (
          <p className="absolute md:top-2 md:left-2 top-1 left-1 z-10 text-[9px] md:text-xs bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-sm font-semibold md:font-medium border border-white/20">
            -{product.discountPercent}% Off
          </p>
        )}
        {product.priceSave > 0 && (
          <p className="absolute md:top-2 md:right-2 top-1 right-1 z-10 text-[9px] md:text-xs bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-sm md:font-medium border border-white/20">
            Save ৳{product.priceSave}
          </p>
        )}

        <Link className="block" href={`/product/${product.slug}`}>
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
          <div className="flex justify-between">
            <div>
              {product?.salePrice ? (
                <>
                  <span className="text-muted-foreground text-xs md:text-sm">
                    &#2547;
                    <del>{product?.regularPrice}</del>
                  </span>
                  <span className="font-bold text-xs md:text-sm">
                    {" "}
                    &#2547;{product?.salePrice}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-xs md:text-sm">
                    &#2547;{product?.regularPrice}
                  </span>
                </>
              )}
            </div>
            <div>
              {product?.stockStatus ? (
                <span
                  className={cn(
                    "text-xs md:text-sm font-semibold",
                    stockStatusColor(product.stockStatus)
                  )}
                >
                  {formatStockStatus(product.stockStatus)}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Button size={"sm"} asChild className="m-1 md:m-3 mt-0">
        <Link href={`/product/${product.slug}`}>Buy now</Link>
      </Button>
    </div>
  );
};

export default ProductCardPrimary;
