import { THomePageSection } from "@/types/homepageSection";
import HomepageSectionContent from "./HomepageSectionContent";
import { Suspense } from "react";
import HomepageSectionSkeleton from "./HomepageSectionSkeleton";
import TGenericResponse from "@/types/response";

const HomepageSectionsFetcher = async ({
  promise,
}: {
  promise: Promise<TGenericResponse<THomePageSection[]>>;
}) => {
  const sectionRes = await promise;

  const homePageSections = sectionRes?.data || [];

  return (
    <>
      {homePageSections.map((section) => (
        <Suspense key={section._id} fallback={<HomepageSectionSkeleton />}>
          <HomepageSectionContent content={section} />
        </Suspense>
      ))}
    </>
  );
};

export default HomepageSectionsFetcher;
