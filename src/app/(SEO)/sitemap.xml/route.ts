import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/product-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/blog-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/qna-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/category-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/brand-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/collection-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
