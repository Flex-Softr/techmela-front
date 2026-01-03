import { cn, getImageSrc } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const CarousalProductsCard = ({
  product,
  className,
}: {
  product: TProduct;
  className?: string;
}) => {
  const discountBadgeClass =
    product.discountPercent && Number(product.discountPercent) > 10
      ? "bg-red-500 text-white  md:text-xs px-2 py-1 rounded fire-animation"
      : "bg-green-500 text-white  md:text-xs px-2 py-1 rounded";
  return (
    <div
      // href={`/product/${product._id}/${product.slug}`}
      className={cn(
        "border border-border group/card w-[165px] sm:w-[300px] rounded-lg overflow-hidden bg-background flex flex-col justify-between shadow-sm mx-auto h-full",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:p-3 relative">
        {product.discountPercent > 0 && (
          <p className={`absolute top-0 left-0  ${discountBadgeClass}`}>
            {product.discountPercent}% Off
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
          <h2 className="font-semibold">
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
                  <span className="text-gray-500 xms:text-[9px] xls:text-[10px] sm:text-[10px] md:text-xs">
                    &#2547;
                    <del>{product?.regularPrice}</del>
                  </span>
                  <span className="font-bold xms:text-xs xls:text-xs sm:text-sm md:text-md">
                    {" "}
                    &#2547;{product?.salePrice}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold">
                    &#2547;{product?.regularPrice}
                  </span>
                </>
              )}
            </div>
            <div>
              {product?.stockStatus ? (
                <span
                  className={`${product?.stockStatus === "In stock" ? "text-green-500" : "text-red-500"} text-[10px] md:text-sm`}
                >
                  {product?.stockStatus}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Button asChild className="m-3 mt-0">
        <Link href={`/product/${product._id}/${product.slug}`}>Buy now</Link>
      </Button>
    </div>
  );
};

export default CarousalProductsCard;
