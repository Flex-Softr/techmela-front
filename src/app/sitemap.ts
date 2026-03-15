import { MetadataRoute } from "next";
import serverSideFetcher from "@/utilities/serverSideFetcher";

type TSitemapProduct = {
  slug: string;
  updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://siddikiaprokashoni.com";

  // Base routes
  const routes = [
    "",
    "/shop",
    "/best-selling-products",
    "/about-us",
    "/contact-us",
    "/delivery-policy",
    "/return-policy",
    "/store-location",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch product slugs for dynamic sitemap
  try {
    const productsResponse = await serverSideFetcher<TSitemapProduct[]>({
      url: "/products?limit=1000&fields=slug,updatedAt",
      tags: ["products"],
    });

    const productRoutes = (productsResponse?.data || []).map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    return routes;
  }
}
