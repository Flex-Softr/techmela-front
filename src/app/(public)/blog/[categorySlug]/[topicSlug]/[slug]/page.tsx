import {
  ArticleHtml,
  RelatedInlineLink,
  tagLabels,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import {
  SITE_URL,
  formatDate,
  getImageFromRef,
  getRefLabel,
  truncateText,
} from "@/app/(public)/_components/blog-qna/utils";
import BackButton from "@/app/(public)/_components/blog-qna/BackButton";
import ViewCount from "@/app/(public)/_components/blog-qna/ViewCount";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import {
  generateArticleSchema,
  generateBlogBreadcrumbSchema,
  generateBlogPostMetadata,
  generateFAQSchema,
} from "@/utilities/schema.util";
import { Card, CardContent } from "@/components/ui/card";
import { TBlogPost } from "@/types/blog-qna";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type TLinkedRef = {
  _id: string;
  slug?: string;
  category?: string | { slug?: string };
  topic?: string | { slug?: string };
};

type TProps = {
  params: { categorySlug: string; topicSlug: string; slug: string };
};

async function getPost(slug: string) {
  const res = await serverSideFetcher<TBlogPost>({
    url: `/blog-posts/slug/${decodeURIComponent(slug)}`,
    tags: [`blogPost-${decodeURIComponent(slug)}`],
  });
  return res.data;
}

export async function generateStaticParams() {
  try {
    const res = await serverSideFetcher<TPaginatedData<TBlogPost[]>>({
      url: "/blog-posts",
      tags: ["blogPosts"],
      params: { limit: 1000, status: "published" },
    });
    return (res.data?.data || []).map((post) => ({
      categorySlug:
        typeof post.category === "object"
          ? post.category.slug || "general"
          : "general",
      topicSlug:
        typeof post.topic === "object"
          ? post.topic.slug || "general"
          : "general",
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);

  if (!post || post.status !== "published") {
    return { title: "Blog post not found" };
  }

  const url = `${SITE_URL}/blog/${params.categorySlug}/${params.topicSlug}/${post.slug}`;
  return generateBlogPostMetadata(post, url) as Metadata;
}

export default async function BlogPostPage({ params }: TProps) {
  const post = await getPost(params.slug).catch(() => null);

  if (!post || post.status !== "published") {
    notFound();
  }

  const image = getImageFromRef(post.featuredImage);
  const tags = tagLabels(post.tags);
  const categorySlug =
    post.category && typeof post.category === "object"
      ? post.category.slug
      : undefined;
  const categoryHref = categorySlug
    ? `/blog?category=${encodeURIComponent(categorySlug)}`
    : "/blog";

  const topicSlug =
    post.topic && typeof post.topic === "object" ? post.topic.slug : undefined;
  const topicHref =
    categorySlug && topicSlug
      ? `/blog?category=${encodeURIComponent(categorySlug)}&topic=${encodeURIComponent(topicSlug)}`
      : "/blog";

  const url = `${SITE_URL}/blog/${params.categorySlug}/${params.topicSlug}/${post.slug}`;
  const articleJsonLd = generateArticleSchema(post, url);
  const faqJsonLd = generateFAQSchema(post.faqs);
  const breadcrumbJsonLd = generateBlogBreadcrumbSchema(post, url);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <JsonLd data={breadcrumbJsonLd} />
      <article className="bg-muted">
        <section className="border-b bg-background">
          <ContainerMax className="py-4 md:py-6">
            <div className="mx-auto max-w-4xl space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
                  >
                    <BookOpen className="h-4 w-4" />
                    Blog
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                  <Link
                    href={categoryHref}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {getRefLabel(post.category) || "Article"}
                  </Link>
                  {post.topic ? (
                    <>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                      <Link
                        href={topicHref}
                        className="hover:text-primary transition-colors font-medium"
                      >
                        {getRefLabel(post.topic)}
                      </Link>
                    </>
                  ) : null}
                </div>
                <BackButton className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-primary/5 font-semibold text-primary transition-colors hover:bg-primary/10 border border-primary/10">
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </BackButton>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                  {post.title}
                </h1>
                <p className="text-sm leading-6 text-muted-foreground md:text-base">
                  {post.excerpt || truncateText(post.content, 220)}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {post.publishedAt ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                ) : null}
                {post.readTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min
                  </span>
                ) : null}
                <ViewCount
                  id={post._id}
                  initialViews={post.views || 0}
                  resource="blog-posts"
                />
              </div>
            </div>
          </ContainerMax>
        </section>

        <ContainerMax className="grid gap-5 py-4 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-background">
              <Image
                src={image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
            <Card className="rounded-lg border bg-background">
              <CardContent className="p-4 md:p-6">
                <ArticleHtml html={post.content} />
              </CardContent>
            </Card>

            {post.faqs?.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="space-y-4 p-4 md:p-6">
                  <h2 className="text-2xl font-bold text-primary">FAQ</h2>
                  {post.faqs.map((faq, index) => (
                    <div
                      key={`${faq.question}-${index}`}
                      className="rounded-md border p-4"
                    >
                      <h3 className="font-bold text-primary">{faq.question}</h3>
                      <div className="mt-2 text-sm leading-6 text-muted-foreground">
                        <ArticleHtml html={faq.answer} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            {tags.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="p-4">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {(post.tags || []).map((tag) => {
                      const name =
                        (typeof tag === "object" ? tag.name : tag) || "";
                      const slug =
                        (typeof tag === "object" ? tag.slug : tag) || "";
                      if (!slug) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/blog?tag=${encodeURIComponent(slug)}`}
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

            {post.relatedBlogs?.length ? (
              <Card className="rounded-lg border bg-background">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    Related articles
                  </h2>
                  {post.relatedBlogs.map((related) => {
                    const linkedPost = related as string | TLinkedRef;
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
                        title={getRefLabel(related)}
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
