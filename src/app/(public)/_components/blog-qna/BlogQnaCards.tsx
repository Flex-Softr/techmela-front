import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TBlogPost,
  TBlogQACategory,
  TBlogQATag,
  TBlogQATopic,
  TQnA,
} from "@/types/blog-qna";
import { TMeta } from "@/types/response";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  HelpCircle,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import CollapsibleCategory from "./CollapsibleCategory";
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
  topics?: TBlogQATopic[];
  tags: TBlogQATag[];
  searchParams: Record<string, string | string[] | undefined>;
  children: ReactNode;
};

export function BlogQnaListShell({
  title,
  description,
  type,
  categories,
  topics = [],
  tags,
  searchParams,
  children,
}: TListShellProps) {
  const selectedCategory = String(searchParams.category || "");
  const selectedTag = String(searchParams.tag || "");
  const search = String(searchParams.search || "");
  const baseHref = type === "blog" ? "/blog" : "/questions";

  return (
    <div className="bg-muted">
      <section className="border-b bg-background">
        <ContainerMax className="py-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary shrink-0">
            {type === "blog" ? (
              <BookOpen className="size-6" />
            ) : (
              <HelpCircle className="size-6" />
            )}
            <h1 className="text-xl font-bold tracking-tight text-primary md:text-2xl">
              {title}
            </h1>
          </div>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </ContainerMax>
      </section>

      <ContainerMax className="grid gap-5 py-4 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start">
          <form
            action={baseHref}
            className="rounded-lg border bg-background p-3 shadow-sm"
          >
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search..."
                className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </label>
            {selectedCategory && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}
            {selectedTag && (
              <input type="hidden" name="tag" value={selectedTag} />
            )}
          </form>

          <FilterBlock title="Category">
            <FilterLink
              href={baseHref}
              active={!selectedCategory && !selectedTag}
            >
              All
            </FilterLink>
            {categories.map((category) => {
              const categoryTopics = topics.filter((t) =>
                typeof t.category === "object"
                  ? t.category._id === category._id
                  : t.category === category._id
              );
              return (
                <CollapsibleCategory
                  key={category._id}
                  category={category}
                  topics={categoryTopics}
                  baseHref={baseHref}
                  selectedCategory={selectedCategory}
                  selectedTopic={String(searchParams.topic || "")}
                />
              );
            })}
          </FilterBlock>

          <FilterBlock title="Tags">
            {tags.map((tag) => (
              <FilterLink
                key={tag._id}
                href={`${baseHref}?tag=${encodeURIComponent(tag.slug)}`}
                active={selectedTag === tag.slug}
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
    <div className="rounded-lg border bg-background p-3 shadow-sm">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
        {title}
      </h2>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  small,
  children,
}: {
  href: string;
  active: boolean;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-md font-medium transition-colors ${
        small ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
      } ${
        active
          ? "bg-primary/15 text-primary font-semibold"
          : "bg-primary/5 text-primary hover:bg-primary/10"
      }`}
    >
      {children}
    </Link>
  );
}

export function BlogCard({ post }: { post: TBlogPost }) {
  return (
    <Card className="overflow-hidden rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/blog/${
          typeof post.category === "object" ? post.category.slug : "general"
        }/${
          typeof post.topic === "object" ? post.topic.slug : "general"
        }/${post.slug}`}
        className="grid h-full md:grid-cols-[180px_1fr]"
      >
        <div className="relative aspect-[16/10] bg-muted md:aspect-auto">
          <Image
            src={getImageFromRef(post.featuredImage)}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 180px"
          />
        </div>
        <CardContent className="flex flex-col gap-2 p-3 md:p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-primary">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
            {post.excerpt || truncateText(post.content, 180)}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">
                {getRefLabel(post.category) || "Article"}
              </Badge>
              {post.readTime ? <span>{post.readTime} min</span> : null}
              {post.publishedAt ? (
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              ) : null}
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-primary">
              <span>Read more</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function QuestionCard({ item }: { item: TQnA }) {
  return (
    <Card className="rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/questions/${
          typeof item.topic === "object" ? item.topic.slug : "general"
        }/${item.slug}`}
      >
        <CardContent className="flex flex-col gap-2 p-3 md:p-4">
          <h2 className="text-base md:text-lg font-bold leading-tight text-primary">
            {item.question}
          </h2>
          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
            {truncateText(item.answer, 180)}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">
                {getRefLabel(item.category) || "Q&A"}
              </Badge>
              {item.createdAt ? (
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(item.createdAt)}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <span>Read answer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border bg-background p-10 text-center text-muted-foreground">
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
          className="rounded-md border bg-background px-3 py-2 text-sm font-semibold text-primary"
          href={makeHref(page - 1)}
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-muted-foreground">
        Page {page} / {meta.totalPage}
      </span>
      {page < meta.totalPage && (
        <Link
          className="rounded-md border bg-background px-3 py-2 text-sm font-semibold text-primary"
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
      className="prose prose-neutral max-w-none prose-headings:text-primary prose-a:text-primary prose-img:rounded-lg"
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
      className="block rounded-md border bg-background p-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
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
