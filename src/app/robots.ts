import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://siddikiaprokashoni.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*?*",
          "/api/",
          "/checkout",
          "/thank-you",
          "/auth/",
          "/dashboard/",
          "/orders/",
          "/my-account/",
          "/edit-account/",
          "/_next/static",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
