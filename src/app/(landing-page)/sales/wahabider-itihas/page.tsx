import config from "@/config/config";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import SalesPageClient from "./components/SalesPageClient";

// Sub-components
import AnnouncementBar from "../../_components/AnnouncementBar";

export const metadata: Metadata = {
  title: "ওয়াহাবিদের ইতিহাস - ইয়াসির আরাফাত আল হিন্দী | সিদ্দীকিয়া প্রকাশনী",
  description:
    "ওয়াহাবি আন্দোলনের পেছনের সত্য কি? মুহাম্মদ ইবনে আব্দুল ওয়াহাব এবং তার নজদি আন্দোলনের দালিলিক ইতিহাস। ৩৩৫ পৃষ্ঠার এই চমৎকার গবেষণামূলক বইটিতে পাবেন ইসলামের ইতিহাসের অনেক অজানা তথ্য।",
};

const WAHA_BITHER_ITIHAS_SLUG = config.wahabider_itihas_slug;

const BOOK_DETAILS = {
  title: "ওয়াহাবিদের ইতিহাস",
  author: "ইয়াসির আরাফাত আল হিন্দী",
  pages: "৩৩৫",
  publisher: "সিদ্দীকিয়া প্রকাশনী",
  scholars: "৮৫+ উলামা",
  highlights: [
    {
      icon: "📜",
      title: "নজদ ও রাসূল (সা.)-এর ভবিষ্যৎবাণী",
      description:
        "রাসূল (সা.)-এর সেই নজদ বিষয়ক ভবিষ্যৎবাণীগুলোর সঠিক দালিলিক ব্যবচ্ছেদ।",
    },
    {
      icon: "👥",
      title: "ব্রিটিশ গোয়েন্দা ও নজদি আঁতাত",
      description:
        "ব্রিটিশ গোয়েন্দা 'জন ফিলবি' কীভাবে সৌদি পরিবার ও ওয়াহাবিদের সাথে আঁতাত করেছিল।",
    },
    {
      icon: "⚖️",
      title: "মক্কা ও মদিনায় রক্তগঙ্গা",
      description:
        "অসংখ্য আলেম ও সাধারণ মুসলিমের শাহাদাত বরণের সেই লোমহর্ষক ইতিবৃত্ত।",
    },
    {
      icon: "🛡️",
      title: "ঐতিহাসিক নিদর্শন ধ্বংসলীলা",
      description:
        "কেন তারা আহলে বাইত ও সাহাবাদের পবিত্র মাজার ও নিদর্শনগুলো মাটির সাথে মিশিয়ে দিয়েছিল।",
    },
    {
      icon: "🔍",
      title: "শীর্ষ স্থানীয় আলেমদের অবস্থান",
      description:
        "আরব ও অনারব বিশ্বের শীর্ষস্থানীয় আলেমদের ওয়াহাবি মতবাদের বিরুদ্ধে সম্মিলিত প্রতিরোধ ও ফতোয়া।",
    },
    {
      icon: "📖",
      title: "৩৩৫ পৃষ্ঠার বিশাল গবেষণা",
      description:
        "একই মলাটে পর্বতসম দালিলিক সংকলন যা আপনার ইতিহাসের ধারণা বদলে দেবে।",
    },
  ],
  testimonials: [
    {
      name: "মাওলানা আব্দুল হাই",
      location: "ঢাকা",
      rating: 5,
      text: "ইতিহাসের অনেক অজানা বিষয় এই বইটি পড়ার পর পরিষ্কার হয়ে গেছে। দলিলভিত্তিক আলোচনার জন্য সিদ্দীকিয়া প্রকাশনীকে ধন্যবাদ।",
    },
    {
      name: "মাহফুজুর রহমান",
      location: "চট্টগ্রাম",
      rating: 5,
      text: "বর্তমান সময়ের বিভ্রান্তি থেকে বাঁচতে এই বইটি প্রতিটি সচেতন মুসলিমের পড়া উচিত। বিশেষ করে যারা ইতিহাসের সঠিক ধারা জানতে চান।",
    },
    {
      name: "উবায়দুল্লাহ",
      location: "সিলেট",
      rating: 5,
      text: "অত্যন্ত চমৎকার ও সাবলীল ভাষায় জটিল ঐতিহাসিক বিষয়গুলো ফুটিয়ে তোলা হয়েছে। লেখকের গবেষণামূলক আলোচনা আমাকে মুগ্ধ করেছে।",
    },
  ],
};

const WahabiderItihasPage = async () => {
  const [productRes, shippingRes, paymentRes] = await Promise.all([
    serverSideFetcher<TSingleProduct>({
      url: `/products/${WAHA_BITHER_ITIHAS_SLUG}`,
      tags: [`product-${decodeURIComponent(WAHA_BITHER_ITIHAS_SLUG || "")}`],
    }),
    serverSideFetcher<TShippingCharges[]>({
      url: "/shipping-charges?isActive=true",
      tags: ["shippingCharge"],
    }),
    serverSideFetcher<TPaymentMethod[]>({
      url: "/payment-method?isActive=true",
      tags: ["paymentMethod"],
    }),
  ]);

  const product = productRes?.data;
  const shippingCharges = shippingRes?.data ?? [];
  const paymentMethods = paymentRes?.data ?? [];

  return (
    <SalesPageClient
      product={product}
      shippingCharges={shippingCharges}
      paymentMethods={paymentMethods}
      bookDetails={BOOK_DETAILS}
      announcementBar={<AnnouncementBar />}
    />
  );
};

export default WahabiderItihasPage;
