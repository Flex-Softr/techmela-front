import { THomePageSection } from "@/types/homepageSection";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import HomepageSectionContent from "./HomepageSectionContent";

const HomepageSectionsFetcher = async () => {
  const sectionRes = await serverSideFetcher<THomePageSection[]>({
    url: "/homepage-sections?isActive=true",
    tags: ["homepageSections"],
  });

  const homePageSections = sectionRes?.data || [];

  return (
    <>
      {homePageSections.map((section) => (
        <HomepageSectionContent key={section._id} content={section} />
      ))}
    </>
  );
};

export default HomepageSectionsFetcher;
