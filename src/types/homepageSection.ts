export type THomePageSection = {
  _id: string;
  title?: string;
  subtitle: string;
  collectionId: string | { _id: string };
  sortOrder?: number;
  limit?: number;
  ctaText?: string;
  ctaLink?: string;
};
