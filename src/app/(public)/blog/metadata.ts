import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";

export const BLOG_DESCRIPTION = `Welcome to the ${SITE.nameBn} blog! Find beauty tips, product reviews, and informative articles on skincare, makeup, haircare, and perfume.`;

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.nameBn} Blog`,
  description: BLOG_DESCRIPTION,
  url: `${SITE_URL}/blog`,
  inLanguage: "en-US",
  publisher: {
    "@type": "Organization",
    name: SITE.nameBn,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.baseUrl}${SITE.logoPath}`,
    },
  },
  about: [
    { "@type": "Thing", name: "Skincare" },
    { "@type": "Thing", name: "Makeup" },
    { "@type": "Thing", name: "Haircare" },
    { "@type": "Thing", name: "Perfume" },
    { "@type": "Thing", name: "Beauty tips" },
  ],
};

export const blogMetadata: Metadata = {
  title: "Blog | Beauty tips & guides",
  description: BLOG_DESCRIPTION,
  keywords: [
    "Beauty blog",
    "Cosmetics articles",
    "Product reviews",
    "Skincare tips",
    "Makeup guides",
    "Haircare articles",
    "Beauty blog Bangladesh",
    "Bangla cosmetics articles",
    `${SITE.nameBn} Blog`,
  ].join(", "),
  openGraph: {
    title: `Blog | ${SITE.nameBn}`,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: SITE.nameBn,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE.baseUrl}${SITE.logoPath}`,
        alt: `${SITE.nameBn} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE.nameBn}`,
    description: BLOG_DESCRIPTION,
    images: [`${SITE.baseUrl}${SITE.logoPath}`],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};
