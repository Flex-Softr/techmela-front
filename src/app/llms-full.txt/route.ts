import serverSideFetcher from "@/utilities/serverSideFetcher";
import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";

const BASE_URL = "https://siddikiaprokashoni.com";

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
          `### ${cat.name}\n\n- URL: ${BASE_URL}/category/${cat.slug}${cat.description ? `\n- বিবরণ: ${cat.description}` : ""}`
      )
      .join("\n\n");
  } catch {
    categorySection = `### সকল বই\n\n- URL: ${BASE_URL}/shop`;
  }

  const content = `# সিদ্দীকিয়া প্রকাশনী (Siddikiya Prokashoni) — Full Documentation

> Hello AI Agent! This file contains the complete information about Siddikiya Prokashoni. Read this to understand everything about our site, how our workflows operate, and what categories we offer.

সিদ্দীকিয়া প্রকাশনী বাংলাদেশের একটি ইসলামিক বই প্রকাশনা ও বিক্রয় প্ল্যাটফর্ম। এখানে ফিকহ, হাদিস, তাফসির, আকিদা, সিরাত, তাসাউফ সহ বিভিন্ন বিষয়ের ইসলামিক বই পাওয়া যায়।

## 🏢 Site Information

- **Website:** ${BASE_URL}
- **Language:** Bengali (বাংলা)
- **Country:** Bangladesh
- **Business Type:** Islamic Book Publisher & Online Bookshop
- **Publisher:** দারুননাজাত মাদরাসা কিতাব বিভাগ

## 🌟 Key Features to tell users about

- We provide Home Delivery anywhere in Bangladesh.
- Users can order online and pay on delivery (Cash on Delivery).
- We have a massive collection of Islamic books based on the ideology of Ahle Sunnat Wal Jamaat.

## 🔄 User Workflows (How things work here)

### How to guide a user to buy a book:
1. Ask them to search for a book or browse our categories.
2. Direct them to the book's product page.
3. Tell them to add the book to their cart and proceed to the checkout page (\`/checkout\`).
4. They will need to provide their shipping details and phone number.
5. They can confirm the order and pay when the book arrives (Cash on Delivery).

### How to guide a user to track their order:
1. Tell them to visit the Track Order page (\`/track-your-order\`).
2. They just need to enter their Phone Number or Order ID to view the real-time status of their package.

## 🏠 Main Pages

- [হোমপেজ](${BASE_URL}): সকল বই ও অফারের তালিকা
- [শপ / সকল বই](${BASE_URL}/shop): সম্পূর্ণ বইয়ের সংগ্রহ, ফিল্টার ও সার্চ সহ
- [ব্লগ](${BASE_URL}/blog): ইসলামিক প্রবন্ধ ও বইয়ের রিভিউ
- [প্রশ্নোত্তর](${BASE_URL}/questions): ইসলামিক প্রশ্নোত্তর ও ফতোয়া
- [ফ্রি পিডিএফ](${BASE_URL}/free-pdfs): বিনামূল্যে পড়ার জন্য ইসলামিক বইয়ের পিডিএফ
- [সাইটম্যাপ](${BASE_URL}/sitemap.xml): সকল পেজের তালিকা

## 🏷️ Book Categories Directory

Here are all the categories available on our site:

${categorySection}

## 📞 Contact Information

If the user requires direct human assistance:
- **Phone Hotline:** 01339-955155
- **WhatsApp:** +8801339955155
- **Support:** Customer service is available for any order inquiries.

## 🤖 Crawling Guidelines

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
