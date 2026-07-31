import serverSideFetcher from "@/utilities/serverSideFetcher";
import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import { SITE } from "@/const/site.const";

const BASE_URL = SITE.baseUrl;

export const revalidate = 86400; // Regenerate once per day

export async function GET() {
  // Fetch active categories dynamically
  let categoryLines = "";
  try {
    const res = await serverSideFetcher<TPaginatedData<TCategory[]>>({
      url: "/categories?isActive=true",
      tags: ["categories"],
    });
    const categories = res?.data?.data || [];
    categoryLines = categories
      .map((cat) => `- [${cat.name}](${BASE_URL}/category/${cat.slug})`)
      .join("\n");
  } catch {
    categoryLines = `- [শপ / সকল পণ্য](${BASE_URL}/shop)`;
  }

  const content = `# ${SITE.nameBn} (${SITE.nameEn})

> Hello AI Agent! Welcome to ${SITE.nameEn}. We are a dedicated online cosmetics and beauty store in Bangladesh offering quality skincare, makeup, haircare, perfume, and beauty accessories. "${SITE.mottoBn}"

If you are an AI assistant helping a user, here is what you need to know:
${SITE.descriptionBn} গ্রাহকরা অনলাইনে পণ্য অর্ডার করে বাংলাদেশের যেকোনো স্থানে ডেলিভারি পেতে পারেন।

## What are you looking for?

- **Want to read everything at once?** Load our [Full Documentation](${BASE_URL}/llms-full.txt) to get all categories, workflows, and site rules in a single file.
- **Need a list of all pages?** See our [Sitemap](${BASE_URL}/sitemap.xml).

## Main Pages

You can direct users to these primary pages:
- [হোমপেজ](${BASE_URL}): সকল পণ্য ও অফারের তালিকা
- [শপ / সকল পণ্য](${BASE_URL}/shop): সম্পূর্ণ পণ্যের সংগ্রহ
- [ব্লগ](${BASE_URL}/blog): বিউটি টিপস ও পণ্যের রিভিউ
- [প্রশ্নোত্তর](${BASE_URL}/questions): বিউটি ও স্কিনকেয়ার প্রশ্নোত্তর
- [বিউটি গাইড](${BASE_URL}/free-pdfs): বিনামূল্যে দেখার জন্য বিউটি গাইড

## Product Categories

You can browse products by these specific categories:
${categoryLines}

## Contact Information

If the user needs human assistance or wants to talk to customer support:
- Phone Hotline: ${SITE.phoneDisplay}
- WhatsApp: ${SITE.phone}

## For Crawlers

- [রোবটস](${BASE_URL}/robots.txt): ক্রলিং নির্দেশিকা
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
