import {
  EmptyState,
  Pagination,
} from "@/app/(public)/_components/blog-qna/BlogQnaCards";
import { SITE_URL } from "@/app/(public)/_components/blog-qna/utils";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { BookOpen, Search, Download } from "lucide-react";
import { Metadata } from "next";
import { getImageSrc } from "@/lib/utils";

type TSearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "ফ্রি পিডিএফ",
  description:
    "সিদ্ধিকিয়া প্রকাশনীর ফ্রি পিডিএফ বিভাগে স্বাগতম! এখানে আপনি বিভিন্ন ইসলামিক বইয়ের ফ্রি পিডিএফ ডাউনলোড করতে পারবেন।",
  alternates: {
    canonical: `${SITE_URL}/free-pdfs`,
  },
};

type TBookPreview = {
  _id: string;
  src: string;
  alt: string;
  previewType: string;
  createdAt: string;
};

async function getFreePdfs(searchParams: TSearchParams) {
  const page = Number(searchParams.page || 1);
  return serverSideFetcher<TBookPreview[]>({
    url: "/book-previews",
    tags: ["bookPreviews"],
    params: {
      page,
      limit: 12,
      previewType: "free",
      searchTerm: searchParams.search,
      sort: "-createdAt",
    },
  });
}

function FreePdfCard({ item }: { item: TBookPreview }) {
  // src is already an absolute R2 URL or relative, use getImageSrc to be safe
  const fileUrl = getImageSrc(item.src);

  return (
    <Card className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-5 h-full">
        <div className="flex items-start gap-4">
          <div className="rounded-md bg-primary/10 p-3 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="line-clamp-2 text-lg font-bold text-primary">
              {item.alt}
            </h2>
            <p className="text-xs text-muted-foreground">
              {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <Download className="h-4 w-4" />
            ডাউনলোড করুন
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function FreePdfsPage({
  searchParams,
}: {
  searchParams: TSearchParams;
}) {
  const pdfRes = await getFreePdfs(searchParams);
  const pdfList = pdfRes?.data || [];
  const meta = pdfRes?.meta;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free PDFs",
    url: `${SITE_URL}/free-pdfs`,
  };

  const search = String(searchParams.search || "");

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <div className="bg-[#f7faf7] min-h-screen">
        <section className="border-b bg-white">
          <ContainerMax className="py-4 md:py-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <BookOpen className="h-4 w-4" />
                ফ্রি পিডিএফ
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                ফ্রি পিডিএফ সংগ্রহ
              </h1>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                সিদ্ধিকিয়া প্রকাশনীর পক্ষ থেকে আপনাদের জন্য কিছু বিশেষ বইয়ের
                ফ্রি পিডিএফ। এগুলো ডাউনলোড করে পড়তে পারেন এবং অন্যদের সাথে
                শেয়ার করতে পারেন।
              </p>
            </div>
          </ContainerMax>
        </section>

        <ContainerMax className="grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            <form
              action="/free-pdfs"
              className="rounded-lg border bg-white p-3 shadow-sm"
            >
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  name="search"
                  defaultValue={search}
                  placeholder="পিডিএফ খুঁজুন..."
                  className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm outline-none focus:border-primary"
                />
              </label>
            </form>
          </aside>

          <div className="min-w-0">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pdfList.length ? (
                pdfList.map((item) => (
                  <FreePdfCard key={item._id} item={item} />
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-3">
                  <EmptyState label="কোনো পিডিএফ পাওয়া যায়নি।" />
                </div>
              )}
            </div>
            <Pagination
              meta={meta}
              basePath="/free-pdfs"
              searchParams={searchParams}
            />
          </div>
        </ContainerMax>
      </div>
    </>
  );
}
