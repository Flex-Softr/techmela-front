import { SITE } from "@/const/site.const";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.baseUrl;

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
