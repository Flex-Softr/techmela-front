import {
  BlogQnaListShell,
  EmptyState,
  Pagination,
  QuestionCard,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import JsonLd from "@/components/shared/JsonLd";
import { TBlogQACategory, TBlogQATag, TQnA } from "@/types/blog-qna";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";

type TSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "প্রশ্ন ও উত্তর",
  description:
    "সিদ্ধিকিয়া প্রকাশনীর প্রশ্ন ও উত্তর বিভাগে স্বাগতম! এখানে আপনি ইসলামিক জ্ঞানভিত্তিক প্রশ্নের স্পষ্ট এবং সংক্ষিপ্ত উত্তর পাবেন, যা বিভিন্ন বিষয় এবং টপিক অনুযায়ী সংগঠিত। আমাদের প্রশ্ন ও উত্তর বিভাগটি চিন্তাশীল পাঠকদের জন্য একটি মূল্যবান সম্পদ, যেখানে তারা সাধারণ প্রশ্নগুলির উত্তর খুঁজে পেতে পারেন। নতুন প্রশ্ন এবং আপডেটের জন্য আমাদের এই বিভাগটি নিয়মিত চেক করুন।",
  alternates: {
    canonical: `${SITE_URL}/questions`,
  },
};

async function getQnA(searchParams: TSearchParams) {
  const page = Number(searchParams.page || 1);
  return serverSideFetcher<TQnA[]>({
    url: "/qna",
    tags: ["qna"],

    params: {
      page,
      limit: 12,
      status: "published",
      search: searchParams.search,
      category: searchParams.category,
      tags: searchParams.tag,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  });
}

async function getFilters() {
  const [categoriesRes, tagsRes] = await Promise.all([
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
  ]);

  return {
    categories: categoriesRes?.data || [],
    tags: tagsRes?.data || [],
  };
}

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const [qnaRes, filters] = await Promise.all([
    getQnA(searchParams),
    getFilters(),
  ]);
  const qnaList = qnaRes?.data || [];
  const meta = qnaRes?.meta;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "QnA",
    url: `${SITE_URL}/questions`,
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <BlogQnaListShell
        type="questions"
        title="প্রশ্ন ও উত্তর"
        description="সিদ্ধিকিয়া প্রকাশনীর প্রশ্ন ও উত্তর বিভাগে স্বাগতম! এখানে আপনি ইসলামিক জ্ঞানভিত্তিক প্রশ্নের স্পষ্ট এবং সংক্ষিপ্ত উত্তর পাবেন, যা বিভিন্ন বিষয় এবং টপিক অনুযায়ী সংগঠিত। আমাদের প্রশ্ন ও উত্তর বিভাগটি চিন্তাশীল পাঠকদের জন্য একটি মূল্যবান সম্পদ, যেখানে তারা সাধারণ প্রশ্নগুলির উত্তর খুঁজে পেতে পারেন। নতুন প্রশ্ন এবং আপডেটের জন্য আমাদের এই বিভাগটি নিয়মিত চেক করুন।"
        categories={filters.categories}
        tags={filters.tags}
        searchParams={searchParams}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {qnaList.length ? (
            qnaList.map((item) => <QuestionCard key={item._id} item={item} />)
          ) : (
            <div className="md:col-span-2">
              <EmptyState label="কোনো প্রশ্ন পাওয়া যায়নি।" />
            </div>
          )}
        </div>
        <Pagination
          meta={meta}
          basePath="/questions"
          searchParams={searchParams}
        />
      </BlogQnaListShell>
    </>
  );
}
