import { TStockStatus } from "@/const/product.const";

export type TVariation = {
  _id: string;
  serial: number;
  productId: string;
  attributes: { [key: string]: string };
  price: {
    _id: string;
    regularPrice: number;
    salePrice: number;
    discountPercent: number;
    priceSave: number;
  };
  inventory: {
    _id: string;
    sku: string;
    stockStatus: TStockStatus;
    stockQuantity: number;
    stockAvailable: number;
    manageStock: boolean;
    lowStockWarning: number;
    hideStock: boolean;
  };
  isDeleted: boolean;
  __v: number;
};

export type TVariableProduct = {
  _id: string;
  title: string;
  type: string;
  variations?: TVariation[]; // Optional now as it might not be in list view
  category?: {
    _id: string;
    name: string;
  };
  thumbnail?: {
    _id: string;
    src: string;
    alt: string;
  };
  image?: {
    _id: string;
    src: string;
    alt: string;
  };
  slug: string;

  // New top-level fields for range
  minRegularPrice: number;
  maxRegularPrice: number;
  minSalePrice: number;
  maxSalePrice: number;
  minDiscountPercent: number;
  maxDiscountPercent: number;
  minPriceSave: number;
  maxPriceSave: number;
  stockStatus: TStockStatus;
};
