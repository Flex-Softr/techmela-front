import {
  formatStockStatus,
  STOCK_STATUS,
  stockStatusColor,
} from "@/const/product.const";
import { TSingleProduct } from "@/types/products/singleProduct";
// import Link from "next/link";
import WarrantyInfo from "./WarrantyInfo";

type TProps = {
  product: TSingleProduct;
  selectedVariation?: TSingleProduct["variations"][0];
};

const ProductMainInfo = ({ product, selectedVariation }: TProps) => {
  const {
    title,
    // category,
    // brand,
    inventory,
    shortDescription,
    price,
    warranty,
    warrantyInfo,
  } = product;

  const currentPrice = selectedVariation?.price || price;
  const currentInventory = selectedVariation?.inventory || inventory;

  const regularPrice = currentPrice?.regularPrice;
  const salePrice = currentPrice?.salePrice;
  const discountPercent = currentPrice?.discountPercent;
  // const priceSave = currentPrice?.priceSave;
  // const sku = currentInventory?.sku || "N/A";
  const stockStatus = currentInventory?.stockStatus;

  const hideStock = currentInventory?.hideStock;
  const manageStock = currentInventory?.manageStock;
  const stockAvailable = currentInventory?.stockAvailable;

  // Price Component Helper
  const PriceDisplay = () => {
    if (salePrice && salePrice < (regularPrice || 0)) {
      return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-2xl font-extrabold text-black">
            &#2547;{salePrice}
          </span>
          <del className="text-muted-foreground text-lg">
            &#2547;{regularPrice}
          </del>
          {discountPercent && discountPercent > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Percentage Badge */}
              <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-extrabold shadow-sm whitespace-nowrap uppercase tracking-wider">
                {Math.round(discountPercent)}% ছাড়
              </span>

              {/* Savings Information */}
              {/* {priceSave && (
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold border border-green-200 flex items-center gap-1 whitespace-nowrap">
                  <span className="opacity-70 font-medium">সাশ্রয়</span>
                  <span>&#2547;{priceSave}</span>
                </span>
              )} */}
            </div>
          )}
        </div>
      );
    }
    return (
      <span className="text-2xl font-extrabold text-black">
        &#2547;{regularPrice}
      </span>
    );
  };

  const priceDisplay = <PriceDisplay />;

  // --- Chip Layout (Used when shortDescription exists) ---
  if (shortDescription) {
    return (
      <div className="space-y-4 pt-2">
        <h2 className="font-semibold text-xl lg:text-2xl text-foreground">
          {title}
        </h2>

        {/* Unified Info Flow (Flattened for better space usage) */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center pt-2">
          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-medium shrink-0">
              মূল্য:
            </span>
            {priceDisplay}
          </div>

          {/* Status Chip */}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium shrink-0">
              স্ট্যাটাস:
            </span>
            <span className={`${stockStatusColor(stockStatus)} font-bold`}>
              {stockStatus !== STOCK_STATUS.OUT_OF_STOCK &&
              manageStock &&
              !hideStock &&
              stockAvailable > 0
                ? `${stockAvailable} ${formatStockStatus(stockStatus)}`
                : formatStockStatus(stockStatus)}
            </span>
          </div>

          {/* SKU Chip */}
          {/* <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium shrink-0">
              SKU:
            </span>
            <span className="font-semibold text-foreground truncate">
              {sku}
            </span>
          </div> */}

          {/* Category Chip */}
          {/* <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium shrink-0">
              Category:
            </span>
            <Link
              href={`/shop?category=${category?.[0]?.slug}`}
              className="font-semibold text-foreground hover:text-primary hover:underline truncate"
            >
              {category?.[0]?.name}
            </Link>
          </div> */}

          {/* Brand Chip */}
          {/* <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium shrink-0">
              Prokashoni:
            </span>
            <span className="font-semibold text-foreground truncate">
              {brand?.name || "N/A"}
            </span>
          </div> */}
        </div>

        {/* Short Description */}
        <div className="py-2">
          <div
            dangerouslySetInnerHTML={{ __html: shortDescription }}
            className="text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none"
          />
        </div>

        {/* Warranty Info */}
        {warranty && warrantyInfo && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t border-dashed border-gray-200">
            <span className="text-black font-bold">Warranty:</span>
            <WarrantyInfo warrantyInfo={warrantyInfo} />
          </div>
        )}
      </div>
    );
  }

  // --- Default Layout (Used when NO shortDescription) ---
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl lg:text-2xl text-foreground">
        {title}
      </h2>

      {/* Price Section */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium text-lg">
          মূল্য:
        </span>
        {priceDisplay}
      </div>

      {/* Meta Info: Brand, SKU, Stock */}
      <div className="flex flex-col gap-2 py-2">
        {/* Status */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">
            স্ট্যাটাস:
          </span>
          <div className="flex-1">
            <span
              className={`${stockStatusColor(stockStatus)} font-bold bg-red-50 px-2 py-0.5 rounded`}
            >
              {stockStatus !== STOCK_STATUS.OUT_OF_STOCK &&
              manageStock &&
              !hideStock &&
              stockAvailable > 0
                ? `${stockAvailable} ${formatStockStatus(stockStatus)}`
                : formatStockStatus(stockStatus)}
            </span>
          </div>
        </div>

        {/* SKU */}
        {/* <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">SKU:</span>
          <span className="font-semibold text-foreground flex-1">{sku}</span>
        </div> */}

        {/* Category */}
        {/* {category && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium w-24">
              Category:
            </span>
            <span className="font-semibold text-foreground flex-1">
              <Link
                className="hover:text-primary hover:underline"
                href={`/shop?category=${category?.[0]?.slug}`}
              >
                {category?.[0]?.name}
              </Link>
            </span>
          </div>
        )} */}

        {/* Brand */}
        {/* <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">
            Prokashoni:
          </span>
          <span className="font-semibold text-foreground flex-1">
            {brand?.name || "N/A"}
          </span>
        </div> */}

        {/* Warranty Info (Moved here for better context) */}
        {/* {warranty && warrantyInfo && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t border-dashed border-gray-200 mt-2">
            <span className="text-black font-bold w-24">Warranty:</span>
            <div className="flex-1">
              <WarrantyInfo warrantyInfo={warrantyInfo} />
            </div>
          </div>
        )} */}
      </div>

      {/* Short Description (Should be null here logically, but kept safe) */}
      {shortDescription && (
        <div
          dangerouslySetInnerHTML={{ __html: shortDescription }}
          className="text-muted-foreground text-sm leading-relaxed prose prose-sm max-w-none"
        />
      )}
    </div>
  );
};

export default ProductMainInfo;
