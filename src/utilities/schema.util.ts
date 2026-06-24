import { STOCK_STATUS } from "@/const/product.const";
import { getImageSrc } from "@/lib/utils";
import { TSingleProduct } from "@/types/products/singleProduct";
import { TBlogPost, TQnA } from "@/types/blog-qna";
import {
  getImageFromRef,
  getRefLabel,
  truncateText,
} from "@/app/(public)/_components/blog-qna/utils";
import { asPlainText } from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import { Metadata } from "next";

export const generateProductSchema = (product: TSingleProduct) => {
  // If custom schema markup is provided from backend, try to parse and use it
  if (product?.seo?.schemaMarkup) {
    try {
      const customSchema = JSON.parse(product.seo.schemaMarkup);
      return customSchema;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Invalid custom schema markup JSON", e);
    }
  }

  // Fallback to auto-generating default product schema
  const rawDescription =
    product?.seo?.metaDescription ||
    product?.shortDescription ||
    `সিদ্দীকিয়া প্রকাশনী থেকে ${product?.title || "বই"}টি কিনুন।`;

  const sanitizedDescription = rawDescription
    .replace(/<[^>]+>/g, "")
    .trim()
    .substring(0, 4900);

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: product?.title,
    description: sanitizedDescription,
    image: getImageSrc(product?.thumbnail?.src || product?.gallery?.[0]?.src),
    sku: product?.inventory?.sku,
    mpn: product?.inventory?.sku,
    brand: {
      "@type": "Brand",
      name: product?.brand?.name || "সিদ্দীকিয়া প্রকাশনী",
    },
    inLanguage: "bn",
    offers: {
      "@type": "Offer",
      url: `https://siddikiaprokashoni.com/product/${product?.slug}`,
      priceCurrency: "BDT",
      price: product?.price?.salePrice || product?.price?.regularPrice,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product?.inventory?.stockStatus === STOCK_STATUS.IN_STOCK
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "সিদ্দীকিয়া প্রকাশনী",
      },
    },
    author: product?.author
      ? { "@type": "Person", name: product.author }
      : product?.brand?.name
        ? { "@type": "Person", name: product.brand.name }
        : undefined,
    publisher: {
      "@type": "Organization",
      name: "সিদ্দীকিয়া প্রকাশনী",
    },
  };
};

export const generateBreadcrumbSchema = (product: TSingleProduct) => {
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "হোম",
      item: "https://siddikiaprokashoni.com",
    },
  ];

  if (product?.category && product.category.length > 0) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: product.category[0].name,
      item: `https://siddikiaprokashoni.com/category/${product.category[0].slug}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: product?.title,
      item: `https://siddikiaprokashoni.com/product/${product?.slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "সকল বই",
      item: "https://siddikiaprokashoni.com/shop",
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: product?.title,
      item: `https://siddikiaprokashoni.com/product/${product?.slug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };
};

export const generateProductMetadata = (
  product: TSingleProduct | undefined,
  slug: string
) => {
  if (!product) {
    const fallbackTitle = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return {
      title: fallbackTitle,
      description: `সিদ্দীকিয়া প্রকাশনী থেকে ${fallbackTitle} কিনুন।`,
    };
  }

  const imageUrl = getImageSrc(
    product?.thumbnail?.src || product?.gallery?.[0]?.src
  );

  const title = product?.seo?.metaTitle || product?.title;
  const rawDescription =
    product?.seo?.metaDescription ||
    product?.shortDescription ||
    "সিদ্দীকিয়া প্রকাশনী থেকে সেরা ইসলামিক বই কিনুন।";
  const description = rawDescription
    .replace(/<[^>]+>/g, "")
    .trim()
    .substring(0, 160);

  return {
    title,
    description,
    keywords: product?.seo?.keywords?.join(", ") || "",
    openGraph: {
      title,
      description,
      siteName: "সিদ্দীকিয়া প্রকাশনী",
      images: [
        {
          url: imageUrl,
          alt: title,
        },
        {
          url: "https://siddikiaprokashoni.com/logo/logo.webp",
          alt: "সিদ্দীকিয়া প্রকাশনী",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical:
        product?.seo?.canonicalUrl ||
        `https://siddikiaprokashoni.com/product/${slug}`,
    },
  };
};

