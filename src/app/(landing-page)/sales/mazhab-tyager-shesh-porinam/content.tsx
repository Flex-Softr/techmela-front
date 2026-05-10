import config from "@/config/config";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import SalesPageClient from "./components/SalesPageClient";

// Sub-components
import AnnouncementBar from "../../_components/AnnouncementBar";

import { getImageSrc } from "@/lib/utils";

const MAZHAB_TYAGER_PORINAM_SLUG = config.mazhab_tyager_porinam_slug;

export const revalidate = false; // On-demand revalidation only

export async function generateMetadata(): Promise<Metadata> {
  const productRes = await serverSideFetcher<TSingleProduct>({
    url: `/products/${MAZHAB_TYAGER_PORINAM_SLUG}`,
    tags: [`product-${decodeURIComponent(MAZHAB_TYAGER_PORINAM_SLUG || "")}`],
  });

  const product = productRes?.data;
  const imageUrl = getImageSrc(
    product?.thumbnail?.src || product?.gallery?.[0]?.src
  );

  const title =
    "মাযহাব ত্যাগের শেষ পরিণাম ইসলাম ত্যাগ - আল্লামা যাহিদ আলকাউসারী | সিদ্দীকিয়া প্রকাশনী";
  const rawDescription =
    "শাইখুল ইসলাম আল্লামা যাহিদ আলকাউসারী (রহ.) রচিত 'মাযহাব ত্যাগের শেষ পরিণাম ইসলাম ত্যাগ'। মাযহাব অনুসরণের গুরুত্ব এবং মাযহাব ত্যাগের ভয়াবহ পরিণাম সম্পর্কে দালিলিক ও তাত্ত্বিক আলোচনা।";
  const description = rawDescription.replace(/<[^>]+>/g, "").trim();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
        {
          url: "https://siddikiaprokashoni.com/logo/logo.png",
          alt: "সিদ্দীকিয়া প্রকাশনী",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

const BOOK_DETAILS = {
  title: "মাযহাব ত্যাগের শেষ পরিণাম ইসলাম ত্যাগ",
  author: "শাইখুল ইসলাম আল্লামা যাহিদ আলকাউসারী (রহ.)",
  pages: "৫২৮",
  publisher: "সিদ্দীকিয়া প্রকাশনী",
  scholars: "বরেন্য ইমাম ও মনীষী",
  highlights: [
    {
      icon: "📜",
      title: "কুরআন ও হাদীস থেকে শক্ত দলিল",
      description:
        "মাযহাব ও তাকলিদের যৌক্তিকতা বিষয়ে কুরআন-সুন্নাহর অকাট্য প্রমাণাদি।",
    },
    {
      icon: "👥",
      title: "সালাফে সালিহীনের অবস্থান",
      description:
        "সাহাবায়ে কেরাম ও তাবেয়ীনদের যুগে অনুসরণের নির্ভরযোগ্য পদ্ধতি।",
    },
    {
      icon: "⚖️",
      title: "ইমামদের অনুসরণের যুক্তি",
      description:
        "কেন ১৪০০ বছর ধরে উম্মাহ আইম্মায়ে মুজতাহিদীনদের ওপর ঐক্যবদ্ধ ছিল।",
    },
    {
      icon: "🛡️",
      title: "আধুনিক বিভ্রান্তির জবাব",
      description: "লা-মাযহাব ও সমসাময়িক আকিদাগত বিকৃতির তাত্ত্বিক খণ্ডন।",
    },
    {
      icon: "🔍",
      title: "বাস্তব উদাহরণ ও বিশ্লেষণ",
      description:
        "কীভাবে ছোট ভুল থেকে মানুষ বড় বিচ্যুতির দিকে ধাবিত হয় তার চিত্র।",
    },
    {
      icon: "📖",
      title: "৫২৮ পৃষ্ঠার গভীর গবেষণা",
      description:
        "একই মলাটে বিশাল দালিলিক সংকলন যা আপনার ঈমানি চেতনা শাণিত করবে।",
    },
  ],
  testimonials: [
    {
      name: "আব্দুল হাই",
      location: "ঢাকা",
      rating: 5,
      text: "মাযহাব নিয়ে আমার মনে অনেক সংশয় ছিল। এই বইটি পড়ার পর আলহামদুলিল্লাহ সব পরিষ্কার হয়ে গেছে। দলিলভিত্তিক আলোচনার জন্য সিদ্দীকিয়া প্রকাশনীকে ধন্যবাদ।",
    },
    {
      name: "মাহফুজুর রহমান",
      location: "চট্টগ্রাম",
      rating: 5,
      text: "বর্তমান সময়ের বিভ্রান্তি থেকে বাঁচতে এই বইটি প্রতিটি ঘরে থাকা উচিত। বিশেষ করে যারা মনে করেন মাযহাব মানা জরুরি নয়, তাদের জন্য এটি একটি শ্রেষ্ঠ উপহার।",
    },
    {
      name: "উবায়দুল্লাহ",
      location: "সিলেট",
      rating: 5,
      text: "অত্যন্ত চমৎকার ও সাবলীল ভাষায় জটিল বিষয়গুলো ফুটিয়ে তোলা হয়েছে। লেখকের গবেষণামূলক আলোচনা আমাকে মুগ্ধ করেছে।",
    },
  ],
};

const MazhabTyagerPorinamPage = async () => {
  const [productRes, shippingRes, paymentRes] = await Promise.all([
    serverSideFetcher<TSingleProduct>({
      url: `/products/${MAZHAB_TYAGER_PORINAM_SLUG}`,
      tags: [`product-${decodeURIComponent(MAZHAB_TYAGER_PORINAM_SLUG || "")}`],
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

export default MazhabTyagerPorinamPage;
