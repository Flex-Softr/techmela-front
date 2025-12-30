import { TSingleProduct } from "@/types/products/singleProduct";
import Link from "next/link";
import WarrantyInfo from "./WarrantyInfo";

type TProps = {
  product: TSingleProduct;
  selectedVariation?: TSingleProduct["variations"][0];
};

const ProductMainInfo = ({ product, selectedVariation }: TProps) => {
  const {
    title,
    category,
    brand,
    inventory,
    shortDescription,
    price,
    variations = [],
    warranty,
    warrantyInfo,
  } = product;

  // Determine actual display values based on selection or defaults
  const currentPrice = selectedVariation?.price || price;
  const currentInventory = selectedVariation?.inventory || inventory;

  // Price Calculation Logic
  const regularPrice = currentPrice?.regularPrice || 0;
  const salePrice = currentPrice?.salePrice || 0;

  // Discount Calculation
  let discountPercent = currentPrice?.discountPercent || 0;
  if (!discountPercent && regularPrice > salePrice) {
    discountPercent = Math.round(
      ((regularPrice - salePrice) / regularPrice) * 100
    );
  }

  // Stock Logic
  // If distinct variation selected: use that variation's stock
  // If variable product & no selection: sum up all variations stock
  // If simple product: use main inventory stock
  let stockQuantity = 0;
  let isOutOfStock = true;

  if (selectedVariation) {
    stockQuantity = selectedVariation.inventory?.stockAvailable || 0;
    isOutOfStock = stockQuantity <= 0;
  } else if (variations.length > 0) {
    // Variable product, no selection: aggregate stock
    stockQuantity = variations.reduce(
      (acc, v) => acc + (v.inventory?.stockAvailable || 0),
      0
    );
    isOutOfStock = stockQuantity <= 0;
  } else {
    // Simple product
    stockQuantity = inventory?.stockAvailable || 0;
    isOutOfStock = stockQuantity <= 0;
  }

  // Price Display Logic
  let priceDisplay: React.ReactNode;
  let chipPriceDisplay: React.ReactNode;

  if (!selectedVariation && variations.length > 0) {
    const prices = variations.map(
      (v) => v.price.salePrice || v.price.regularPrice
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (minPrice !== maxPrice) {
      priceDisplay = (
        <span className="text-2xl font-extrabold text-black">
          &#2547;{minPrice} - &#2547;{maxPrice}
        </span>
      );
      chipPriceDisplay = (
        <span className="font-extrabold text-lg text-black">
          &#2547;{minPrice} - &#2547;{maxPrice}
        </span>
      );
    } else {
      priceDisplay = (
        <span className="text-2xl font-extrabold text-black">
          &#2547;{minPrice}
        </span>
      );
      chipPriceDisplay = (
        <span className="font-extrabold text-lg text-black">
          &#2547;{minPrice}
        </span>
      );
    }
  } else {
    // Simple product or selected variation
    if (salePrice && salePrice < regularPrice) {
      priceDisplay = (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-black">
            &#2547;{salePrice}
          </span>
          <del className="text-muted-foreground text-lg">
            &#2547;{regularPrice}
          </del>
          {discountPercent > 0 && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      );
      chipPriceDisplay = (
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-lg text-black">
            &#2547;{salePrice}
          </span>
          <del className="text-gray-500 text-sm">&#2547;{regularPrice}</del>
          {discountPercent > 0 && (
            <span className="text-red-600 text-xs font-bold">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      );
    } else {
      priceDisplay = (
        <span className="text-2xl font-extrabold text-black">
          &#2547;{regularPrice}
        </span>
      );
      chipPriceDisplay = (
        <span className="font-extrabold text-lg text-black">
          &#2547;{regularPrice}
        </span>
      );
    }
  }

  // --- Chip Layout (Used when shortDescription exists) ---
  if (shortDescription) {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold text-xl lg:text-2xl text-foreground">
          {title}
        </h2>

        {/* Chips Container */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Price Chip */}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">Price:</span>
            <span className="font-semibold text-black">{chipPriceDisplay}</span>
          </div>

          {/* Status Chip */}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">Status:</span>
            {isOutOfStock ? (
              <span className="text-red-600 font-bold">Out of stock</span>
            ) : (
              <span className="text-green-600 font-bold">
                {!selectedVariation && variations.length > 0
                  ? "In Stock"
                  : `${stockQuantity} In stock`}
              </span>
            )}
          </div>

          {/* SKU Chip */}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">SKU:</span>
            <span className="font-semibold text-foreground">
              {selectedVariation
                ? currentInventory?.sku || "N/A"
                : inventory?.sku || "N/A"}
            </span>
          </div>

          {/* Category Chip */}
          {category && (
            <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
              <span className="text-muted-foreground font-medium">
                Category:
              </span>
              <Link
                href={`/shop?category=${category.slug}`}
                className="font-semibold text-foreground hover:text-primary hover:underline"
              >
                {category.name}
              </Link>
            </div>
          )}

          {/* Brand Chip */}
          <div className="px-4 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">Brand:</span>
            <span className="font-semibold text-foreground">
              {brand?.name || "N/A"}
            </span>
          </div>
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
          Price:
        </span>
        {priceDisplay}
      </div>

      {/* Meta Info: Brand, SKU, Stock */}
      <div className="flex flex-col gap-2 py-2">
        {/* Status */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">
            Status:
          </span>
          <div className="flex-1">
            {isOutOfStock ? (
              <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">
                Out of stock
              </span>
            ) : (
              <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                {!selectedVariation && variations.length > 0
                  ? "In Stock"
                  : `${stockQuantity} In stock`}
              </span>
            )}
          </div>
        </div>

        {/* SKU */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">SKU:</span>
          <span className="font-semibold text-foreground flex-1">
            {selectedVariation
              ? currentInventory?.sku || "N/A"
              : inventory?.sku || "N/A"}
          </span>
        </div>

        {/* Category */}
        {category && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium w-24">
              Category:
            </span>
            <span className="font-semibold text-foreground flex-1">
              <Link
                className="hover:text-primary hover:underline"
                href={`/shop?category=${category.slug}`}
              >
                {category.name}
              </Link>
            </span>
          </div>
        )}

        {/* Brand */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium w-24">Brand:</span>
          <span className="font-semibold text-foreground flex-1">
            {brand?.name || "N/A"}
          </span>
        </div>

        {/* Warranty Info (Moved here for better context) */}
        {warranty && warrantyInfo && (
          <div className="flex items-center gap-2 text-sm pt-2 border-t border-dashed border-gray-200 mt-2">
            <span className="text-black font-bold w-24">Warranty:</span>
            <div className="flex-1">
              <WarrantyInfo warrantyInfo={warrantyInfo} />
            </div>
          </div>
        )}
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
