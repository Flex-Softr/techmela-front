import {
  BlogCard,
  BlogQnaListShell,
  EmptyState,
  Pagination,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import JsonLd from "@/components/shared/JsonLd";
import {
  TBlogPost,
  TBlogQACategory,
  TBlogQATag,
  TBlogQATopic,
} from "@/types/blog-qna";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { blogMetadata, blogJsonLd } from "./metadata";
import { Metadata } from "next";

type TSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = blogMetadata;

async function getBlogPosts(searchParams: TSearchParams) {
  const page = Number(searchParams.page || 1);
  return serverSideFetcher<TBlogPost[]>({
    url: "/blog-posts",
    tags: ["blogPosts"],
    params: {
      page,
      limit: 9,
      status: "published",
      search: searchParams.search,
      category: searchParams.category,
      topic: searchParams.topic,
      tags: searchParams.tag,
      sortBy: "publishedAt",
      sortOrder: "desc",
    },
  });
}

async function getFilters() {
  const [categoriesRes, tagsRes, topicsRes] = await Promise.all([
    serverSideFetcher<TBlogQACategory[]>({
      url: "/blog-qa-categories",
      tags: ["blogQaCategories"],
      params: { limit: 1000, status: "active" },
    }),
    serverSideFetcher<TBlogQATag[]>({
      url: "/blog-qa-tags",
      tags: ["blogQaTags"],
      params: { limit: 1000, status: "active" },
    }),
    serverSideFetcher<TBlogQATopic[]>({
      url: "/blog-qa-topics",
      tags: ["blogQaTopics"],
      params: { limit: 1000, status: "active" },
    }),
  ]);

  return {
    categories: categoriesRes?.data || [],
    tags: tagsRes?.data || [],
    topics: topicsRes?.data || [],
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const [postsRes, filters] = await Promise.all([
    getBlogPosts(searchParams),
    getFilters(),
  ]);

  const posts = postsRes?.data || [];
  const meta = postsRes?.meta;

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <BlogQnaListShell
        title="ব্লগ"
        description="TechMela ব্লগে আপনাকে স্বাগতম! সেরা টেক গ্যাজেট, ইলেকট্রনিক্স পণ্য, গ্যাজেট রিভিউ ও প্রয়োজনীয় টেক টিপস সম্পর্কে জানুন।"
        type="blog"
        categories={filters.categories}
        topics={filters.topics}
        tags={filters.tags}
        searchParams={searchParams}
      >
        <div className="grid gap-4">
          {posts.length ? (
            posts.map((post) => <BlogCard key={post._id} post={post} />)
          ) : (
            <EmptyState label="কোনো ব্লগ পোস্ট পাওয়া যায়নি।" />
          )}
        </div>
        <Pagination meta={meta} basePath="/blog" searchParams={searchParams} />
      </BlogQnaListShell>
    </>
  );
}
