import ShopContent from "@/app/(public)/shop/components/ShopContent";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import JsonLd from "@/components/shared/JsonLd";
import { getImageSrc } from "@/lib/utils";
import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";

const BASE_URL = "https://siddikiaprokashoni.com";

const fetchCategories = async () => {
  try {
    const res = await serverSideFetcher<TPaginatedData<TCategory[]>>({
      url: "/categories?isActive=true",
      tags: ["categories"],
    });
    return res?.data?.data || [];
  } catch {
    return [];
  }
};

/** Pre-build all active category pages at build time */
export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const categories = await fetchCategories();
  const category = categories.find((cat) => cat.slug === decodedSlug);

  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} বিষয়ক ইসলামিক বই | সিদ্দীকিয়া প্রকাশনী`;
  const description =
    category.description ||
    `সিদ্দীকিয়া প্রকাশনী থেকে ${category.name} বিষয়ক সেরা ইসলামিক বই কিনুন। হাজারো ইসলামিক কিতাব একটি প্ল্যাটফর্মে।`;
  const imageUrl = category.image ? getImageSrc(category.image.src) : undefined;

  return {
    title,
    description,
    keywords: [
      `${category.name} বই`,
      `${category.name} ইসলামিক বই`,
      `${category.name} কিতাব`,
      "সিদ্দীকিয়া প্রকাশনী",
      "Islamic books Bangladesh",
    ].join(", "),
    alternates: {
      canonical: `${BASE_URL}/category/${decodedSlug}`,
    },
    openGraph: {
      title,
      description,
      siteName: "সিদ্দীকিয়া প্রকাশনী",
      images: imageUrl ? [{ url: imageUrl, alt: category.name }] : [],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug);

  const categories = await fetchCategories();

  const category = categories.find((cat) => cat.slug === decodedSlug);

  if (!category) {
    return (
      <div className="py-20 text-center text-xl text-primary font-semibold">
        ক্যাটাগরিটি পাওয়া যায়নি
      </div>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${BASE_URL}/category/${decodedSlug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-white">
        {/* Decorative blurred circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle book pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              white 40px,
              white 41px
            )`,
          }}
        />

        <ContainerMax>
          <div className="relative py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Text block */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm flex-shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl md:text-2xl font-bold leading-snug">
                  {category.name}
                </h1>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5 leading-relaxed">
                  {category.description ||
                    `সিদ্দীকিয়া প্রকাশনী থেকে ${category.name} বিষয়ক সেরা ইসলামিক বই কিনুন।`}
                </p>
              </div>
            </div>

            {/* Chip — hidden on very small mobile to avoid crowding */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>ক্যাটাগরি সংগ্রহ</span>
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>

      <ShopContent
        defaultSelectedCategories={[decodedSlug]}
        syncDefaultCategoriesToUrl={false}
        hideSidebar={true}
      />
    </>
  );
}
