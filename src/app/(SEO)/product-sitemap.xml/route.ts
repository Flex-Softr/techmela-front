/* eslint-disable @typescript-eslint/no-explicit-any */
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://shajghor.com";
  const sanitize = (val: string) =>
    val
      ? val
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;")
      : "";

  try {
    const productsRes = await serverSideFetcher<any>({
      url: "/products?limit=2000&fields=slug,updatedAt",
      tags: ["products"],
    });

    // Handle both { data: [...] } and { data: { data: [...] } }
    const products = productsRes?.data?.data || productsRes?.data || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  ${products
    .filter(
      (product: any) =>
        !!product.slug && product.slug.length > 2 && product.isActive !== false
    )
    .map(
      (product: any) => `
  <url>
    <loc>${baseUrl}/product/${sanitize(product.slug || "")}</loc>
    <lastmod>${new Date(product.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Products sitemap error:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      }
    );
  }
}
