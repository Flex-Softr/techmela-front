type TImage = {
  alt: string;
  src: string;
  thumbnail: string;
};

type TProduct = {
  _id: string;
  title: string;
  image?: TImage;
  thumbnail?: TImage;
  slug: string;
  salePrice?: number;
  regularPrice?: number;
  brand?: { name: string };
  category?: Array<{ name: string }>;
};

type TPrice = {
  regularPrice: number;
  salePrice: number;
};

type TVariation = {
  _id: string;
  attributes: Record<string, string>;
  price?: number;
  regularPrice?: number;
};

export type TCartItemData = {
  image: {
    src: string;
    alt: string;
  };
  _id: string;
  product: TProduct;
  price: TPrice;
  quantity: number;
  variation: TVariation;
};

export type TCart = {
  _id: string;
  cartItems: TCartItemData[];
  data: object;
};
