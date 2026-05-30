import { TBlogPost } from "@/types/blog-qna";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { NextResponse } from "next/server";

const sanitize = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const baseUrl = "https://siddikiaprokashoni.com";
  const postsRes = await serverSideFetcher<TPaginatedData<TBlogPost[]>>({
    url: "/blog-posts",
    tags: ["blogPosts"],
    params: { limit: 2000, status: "published", fields: "slug,updatedAt" },
  }).catch(() => null);

  const posts = postsRes?.data?.data || [];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${sanitize(post.slug || "")}</loc>
    <lastmod>${new Date(post.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
