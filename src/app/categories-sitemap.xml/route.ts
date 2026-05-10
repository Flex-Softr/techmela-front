/* eslint-disable @typescript-eslint/no-explicit-any */
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";

  try {
    const categoriesPromise = serverSideFetcher<{ slug: string }[]>({
      url: "/categories?fields=slug",
      tags: ["categories"],
    });

    const brandsPromise = serverSideFetcher<{ slug: string }[]>({
      url: "/brands?fields=slug",
      tags: ["brands"],
    });

    const [categoriesRes, brandsRes] = await Promise.all([
      categoriesPromise,
      brandsPromise,
    ]);

    // Handle both { data: [...] } and { data: { data: [...] } }
    const categories =
      (categoriesRes?.data as any)?.data || categoriesRes?.data || [];
    const brands = (brandsRes?.data as any)?.data || brandsRes?.data || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories
    .map(
      (cat: any) => `
  <url>
    <loc>${baseUrl}/shop?category=${cat.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
  ${brands
    .map(
      (brand: any) => `
  <url>
    <loc>${baseUrl}/shop?brand=${brand.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
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
    console.error("Categories sitemap error:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml" } }
    );
  }
}
