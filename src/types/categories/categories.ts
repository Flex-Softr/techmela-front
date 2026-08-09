export type TSubCategory = {
  _id: string;
  slug: string;
  name: string;
  productCount: number;
  hasProducts: boolean;
};

// Define TCategory type
export type TCategory = {
  hasProducts: boolean;
  description?: string;
  slug: string;
  _id: string;
  name: string;
  image: {
    _id: string;
    src: string;
    alt: string;
  };
  children?: TCategory[];
  productCount?: number;
};

export default TCategory;
