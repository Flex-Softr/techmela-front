import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/orders/",
        "/_next/",
        "/public/",
        "/cart",
        "/checkout",
        "/my-account",
        "/search",
        "/search-book",
        "/*?sort=",
        "/*?filter=",
        "/*?page=",
        "/*?colorSelected=",
        "/*?sizeSelected=",
        "/*&sort=",
        "/*&filter=",
      ],
    },
    sitemap: "https://siddikiaprokashoni.com/sitemap.xml",
  };
}
