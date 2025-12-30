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
    stockStatus: string;
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
  variations: TVariation[];
  category: {
    _id: string;
    name: string;
  };
  publishedStatus: string;
  thumbnail: {
    _id: string;
    src: string;
    alt: string;
  };
  slug?: string; // Optional as not in sample but likely needed for links
};
