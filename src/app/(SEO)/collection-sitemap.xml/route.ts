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
    const collectionsRes = await serverSideFetcher<
      { slug: string; updatedAt?: string; isActive?: boolean }[]
    >({
      url: "/collections?isActive=true&fields=slug,updatedAt,isActive",
      tags: ["collections"],
    });

    // Handle both { data: [...] } and { data: { data: [...] } }
    const collections =
      (collectionsRes?.data as any)?.data || collectionsRes?.data || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  ${collections
    .filter((col: any) => !!col.slug && col.isActive !== false)
    .map(
      (col: any) => `
  <url>
    <loc>${baseUrl}/shop?collection=${sanitize(col.slug || "")}</loc>
    <lastmod>${new Date(col.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
    console.error("Collections sitemap error:", error);
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
