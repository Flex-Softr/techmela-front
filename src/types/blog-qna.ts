export type TBlogStatus = "draft" | "published" | "archived";
export type TBlogPostType = "pillar" | "medium" | "hub";
export type TBlogTaxonomyStatus = "active" | "inactive";

export type TEntityRef = {
  _id: string;
  name?: string;
  title?: string;
  question?: string;
  slug?: string;
  email?: string;
  fullName?: string;
  src?: string;
  alt?: string;
  excerpt?: string;
};

export type TSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  schemaMarkup?: string;
};

export type TBlogQACategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  seo?: TSeo;
  status: TBlogTaxonomyStatus;
};

export type TBlogQATag = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: TBlogTaxonomyStatus;
};

export type TBlogPost = {
  _id: string;
  title: string;
  slug: string;
  postType: TBlogPostType;
  content: string;
  excerpt?: string;
  readTime?: number;
  category: string | TEntityRef;
  topic?: string | TEntityRef;
  tags?: Array<string | TEntityRef>;
  author: string | TEntityRef;
  authorBio?: string;
  featuredImage?: string | TEntityRef;
  faqs?: { question: string; answer: string }[];
  toc?: { title: string; id: string }[];
  relatedBlogs?: Array<string | TEntityRef>;
  relatedBooks?: Array<string | TEntityRef>;
  seo?: TSeo;
  status: TBlogStatus;
  publishedAt?: string;
  views: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TQnA = {
  _id: string;
  question: string;
  slug: string;
  answer: string;
  category: string | TEntityRef;
  topic?: string | TEntityRef;
  tags?: Array<string | TEntityRef>;
  author: string | TEntityRef;
  relatedBlogs?: Array<string | TEntityRef>;
  relatedQuestions?: Array<string | TEntityRef>;
  relatedBooks?: Array<string | TEntityRef>;
  seo?: TSeo;
  status: TBlogStatus;
  views: number;
  createdAt?: string;
  updatedAt?: string;
};
