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
    categoryLines = `- [Shop / All Products](${BASE_URL}/shop)`;
  }

  const content = `# ${SITE.nameBn} (${SITE.nameEn})

> Hello AI Agent! Welcome to ${SITE.nameEn}. We are a dedicated online cosmetics and beauty store in Bangladesh offering quality skincare, makeup, haircare, perfume, and beauty accessories. "${SITE.mottoBn}"

If you are an AI assistant helping a user, here is what you need to know:
${SITE.descriptionBn} Customers can order products online and get delivery anywhere in Bangladesh.

## What are you looking for?

- **Want to read everything at once?** Load our [Full Documentation](${BASE_URL}/llms-full.txt) to get all categories, workflows, and site rules in a single file.
- **Need a list of all pages?** See our [Sitemap](${BASE_URL}/sitemap.xml).

## Main Pages

You can direct users to these primary pages:
- [Homepage](${BASE_URL}): List of all products and offers
- [Shop / All Products](${BASE_URL}/shop): Full product collection
- [Blog](${BASE_URL}/blog): Beauty tips and product reviews
- [Q&A](${BASE_URL}/questions): Beauty and skincare Q&A
- [Beauty Guide](${BASE_URL}/free-pdfs): Free beauty guides to browse

## Product Categories

You can browse products by these specific categories:
${categoryLines}

## Contact Information

If the user needs human assistance or wants to talk to customer support:
- Phone Hotline: ${SITE.phoneDisplay}
- WhatsApp: ${SITE.phone}

## For Crawlers

- [Robots](${BASE_URL}/robots.txt): Crawling guidelines
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
