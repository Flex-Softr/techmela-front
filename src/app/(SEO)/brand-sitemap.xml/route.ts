/* eslint-disable @typescript-eslint/no-explicit-any */
import { SITE } from "@/const/site.const";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = SITE.baseUrl;
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
    const brandsRes = await serverSideFetcher<
      { slug: string; updatedAt?: string }[]
    >({
      url: "/brands?fields=slug,updatedAt",
      tags: ["brands"],
    });

    // Handle both { data: [...] } and { data: { data: [...] } }
    const brands = (brandsRes?.data as any)?.data || brandsRes?.data || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">
  ${brands
    .filter((brand: any) => !!brand.slug)
    .map(
      (brand: any) => `
  <url>
    <loc>${baseUrl}/shop?brand=${sanitize(brand.slug || "")}</loc>
    <lastmod>${new Date(brand.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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
    console.error("Brands sitemap error:", error);
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