// ----------------------------------------------------------------------
// BLOG SCHEMA UTILITIES
// ----------------------------------------------------------------------

export const generateArticleSchema = (post: TBlogPost, url: string) => {
  // If custom schema markup is provided from backend, try to parse and use it
  if (post?.seo?.schemaMarkup) {
    try {
      return JSON.parse(post.seo.schemaMarkup);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Invalid custom schema markup JSON", e);
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description:
      post.seo?.metaDescription || post.excerpt || truncateText(post.content),
    image: getImageFromRef(post.featuredImage),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: getRefLabel(post.author) || "সিদ্দীকিয়া প্রকাশনী",
    },
    publisher: {
      "@type": "Organization",
      name: "সিদ্দীকিয়া প্রকাশনী",
    },
    mainEntityOfPage: url,
  };
};

export const generateQnASchema = (item: TQnA) => {
  // If custom schema markup is provided from backend, try to parse and use it
  if (item?.seo?.schemaMarkup) {
    try {
      return JSON.parse(item.seo.schemaMarkup);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Invalid custom schema markup JSON", e);
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: item.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: asPlainText(item.answer),
      },
    },
  };
};

export const generateFAQSchema = (
  faqs: { question: string; answer: string }[] | undefined
) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: asPlainText(faq.answer),
      },
    })),
  };
};

export const generateBlogBreadcrumbSchema = (post: TBlogPost, url: string) => {
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "হোম",
      item: "https://siddikiaprokashoni.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "ব্লগ",
      item: "https://siddikiaprokashoni.com/blog",
    },
  ];

  let position = 3;

  if (post.category) {
    const categoryName = getRefLabel(post.category);
    const categorySlug =
      typeof post.category === "object" ? post.category.slug : "general";
    breadcrumbItems.push({
      "@type": "ListItem",
      position: position++,
      name: categoryName || "প্রবন্ধ",
      item: `https://siddikiaprokashoni.com/blog?category=${encodeURIComponent(categorySlug || "general")}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: position,
    name: post.title,
    item: url,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };
};

export const generateQnABreadcrumbSchema = (item: TQnA, url: string) => {
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "হোম",
      item: "https://siddikiaprokashoni.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "প্রশ্নোত্তর",
      item: "https://siddikiaprokashoni.com/questions",
    },
  ];

  let position = 3;

  if (item.category) {
    const categoryName = getRefLabel(item.category);
    const categorySlug =
      typeof item.category === "object" ? item.category.slug : "general";
    breadcrumbItems.push({
      "@type": "ListItem",
      position: position++,
      name: categoryName || "প্রশ্ন",
      item: `https://siddikiaprokashoni.com/questions?category=${encodeURIComponent(categorySlug || "general")}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: position,
    name: item.question,
    item: url,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };
};

export const generateBlogPostMetadata = (
  post: TBlogPost | null,
  url: string
): Metadata => {
  if (!post || post.status !== "published") {
    return { title: "Blog post not found" };
  }

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription || post.excerpt || truncateText(post.content);
  const image = getImageFromRef(post.featuredImage);

  return {
    title,
    description,
    keywords: post.seo?.keywords?.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
};

export const generateQnAMetadata = (
  item: TQnA | null,
  url: string
): Metadata => {
  if (!item || item.status !== "published") {
    return { title: "Question not found" };
  }

  const title = item.seo?.metaTitle || item.question;
  const description = item.seo?.metaDescription || truncateText(item.answer);

  return {
    title,
    description,
    keywords: item.seo?.keywords?.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
    },
  };
};
