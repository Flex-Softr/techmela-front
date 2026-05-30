import {
  ArticleHtml,
  RelatedInlineLink,
  asPlainText,
  tagLabels,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import {
  SITE_URL,
  getRefLabel,
  truncateText,
} from "@/app/(public)/_components/blog-qna/utils";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TQnA } from "@/types/blog-qna";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Eye, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type TProps = {
  params: { slug: string };
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
    return (res.data?.data || []).map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const item = await getQuestion(params.slug).catch(() => null);

  if (!item || item.status !== "published") {
    return { title: "Question not found" };
  }

  const title = item.seo?.metaTitle || item.question;
  const description = item.seo?.metaDescription || truncateText(item.answer);

  return {
    title,
    description,
    keywords: item.seo?.keywords?.join(", "),
    alternates: {
      canonical: `${SITE_URL}/questions/${item.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/questions/${item.slug}`,
    },
  };
}

export default async function QuestionPage({ params }: TProps) {
  const item = await getQuestion(params.slug).catch(() => null);

  if (!item || item.status !== "published") {
    notFound();
  }

  const tags = tagLabels(item.tags);
  const questionJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: item.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: asPlainText(item.answer),
      },
    },
  };

  return (
    <>
      <JsonLd data={questionJsonLd} />
      <article className="bg-[#f7faf7]">
        <section className="border-b bg-white">
          <ContainerMax className="py-6 md:py-10">
            <div className="mx-auto max-w-4xl space-y-5">
              <Link
                href="/questions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <HelpCircle className="h-4 w-4" />
                QnA
              </Link>
              <div className="space-y-3">
                <Badge variant="outline">
                  {getRefLabel(item.category) || "Question"}
                </Badge>
                <h1 className="text-3xl font-bold leading-tight text-primary md:text-5xl">
                  {item.question}
                </h1>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {item.views || 0}
                </span>
              </div>
            </div>
          </ContainerMax>
        </section>

        <ContainerMax className="grid gap-6 py-6 lg:grid-cols-[1fr_280px]">
          <Card className="min-w-0 rounded-lg border bg-white">
            <CardContent className="p-4 md:p-6">
              <ArticleHtml html={item.answer} />
            </CardContent>
          </Card>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            {tags.length ? (
              <Card className="rounded-lg border bg-white">
                <CardContent className="p-4">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {item.relatedBlogs?.length ? (
              <Card className="rounded-lg border bg-white">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    Related posts
                  </h2>
                  {item.relatedBlogs.map((post) => (
                    <RelatedInlineLink
                      key={String(typeof post === "object" ? post._id : post)}
                      href={`/blog/${typeof post === "object" ? post.slug : post}`}
                      title={getRefLabel(post)}
                    />
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {item.relatedQuestions?.length ? (
              <Card className="rounded-lg border bg-white">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    Related questions
                  </h2>
                  {item.relatedQuestions.map((question) => (
                    <RelatedInlineLink
                      key={String(
                        typeof question === "object" ? question._id : question
                      )}
                      href={`/questions/${typeof question === "object" ? question.slug : question}`}
                      title={getRefLabel(question)}
                    />
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </aside>
        </ContainerMax>
      </article>
    </>
  );
}
