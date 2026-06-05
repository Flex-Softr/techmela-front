import {
  BlogCard,
  BlogQnaListShell,
  EmptyState,
  Pagination,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import JsonLd from "@/components/shared/JsonLd";
import {
  TBlogPost,
  TBlogQACategory,
  TBlogQATag,
  TBlogQATopic,
} from "@/types/blog-qna";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";

type TSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "ব্লগ",
  description:
    "সিদ্ধিকিয়া প্রকাশনীর ব্লগে স্বাগতম! এখানে আপনি ইসলামিক বই, জ্ঞানভিত্তিক নিবন্ধ, পাঠ নির্দেশিকা এবং চিন্তাশীল পাঠকদের জন্য বিভিন্ন বিষয়ের উপর তথ্যপূর্ণ আর্টিকেল পাবেন। আমাদের ব্লগে ইসলামিক জ্ঞান ও সাহিত্য সম্পর্কে গভীর অন্তর্দৃষ্টি এবং প্রাসঙ্গিক তথ্য শেয়ার করা হয়। নতুন আর্টিকেল এবং আপডেটের জন্য আমাদের ব্লগটি নিয়মিত চেক করুন।",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

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

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    url: `${SITE_URL}/blog`,
    about: "Islamic books and knowledge articles",
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <BlogQnaListShell
        title="ব্লগ"
        description="সিদ্ধিকিয়া প্রকাশনীর ব্লগে স্বাগতম্! এখানে আপনি ইসলামিক বই, জ্ঞানভিত্তিক নিবন্ধ, পাঠ নির্দেশিকা এবং চিন্তাশীল পাঠকদের জন্য বিভিন্ন বিষয়ের উপর তথ্যপূর্ণ আর্টিকেল পাবেন। আমাদের ব্লগে ইসলামিক জ্ঞান ও সাহিত্য সম্পর্কে গভীর অন্তর্দৃষ্টি এবং প্রাসঙ্গিক তথ্য শেয়ার করা হয়। নতুন আর্টিকেল এবং আপডেটের জন্য আমাদের ব্লগটি নিয়মিত চেক করুন।"
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
