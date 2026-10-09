export type THomePageSectionImage = {
  _id?: string;
  src: string;
  alt?: string;
};

export type THomePageSection = {
  _id: string;
  title?: string;
  subtitle?: string;
  image?: THomePageSectionImage | null;
  collectionId: string | { _id: string; slug: string };
  sortOrder?: number;
  limit?: number;
  ctaText?: string;
  ctaLink?: string;
};
