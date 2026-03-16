export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  productCount?: number;
  isActive: boolean;
};

export default TBrand;
