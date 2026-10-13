import { STOCK_STATUS } from "@/const/product.const";
import { TVariations } from "@/types/products/singleProduct";

/** "Color: Black, Size: XL" — the variant label used in tracking & order summaries. */
export const getVariantLabel = (
  variation?: Pick<TVariations, "attributes"> | null
): string | undefined => {
  if (!variation?.attributes) return undefined;
  const label = Object.entries(variation.attributes)
    .map(([name, value]) => `${name}: ${value}`)
    .join(", ");
  return label || undefined;
};

/** Default pick: first variation with available stock, otherwise the first one. */
export const getDefaultVariation = (
  variations?: TVariations[]
): TVariations | null => {
  if (!variations?.length) return null;
  return (
    variations.find((v) => (v.inventory?.stockAvailable ?? 0) > 0) ||
    variations[0]
  );
};

export const isVariationInStock = (variation?: TVariations | null) =>
  variation?.inventory?.stockStatus !== STOCK_STATUS.OUT_OF_STOCK;

/**
 * Tracking / catalog item ID. Same format the main website uses everywhere:
 * simple → "<productId>", variable → "<productId>-<variationId>".
 */
export const getTrackingItemId = (
  productId: string,
  variationId?: string | null
) => (variationId ? `${productId}-${variationId}` : productId);
