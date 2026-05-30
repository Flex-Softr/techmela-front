import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://siddikiaprokashoni.com";

  return {
    rules: [
      // ── Search engine crawlers (Google, Bing, Yandex, etc.) ──
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/orders/",
          "/my-account/",
          "/edit-account/",
          "/auth/",
          "/cart",
          "/checkout",
          "/checkout/",
          "/thank-you",
          "/track-your-order",
          "/_next/",
        ],
      },
      // ── AI search & answer engines (allow for product discovery) ──
      {
        userAgent: [
          "GoogleOther",
          "Google-Extended",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: [
          "/product/",
          "/shop",
          "/best-selling-products",
          "/blog",
          "/questions",
        ],
        disallow: [
          "/api/",
          "/dashboard/",
          "/orders/",
          "/my-account/",
          "/edit-account/",
          "/auth/",
          "/cart",
          "/checkout",
          "/checkout/",
          "/thank-you",
          "/track-your-order",
          "/_next/",
        ],
      },
      // ── AI training crawlers (block — protect content from scraping) ──
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "ClaudeBot",
          "anthropic-ai",
          "Bytespider",
          "cohere-ai",
          "FacebookBot",
          "Meta-ExternalAgent",
          "Omgilibot",
          "Diffbot",
          "ImagesiftBot",
          "Ai2Bot",
        ],
        disallow: "/",
      },
      // ── Catch-all for other bots ──
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/orders/",
          "/my-account/",
          "/edit-account/",
          "/auth/",
          "/cart",
          "/checkout",
          "/checkout/",
          "/thank-you",
          "/track-your-order",
          "/_next/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
