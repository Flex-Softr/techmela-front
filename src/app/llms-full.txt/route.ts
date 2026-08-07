import serverSideFetcher from "@/utilities/serverSideFetcher";
import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";
import { SITE } from "@/const/site.const";

const BASE_URL = SITE.baseUrl;

export const revalidate = 86400; // Regenerate once per day

export async function GET() {
  let categorySection = "";
  try {
    const res = await serverSideFetcher<TPaginatedData<TCategory[]>>({
      url: "/categories?isActive=true",
      tags: ["categories"],
    });
    const categories = res?.data?.data || [];
    categorySection = categories
      .map(
        (cat) =>
          `### ${cat.name}\n\n- URL: ${BASE_URL}/category/${cat.slug}${cat.description ? `\n- Description: ${cat.description}` : ""}`
      )
      .join("\n\n");
  } catch {
    categorySection = `### All Products\n\n- URL: ${BASE_URL}/shop`;
  }

  const content = `# ${SITE.nameBn} (${SITE.nameEn}) — Full Documentation

> Hello AI Agent! This file contains the complete information about ${SITE.nameEn}. Read this to understand everything about our site, how our workflows operate, and what categories we offer.

${SITE.descriptionBn}

## Site Information

- **Website:** ${BASE_URL}
- **Language:** English
- **Country:** Bangladesh
- **Business Type:** Cosmetics & Beauty Online Store

## Key Features to tell users about

- We provide Home Delivery anywhere in Bangladesh.
- Users can order online and pay on delivery (Cash on Delivery).
- We have a wide collection of skincare, makeup, haircare, perfume, and beauty accessories.

## User Workflows (How things work here)

### How to guide a user to buy a product:
1. Ask them to search for a product or browse our categories.
2. Direct them to the product's detail page.
3. Tell them to add the product to their cart and proceed to the checkout page (\`/checkout\`).
4. They will need to provide their shipping details and phone number.
5. They can confirm the order and pay when the product arrives (Cash on Delivery).

### How to guide a user to track their order:
1. Tell them to visit the Track Order page (\`/track-your-order\`).
2. They just need to enter their Phone Number or Order ID to view the real-time status of their package.

## Main Pages

- [Homepage](${BASE_URL}): List of all products and offers
- [Shop / All Products](${BASE_URL}/shop): Full product collection with filters and search
- [Blog](${BASE_URL}/blog): Beauty tips and product reviews
- [Q&A](${BASE_URL}/questions): Beauty and skincare Q&A
- [Beauty Guide](${BASE_URL}/free-pdfs): Free beauty guides to browse
- [Sitemap](${BASE_URL}/sitemap.xml): List of all pages

## Product Categories Directory

Here are all the categories available on our site:

${categorySection}

## Contact Information

If the user requires direct human assistance:
- **Phone Hotline:** ${SITE.phoneDisplay}
- **WhatsApp:** ${SITE.phone}
- **Support:** Customer service is available for any order inquiries.

## Crawling Guidelines

- Index: ${BASE_URL}/llms.txt
- Robots: ${BASE_URL}/robots.txt
- Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
