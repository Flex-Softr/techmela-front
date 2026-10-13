import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";

export const BLOG_DESCRIPTION = `${SITE.nameBn} ব্লগে আপনাকে স্বাগতম! সেরা টেক গ্যাজেট, ইলেকট্রনিক্স পণ্য, ব্যবহারের সঠিক নিয়ম ও রিভিউ নিয়ে তথ্যবহুল ব্লগ।`;

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.nameBn} Blog`,
  description: BLOG_DESCRIPTION,
  url: `${SITE_URL}/blog`,
  inLanguage: "bn-BD",
  publisher: {
    "@type": "Organization",
    name: SITE.nameBn,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.baseUrl}${SITE.logoPath}`,
    },
  },
  about: [
    { "@type": "Thing", name: "Gadgets" },
    { "@type": "Thing", name: "Electronics" },
    { "@type": "Thing", name: "Reviews" },
    { "@type": "Thing", name: "Tech Tips" },
  ],
};

export const blogMetadata: Metadata = {
  title: `ব্লগ ও টেক গাইড | ${SITE.nameBn}`,
  description: BLOG_DESCRIPTION,
  keywords: [
    "Tech blog",
    "Electronics articles",
    "Gadget reviews",
    "Tech tips Bangladesh",
    "Bangla tech blog",
    `${SITE.nameBn} Blog`,
  ].join(", "),
  openGraph: {
    title: `ব্লগ | ${SITE.nameBn}`,
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: SITE.nameBn,
    locale: "bn_BD",
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
    title: `ব্লগ | ${SITE.nameBn}`,
    description: BLOG_DESCRIPTION,
    images: [`${SITE.baseUrl}${SITE.logoPath}`],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};
