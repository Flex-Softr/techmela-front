import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/pages-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/products-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/categories-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
