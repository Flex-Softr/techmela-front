import { TStockStatus } from "@/const/product.const";
import { TImage } from "../image";

type TProductBrand = {
  _id: string;
  name: string;
};

type TProductCategory = { _id: string; name: string };

export type TProduct = {
  thumbnail?: TImage;
  stockStatus: TStockStatus;
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  regularPrice: number;
  salePrice: number;
  image?: TImage;
  discountPercent: number;
  priceSave: number;
  type?: string;
  stockAvailable?: number;
  category?: TProductCategory;
  brand?: TProductBrand[];
};
