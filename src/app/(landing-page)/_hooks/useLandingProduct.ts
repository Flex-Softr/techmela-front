"use client";

import { PRODUCT_TYPE, STOCK_STATUS } from "@/const/product.const";
import {
  getDefaultVariation,
  getTrackingItemId,
  getVariantLabel,
  isVariationInStock,
} from "@/lib/ec/variation";
import { getImageSrc } from "@/lib/utils";
import { TSingleProduct, TVariations } from "@/types/products/singleProduct";
import { useMemo, useState } from "react";
import { TLandingTrackingProduct } from "./useLandingPageTracking";

type TFallbacks = {
  id: string;
  title: string;
  regularPrice: number;
  salePrice: number;
  thumbnail: string;
  brand?: string;
  category?: string;
};

/**
 * Single source of truth for the product shown on a sales landing page.
 * Handles both simple and variable products: the selected variation drives
 * price, stock, image, order payload and tracking item ID.
 */
const useLandingProduct = (
  product: TSingleProduct | null,
  fallbacks: TFallbacks
) => {
  const variations = useMemo(
    () =>
      product?.type === PRODUCT_TYPE.VARIABLE ? (product.variations ?? []) : [],
    [product]
  );
  const isVariable = variations.length > 0;

  // Start with the same default the VariationSelector picks, so view_content
  // carries a real variation ID (just like the main product page).
  const [selectedVariation, setSelectedVariation] =
    useState<TVariations | null>(() => getDefaultVariation(variations));

  // Some API responses expose prices under `pricing` instead of `price`
  const legacyPricing = (
    product as unknown as {
      pricing?: { regularPrice?: number; salePrice?: number };
    } | null
  )?.pricing;

  const baseRegularPrice =
    product?.price?.regularPrice ||
    legacyPricing?.regularPrice ||
    fallbacks.regularPrice;
  const baseSalePrice =
    product?.price?.salePrice ||
    legacyPricing?.salePrice ||
    fallbacks.salePrice;

  const variationPrice = selectedVariation?.price;
  const regularPrice = variationPrice?.regularPrice || baseRegularPrice;
  const salePrice =
    variationPrice?.salePrice || variationPrice?.regularPrice || baseSalePrice;

  const productId = product?._id || fallbacks.id;
  const title = product?.title || fallbacks.title;
  const variantLabel = getVariantLabel(selectedVariation);

  const isInStock = isVariable
    ? isVariationInStock(selectedVariation)
    : product?.inventory?.stockStatus !== STOCK_STATUS.OUT_OF_STOCK;

  const thumbnailSrc =
    getImageSrc(selectedVariation?.image?.src) ||
    getImageSrc(product?.thumbnail?.src) ||
    fallbacks.thumbnail;

  const trackingProduct = useMemo<TLandingTrackingProduct>(
    () => ({
      id: getTrackingItemId(productId, selectedVariation?._id),
      name: title,
      unitPrice: salePrice,
      brand: product?.brand?.name || fallbacks.brand,
      category: product?.category?.[0]?.name || fallbacks.category,
      variant: variantLabel,
    }),
    [
      productId,
      selectedVariation?._id,
      title,
      salePrice,
      product?.brand?.name,
      product?.category,
      fallbacks.brand,
      fallbacks.category,
      variantLabel,
    ]
  );

  return {
    productId,
    title,
    variations,
    isVariable,
    selectedVariation,
    setSelectedVariation,
    variantLabel,
    regularPrice,
    salePrice,
    isInStock,
    thumbnailSrc,
    trackingProduct,
  };
};

export default useLandingProduct;
