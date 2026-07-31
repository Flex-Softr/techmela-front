import {
  ArticleHtml,
  RelatedInlineLink,
  tagLabels,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import {
  SITE_URL,
  formatDate,
  getRefLabel,
} from "@/app/(public)/_components/blog-qna/utils";
import BackButton from "@/app/(public)/_components/blog-qna/BackButton";
import ViewCount from "@/app/(public)/_components/blog-qna/ViewCount";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import {
  generateQnABreadcrumbSchema,
  generateQnAMetadata,
  generateQnASchema,
} from "@/utilities/schema.util";
import { Card, CardContent } from "@/components/ui/card";
import { TQnA } from "@/types/blog-qna";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type TLinkedRef = {
  _id: string;
  slug?: string;
  category?: string | { slug?: string };
  topic?: string | { slug?: string };
};

type TProps = {
  params: { topicSlug: string; slug: string };
};

async function getQuestion(slug: string) {
  const res = await serverSideFetcher<TQnA>({
    url: `/qna/slug/${decodeURIComponent(slug)}`,
    tags: [`qna-${decodeURIComponent(slug)}`],
  });
  return res.data;
}

export async function generateStaticParams() {
  try {
    const res = await serverSideFetcher<TPaginatedData<TQnA[]>>({
      url: "/qna",
      tags: ["qna"],
      params: { limit: 1000, status: "published" },
    });
    return (res.data?.data || []).map((item) => ({
      topicSlug:
        typeof item.topic === "object"
          ? item.topic.slug || "general"
          : "general",
      slug: item.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const item = await getQuestion(params.slug).catch(() => null);

  if (!item || item.status !== "published") {
    return { title: "Question not found" };
  }

  const url = `${SITE_URL}/questions/${params.topicSlug}/${item.slug}`;
  return generateQnAMetadata(item, url) as Metadata;
}

export default async function QuestionPage({ params }: TProps) {
  const item = await getQuestion(params.slug).catch(() => null);

  if (!item || item.status !== "published") {
    notFound();
  }

  const tags = tagLabels(item.tags);
  const categorySlug =
    item.category && typeof item.category === "object"
      ? item.category.slug
      : undefined;
  const categoryHref = categorySlug
    ? `/questions?category=${encodeURIComponent(categorySlug)}`
    : "/questions";

  const topicSlug =
    item.topic && typeof item.topic === "object" ? item.topic.slug : undefined;
  const topicHref =
    categorySlug && topicSlug
      ? `/questions?category=${encodeURIComponent(categorySlug)}&topic=${encodeURIComponent(topicSlug)}`
      : "/questions";

  const url = `${SITE_URL}/questions/${params.topicSlug}/${item.slug}`;
  const questionJsonLd = generateQnASchema(item);
  const breadcrumbJsonLd = generateQnABreadcrumbSchema(item, url);

  return (
    <>
      <JsonLd data={questionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="bg-muted">
        <section className="border-b bg-background">
          <ContainerMax className="py-4 md:py-6">
            <div className="mx-auto max-w-4xl space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Link
                    href="/questions"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
                  >
                    <HelpCircle className="h-4 w-4" />
                    প্রশ্নোত্তর
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <Link
                    href={categoryHref}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {getRefLabel(item.category) || "প্রশ্ন"}
                  </Link>
                  {item.topic ? (
                    <>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                      <Link
                        href={topicHref}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {getRefLabel(item.topic)}
                      </Link>
                    </>
                  ) : null}
                </div>
                <BackButton className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-primary/5 font-semibold text-primary transition-colors hover:bg-primary/10 border border-primary/10">
                  <ArrowLeft className="h-4 w-4" />
                  ফিরে যান
                </BackButton>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                  {item.question}
                </h1>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {item.createdAt ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(item.createdAt)}
                  </span>
                ) : null}
                <ViewCount
                  id={item._id}
                  initialViews={item.views || 0}
                  resource="qna"
                />
              </div>
            </div>
          </ContainerMax>
        </section>

        <ContainerMax className="grid gap-6 py-6 lg:grid-cols-[1fr_280px]">
          <Card className="min-w-0 rounded-lg border bg-background">
            <CardContent className="p-4 md:p-6">
              <ArticleHtml html={item.answer} />
            </CardContent>
          </Card>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            {tags.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="p-4">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
                    ট্যাগ
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {(item.tags || []).map((tag) => {
                      const name =
                        (typeof tag === "object" ? tag.name : tag) || "";
                      const slug =
                        (typeof tag === "object" ? tag.slug : tag) || "";
                      if (!slug) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/questions?tag=${encodeURIComponent(slug)}`}
                          className="rounded-md bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {item.relatedBlogs?.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    সম্পর্কিত প্রবন্ধ
                  </h2>
                  {item.relatedBlogs.map((post) => {
                    const linkedPost = post as string | TLinkedRef;
                    const relCategorySlug =
                      typeof linkedPost === "object" &&
                      linkedPost.category &&
                      typeof linkedPost.category === "object"
                        ? linkedPost.category.slug || "general"
                        : "general";
                    const relTopicSlug =
                      typeof linkedPost === "object" &&
                      linkedPost.topic &&
                      typeof linkedPost.topic === "object"
                        ? linkedPost.topic.slug || "general"
                        : "general";
                    return (
                      <RelatedInlineLink
                        key={String(
                          typeof linkedPost === "object"
                            ? linkedPost._id
                            : linkedPost
                        )}
                        href={`/blog/${relCategorySlug}/${relTopicSlug}/${
                          typeof linkedPost === "object"
                            ? linkedPost.slug
                            : linkedPost
                        }`}
                        title={getRefLabel(post)}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            ) : null}

            {item.relatedQuestions?.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    সম্পর্কিত প্রশ্ন
                  </h2>
                  {item.relatedQuestions.map((question) => {
                    const linkedQuestion = question as string | TLinkedRef;
                    const relTopicSlug =
                      typeof linkedQuestion === "object" &&
                      linkedQuestion.topic &&
                      typeof linkedQuestion.topic === "object"
                        ? linkedQuestion.topic.slug || "general"
                        : "general";
                    return (
                      <RelatedInlineLink
                        key={String(
                          typeof linkedQuestion === "object"
                            ? linkedQuestion._id
                            : linkedQuestion
                        )}
                        href={`/questions/${relTopicSlug}/${
                          typeof linkedQuestion === "object"
                            ? linkedQuestion.slug
                            : linkedQuestion
                        }`}
                        title={getRefLabel(question)}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            ) : null}
          </aside>
        </ContainerMax>
      </article>
    </>
  );
}
