import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";

export const BLOG_DESCRIPTION = `${SITE.nameBn}র ব্লগে স্বাগতম! এখানে পাবেন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার ও পারফিউম বিষয়ক বিউটি টিপস, প্রোডাক্ট রিভিউ এবং সৌন্দর্যচর্চার জ্ঞানভিত্তিক নিবন্ধ।`;

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${SITE.nameBn} ব্লগ`,
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
    { "@type": "Thing", name: "স্কিনকেয়ার" },
    { "@type": "Thing", name: "মেকআপ" },
    { "@type": "Thing", name: "হেয়ারকেয়ার" },
    { "@type": "Thing", name: "পারফিউম" },
    { "@type": "Thing", name: "বিউটি টিপস" },
  ],
};

export const blogMetadata: Metadata = {
  title: "ব্লগ | বিউটি টিপস ও গাইড",
  description: BLOG_DESCRIPTION,
  keywords: [
    "বিউটি ব্লগ",
    "কসমেটিক্স প্রবন্ধ",
    "প্রোডাক্ট রিভিউ",
    "স্কিনকেয়ার টিপস",
    "মেকআপ গাইড",
    "হেয়ারকেয়ার প্রবন্ধ",
    "Beauty blog Bangladesh",
    "Bangla cosmetics articles",
    `${SITE.nameBn} ব্লগ`,
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
        alt: `${SITE.nameBn} ব্লগ`,
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
