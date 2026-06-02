import {
  ArticleHtml,
  RelatedInlineLink,
  asPlainText,
  tagLabels,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import {
  SITE_URL,
  formatDate,
  getImageFromRef,
  getRefLabel,
  truncateText,
} from "@/app/(public)/_components/blog-qna/utils";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TBlogPost } from "@/types/blog-qna";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { BookOpen, CalendarDays, Clock, Eye } from "lucide-react";
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

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription || post.excerpt || truncateText(post.content);
  const image = getImageFromRef(post.featuredImage);

  return {
    title,
    description,
    keywords: post.seo?.keywords?.join(", "),
    alternates: {
      canonical: `${SITE_URL}/blog/${params.categorySlug}/${params.topicSlug}/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${params.categorySlug}/${params.topicSlug}/${post.slug}`,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: TProps) {
  const post = await getPost(params.slug).catch(() => null);

  if (!post || post.status !== "published") {
    notFound();
  }

  const image = getImageFromRef(post.featuredImage);
  const tags = tagLabels(post.tags);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description:
      post.seo?.metaDescription || post.excerpt || truncateText(post.content),
    image,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: getRefLabel(post.author) || "Siddikiya Prokashoni",
    },
    publisher: {
      "@type": "Organization",
      name: "Siddikiya Prokashoni",
    },
    mainEntityOfPage: `${SITE_URL}/blog/${params.categorySlug}/${params.topicSlug}/${post.slug}`,
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: asPlainText(faq.answer),
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <article className="bg-[#f7faf7]">
        <section className="border-b bg-white">
          <ContainerMax className="py-6 md:py-10">
            <div className="mx-auto max-w-4xl space-y-5">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <BookOpen className="h-4 w-4" />
                ব্লগ
              </Link>
              <div className="space-y-3">
                <Badge variant="outline">
                  {getRefLabel(post.category) || "প্রবন্ধ"}
                </Badge>
                <h1 className="text-3xl font-bold leading-tight text-primary md:text-5xl">
                  {post.title}
                </h1>
                <p className="text-base leading-7 text-muted-foreground md:text-lg">
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
                    {post.readTime} মিনিট
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {post.views || 0}
                </span>
              </div>
            </div>
          </ContainerMax>
        </section>

        <ContainerMax className="grid gap-6 py-6 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-white">
              <Image
                src={image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
            <Card className="rounded-lg border bg-white">
              <CardContent className="p-4 md:p-6">
                <ArticleHtml html={post.content} />
              </CardContent>
            </Card>

            {post.faqs?.length ? (
              <Card className="rounded-lg border bg-white">
                <CardContent className="space-y-4 p-4 md:p-6">
                  <h2 className="text-2xl font-bold text-primary">
                    সাধারণ জিজ্ঞাসা
                  </h2>
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
              <Card className="rounded-lg border bg-white">
                <CardContent className="p-4">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
                    ট্যাগ
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

            {post.relatedBlogs?.length ? (
              <Card className="rounded-lg border bg-white">
                <CardContent className="space-y-2 p-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
                    সম্পর্কিত প্রবন্ধ
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
