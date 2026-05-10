import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";
  const pages = [
    "",
    "/shop",
    "/best-selling-products",
    "/about-us",
    "/contact-us",
    "/store-location",
    "/track-your-order",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === "" ? "1.0" : "0.6"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
