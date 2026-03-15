import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/orders/", "/track-your-order/"],
    },
    sitemap: "https://siddikiaprokashoni.com/sitemap.xml",
  };
}
