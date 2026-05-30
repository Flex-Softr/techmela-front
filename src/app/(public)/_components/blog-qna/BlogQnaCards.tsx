import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TBlogPost, TBlogQACategory, TBlogQATag, TQnA } from "@/types/blog-qna";
import { TMeta } from "@/types/response";
import { ArrowRight, BookOpen, Eye, HelpCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import {
  formatDate,
  getImageFromRef,
  getRefLabel,
  getRefSlug,
  stripHtml,
  truncateText,
} from "./utils";

type TListShellProps = {
  title: string;
  description: string;
  type: "blog" | "questions";
  categories: TBlogQACategory[];
  tags: TBlogQATag[];
  searchParams: Record<string, string | string[] | undefined>;
  children: ReactNode;
};

export function BlogQnaListShell({
  title,
  description,
  type,
  categories,
  tags,
  searchParams,
  children,
}: TListShellProps) {
  const selectedCategory = String(searchParams.category || "");
  const selectedTag = String(searchParams.tag || "");
  const search = String(searchParams.search || "");
  const baseHref = type === "blog" ? "/blog" : "/questions";

  return (
    <div className="bg-[#f7faf7]">
      <section className="border-b bg-white">
        <ContainerMax className="py-4 md:py-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {type === "blog" ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <HelpCircle className="h-4 w-4" />
              )}
              {type === "blog" ? "Articles" : "QnA"}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              {title}
            </h1>
            <p className="text-base leading-7 text-muted-foreground md:text-lg">
              {description}
            </p>
          </div>
        </ContainerMax>
      </section>

      <ContainerMax className="grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <form
            action={baseHref}
            className="rounded-lg border bg-white p-3 shadow-sm"
          >
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search"
                className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </label>
            {selectedCategory && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            {selectedTag && (
              <input type="hidden" name="tag" value={selectedTag} />
            )}
          </form>

          <FilterBlock title="Categories">
            <FilterLink
              href={baseHref}
              active={!selectedCategory && !selectedTag}
            >
              All
            </FilterLink>
            {categories.map((category) => (
              <FilterLink
                key={category._id}
                href={`${baseHref}?category=${encodeURIComponent(category._id)}`}
                active={selectedCategory === category._id}
              >
                {category.name}
              </FilterLink>
            ))}
          </FilterBlock>

          <FilterBlock title="Tags">
            {tags.map((tag) => (
              <FilterLink
                key={tag._id}
                href={`${baseHref}?tag=${encodeURIComponent(tag._id)}`}
                active={selectedTag === tag._id}
              >
                {tag.name}
              </FilterLink>
            ))}
          </FilterBlock>
        </aside>

        <div className="min-w-0">{children}</div>
      </ContainerMax>
    </div>
  );
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2 lg:flex-col">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-primary/5 text-primary hover:bg-primary/10"
      }`}
    >
      {children}
    </Link>
  );
}

export function BlogCard({ post }: { post: TBlogPost }) {
  return (
    <Card className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/blog/${post.slug}`}
        className="grid h-full md:grid-cols-[220px_1fr]"
      >
        <div className="relative aspect-[16/10] bg-muted md:aspect-auto">
          <Image
            src={getImageFromRef(post.featuredImage)}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 220px"
          />
        </div>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">
              {getRefLabel(post.category) || "Article"}
            </Badge>
            {post.readTime ? <span>{post.readTime} min read</span> : null}
            {post.publishedAt ? (
              <span>{formatDate(post.publishedAt)}</span>
            ) : null}
          </div>
          <h2 className="line-clamp-2 text-xl font-bold text-primary">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {post.excerpt || truncateText(post.content, 180)}
          </p>
          <div className="mt-auto flex items-center justify-between text-sm font-semibold text-primary">
            <span>Read article</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function QuestionCard({ item }: { item: TQnA }) {
  return (
    <Card className="rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/questions/${item.slug}`}>
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">
              {getRefLabel(item.category) || "QnA"}
            </Badge>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {item.views || 0}
            </span>
          </div>
          <h2 className="text-lg font-bold leading-7 text-primary">
            {item.question}
          </h2>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {truncateText(item.answer, 180)}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <span>Read answer</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border bg-white p-10 text-center text-muted-foreground">
      {label}
    </div>
  );
}

export function Pagination({
  meta,
  basePath,
  searchParams,
}: {
  meta?: TMeta;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!meta || meta.totalPage <= 1) return null;

  const page = Number(searchParams.page || meta.page || 1);
  const makeHref = (nextPage: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (!value || key === "page") return;
      params.set(key, Array.isArray(value) ? value[0] : value);
    });
    params.set("page", String(nextPage));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mt-6 flex items-center justify-end gap-2">
      {page > 1 && (
        <Link
          className="rounded-md border bg-white px-3 py-2 text-sm font-semibold text-primary"
          href={makeHref(page - 1)}
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-muted-foreground">
        Page {page} of {meta.totalPage}
      </span>
      {page < meta.totalPage && (
        <Link
          className="rounded-md border bg-white px-3 py-2 text-sm font-semibold text-primary"
          href={makeHref(page + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export function ArticleHtml({ html }: { html: string }) {
  return (
    <div
      className="prose prose-green max-w-none prose-headings:text-primary prose-a:text-primary prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function RelatedInlineLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-md border bg-white p-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
    >
      {title}
    </Link>
  );
}

export function asPlainText(value: string) {
  return stripHtml(value);
}

export function tagLabels(values?: unknown[]) {
  return values?.map(getRefLabel).filter(Boolean) || [];
}

export function categorySlug(value: unknown) {
  return getRefSlug(value);
}
