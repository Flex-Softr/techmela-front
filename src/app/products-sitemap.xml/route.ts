/* eslint-disable @typescript-eslint/no-explicit-any */
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";

  try {
    const productsRes = await serverSideFetcher<any>({
      url: "/products?limit=1000&fields=slug,updatedAt",
      tags: ["products"],
    });

    // Handle both { data: [...] } and { data: { data: [...] } }
    const products = productsRes?.data?.data || productsRes?.data || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${products
    .map(
      (product: any) => `
  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${new Date(product.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Products sitemap error:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml" } }
    );
  }
}
