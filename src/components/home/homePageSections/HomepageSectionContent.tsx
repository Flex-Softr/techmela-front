import ProductCard from "@/components/productCards/ProductCard";
import SectionSubtitle from "@/components/SectionSubtitle";
import SectionTitle from "@/components/SectionTitle";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { getImageSrc } from "@/lib/utils";
import { THomePageSection } from "@/types/homepageSection";
import { TProduct } from "@/types/products/product";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Image from "next/image";
import Link from "next/link";

const HomepageSectionContent = async ({
  content,
}: {
  content: THomePageSection;
}) => {
  const contentId = content?._id;
  const { data } = await serverSideFetcher<TProduct[]>({
    url: `/homepage-sections/content/${contentId}`,
    tags: ["homepageIndividualSection", `homepageSections-${contentId}`],
  });

  const products = data || [];

  const sectionImageSrc =
    typeof content?.image === "string"
      ? content.image
      : content?.image?.src || null;
  const sectionImageAlt =
    typeof content?.image === "object" && content?.image?.alt
      ? content.image.alt
      : content?.title || "সেকশন ব্যানার";

  return (
    <>
      {products.length > 0 && (
        <section className="pt-10 md:pt-12">
          {sectionImageSrc ? (
            <div className="mb-6 px-4 flex justify-center md:mb-8">
              {content?.ctaLink ? (
                <Link
                  href={content.ctaLink}
                  className="inline-block transition-opacity hover:opacity-95"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={getImageSrc(sectionImageSrc)}
                      alt={sectionImageAlt}
                      width={1200}
                      height={300}
                      className="h-auto max-h-[240px] w-auto max-w-full object-contain"
                    />
                  </div>
                </Link>
              ) : (
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={getImageSrc(sectionImageSrc)}
                    alt={sectionImageAlt}
                    width={1200}
                    height={300}
                    className="h-auto max-h-[240px] w-auto max-w-full object-contain"
                  />
                </div>
              )}
            </div>
          ) : content?.title || content?.subtitle ? (
            <div className="mb-6 px-4 text-center md:mb-8">
              {content?.title && (
                <SectionTitle title={content?.title} className="text-primary" />
              )}
              {content?.subtitle && (
                <SectionSubtitle text={content?.subtitle} />
              )}
            </div>
          ) : null}

          <ContainerMax>
            <div className="mt-5">
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3">
                {products?.slice(0, 5)?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>

            {products.length > 5 && content?.ctaText && content?.ctaLink ? (
              <div className="flex justify-center mt-6">
                <Button asChild size="sm" className="rounded-full px-7 bg-primary hover:bg-secondary text-primary-foreground shadow-sm">
                  <Link href={content?.ctaLink}>{content?.ctaText}</Link>
                </Button>
              </div>
            ) : (
              <>
                {products.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <Button asChild size="sm" className="rounded-full px-7 bg-primary hover:bg-secondary text-primary-foreground shadow-sm">
                      <Link
                        href={`/shop?collection=${
                          typeof content?.collectionId === "object"
                            ? content?.collectionId?.slug
                            : content?.collectionId
                        }`}
                      >
                        সবগুলো দেখুন
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </ContainerMax>
        </section>
      )}
    </>
  );
};

export default HomepageSectionContent;
