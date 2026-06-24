import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import { Metadata } from "next";

export const BLOG_DESCRIPTION =
  "সিদ্দীকিয়া প্রকাশনীর ব্লগে স্বাগতম! এখানে পাবেন ইসলামিক বইয়ের রিভিউ, আহলে সুন্নাতের আকিদা বিষয়ক প্রবন্ধ, ফিকহ, হাদিস, তাফসির, সিরাত ও তাসাউফ বিষয়ক জ্ঞানভিত্তিক নিবন্ধ।";

export const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "সিদ্দীকিয়া প্রকাশনী ব্লগ",
  description: BLOG_DESCRIPTION,
  url: `${SITE_URL}/blog`,
  inLanguage: "bn-BD",
  publisher: {
    "@type": "Organization",
    name: "সিদ্দীকিয়া প্রকাশনী",
    logo: {
      "@type": "ImageObject",
      url: "https://siddikiaprokashoni.com/logo/logo.webp",
    },
  },
  about: [
    { "@type": "Thing", name: "ইসলামিক বই" },
    { "@type": "Thing", name: "ফিকহ" },
    { "@type": "Thing", name: "হাদিস" },
    { "@type": "Thing", name: "তাফসির" },
    { "@type": "Thing", name: "আকিদা" },
  ],
};

export const blogMetadata: Metadata = {
  title: "ব্লগ | ইসলামিক প্রবন্ধ",
  description: BLOG_DESCRIPTION,
  keywords: [
    "ইসলামিক ব্লগ",
    "ইসলামিক প্রবন্ধ",
    "বইয়ের রিভিউ",
    "ইসলামিক জ্ঞান",
    "আহলে সুন্নাতের আকিদা",
    "ফিকহ প্রবন্ধ",
    "হাদিস বিষয়ক লেখা",
    "Islamic blog Bangladesh",
    "Bangla Islamic articles",
    "সিদ্দীকিয়া প্রকাশনী ব্লগ",
  ].join(", "),
  openGraph: {
    title: "ব্লগ | সিদ্দীকিয়া প্রকাশনী",
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: "সিদ্দীকিয়া প্রকাশনী",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "https://siddikiaprokashoni.com/logo/logo.webp",
        alt: "সিদ্দীকিয়া প্রকাশনী ব্লগ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ব্লগ | সিদ্দীকিয়া প্রকাশনী",
    description: BLOG_DESCRIPTION,
    images: ["https://siddikiaprokashoni.com/logo/logo.webp"],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};
