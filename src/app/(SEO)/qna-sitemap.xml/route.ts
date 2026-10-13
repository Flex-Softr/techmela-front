import { SITE } from "@/const/site.const";
import { TQnA } from "@/types/blog-qna";
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
  const baseUrl = SITE.baseUrl;
  const qnaRes = await serverSideFetcher<TPaginatedData<TQnA[]>>({
    url: "/qna",
    tags: ["qna"],
    params: {
      limit: 2000,
      status: "published",
      fields: "slug,updatedAt,topic",
    },
  }).catch(() => null);

  const questions = qnaRes?.data?.data || [];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${questions
  .map((item) => {
    const topicSlug =
      typeof item.topic === "object" ? item.topic.slug : "general";
    return `  <url>
    <loc>${baseUrl}/questions/${topicSlug}/${sanitize(item.slug || "")}</loc>
    <lastmod>${new Date(item.updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
