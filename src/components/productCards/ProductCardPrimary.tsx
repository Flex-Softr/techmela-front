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
      <div className="flex flex-col gap-3 p-1 md:p-3 relative">
        {product.discountPercent > 0 && (
          <p
            className={`absolute top-2 left-2 text-xs md:text-sm bg-secondary text-secondary-foreground
          px-2 py-1 rounded-full`}
          >
            -{product.discountPercent}%
          </p>
        )}

        <div className="">
          <Image
            src={getImageSrc(product?.thumbnail?.src)}
            alt={product?.thumbnail?.alt || ""}
            height={400}
            width={400}
            className="w-full aspect-square object-cover mx-auto rounded-md"
            priority
          />
        </div>
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
                    product.stockStatus === "in_stock"
                      ? "text-green-500"
                      : product.stockStatus === "low_stock"
                        ? "text-yellow-600"
                        : "text-red-500"
                  )}
                >
                  {product.stockStatus === "in_stock"
                    ? "In Stock"
                    : product.stockStatus === "low_stock"
                      ? "Low Stock"
                      : "Out of Stock"}
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
