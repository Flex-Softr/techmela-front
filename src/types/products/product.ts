import { TImage } from "../image";

type TProductBrand = {
  _id: string;
  name: string;
};

type TProductCategory = { _id: string; name: string };

export type TProduct = {
  thumbnail: TImage;
  stockStatus: string; // "in_stock" | "low_stock" | "out_of_stock"
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  regularPrice: number;
  salePrice: number;
  discountPercent: number;
  priceSave: number;
  type?: string;
  stockAvailable?: number;
  category?: TProductCategory;
  brand?: TProductBrand[];
  image?: TImage; // Keeping for backward compatibility if needed, but API uses thumbnail
  totalReview?: number;
  averageRating?: number | null;
  // Deprecated or mapped fields potentially
  price?: number;
  stock?: "In stock" | "Out of stock" | "On backorder";
};
