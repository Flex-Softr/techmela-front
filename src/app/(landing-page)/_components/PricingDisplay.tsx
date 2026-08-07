type Props = {
  regularPrice: number;
  salePrice: number;
  className?: string;
  isLarge?: boolean;
};

const PricingDisplay = ({
  regularPrice,
  salePrice,
  className = "",
  isLarge = false,
}: Props) => {
  const discount =
    regularPrice > salePrice
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  return (
    <div
      className={`flex flex-col ${isLarge ? "items-center lg:items-start" : "items-start"} ${className}`}
    >
      <div className="flex items-baseline gap-3">
        {/* Sale Price */}
        <span
          className={`${isLarge ? "text-5xl lg:text-7xl" : "text-4xl lg:text-5xl"} font-black text-primary`}
        >
          &#2547;{salePrice}
        </span>

        {/* Regular Price */}
        {regularPrice > salePrice && (
          <span
            className={`${isLarge ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"} text-slate-400 line-through decoration-2`}
          >
            &#2547;{regularPrice}
          </span>
        )}
      </div>

      {/* Discount Badge/Text */}
      {discount > 0 && (
        <div
          className={`mt-1 font-bold text-primary ${isLarge ? "text-lg lg:text-xl" : "text-sm lg:text-base"} animate-pulse`}
        >
          You&apos;re getting {discount}% off!
        </div>
      )}
    </div>
  );
};

export default PricingDisplay;
