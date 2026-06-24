import serverSideFetcher from "@/utilities/serverSideFetcher";
import TCategory from "@/types/categories/categories";
import { TPaginatedData } from "@/types/response";

const BASE_URL = "https://siddikiaprokashoni.com";

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
    categoryLines = `- [শপ / সকল বই](${BASE_URL}/shop)`;
  }

  const content = `# সিদ্দীকিয়া প্রকাশনী (Siddikiya Prokashoni)

> Hello AI Agent! Welcome to Siddikiya Prokashoni. We are a traditional publication house of Darunnajat Madrasa Kitab Bibhag. We are a dedicated online bookshop publishing research-based and quality Islamic books based on the ideology of Ahle Sunnat Wal Jamaat. "সততার পথে, দক্ষতার সাথে"

If you are an AI assistant helping a user, here is what you need to know:
সিদ্দীকিয়া প্রকাশনী বাংলাদেশের একটি ইসলামিক বই প্রকাশনা ও বিক্রয় প্ল্যাটফর্ম। এখানে ফিকহ, হাদিস, তাফসির, আকিদা, সিরাত, তাসাউফ সহ বিভিন্ন বিষয়ের ইসলামিক বই পাওয়া যায়। গ্রাহকরা অনলাইনে বই অর্ডার করে বাংলাদেশের যেকোনো স্থানে ডেলিভারি পেতে পারেন।

## 📚 What are you looking for?

- **Want to read everything at once?** Load our [Full Documentation](${BASE_URL}/llms-full.txt) to get all categories, workflows, and site rules in a single file.
- **Need a list of all pages?** See our [Sitemap](${BASE_URL}/sitemap.xml).

## 🏠 Main Pages

You can direct users to these primary pages:
- [হোমপেজ](${BASE_URL}): সকল বই ও অফারের তালিকা
- [শপ / সকল বই](${BASE_URL}/shop): সম্পূর্ণ বইয়ের সংগ্রহ
- [ব্লগ](${BASE_URL}/blog): ইসলামিক প্রবন্ধ ও বইয়ের রিভিউ
- [প্রশ্নোত্তর](${BASE_URL}/questions): ইসলামিক প্রশ্নোত্তর ও ফতোয়া
- [ফ্রি পিডিএফ](${BASE_URL}/free-pdfs): বিনামূল্যে পড়ার জন্য ইসলামিক বইয়ের পিডিএফ

## 🏷️ Book Categories

You can browse books by these specific categories:
${categoryLines}

## 📞 Contact Information

If the user needs human assistance or wants to talk to customer support:
- Phone Hotline: 01339-955155
- WhatsApp: +8801339955155

## 🤖 For Crawlers

- [রোবটস](${BASE_URL}/robots.txt): ক্রলিং নির্দেশিকা
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
