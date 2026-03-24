import config from "@/config/config";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import SalesPageClient from "./components/SalesPageClient";

// Sub-components
import AnnouncementBar from "../../_components/AnnouncementBar";
import BookHighlights from "./components/BookHighlights";
import BookStats from "./components/BookStats";
import Testimonials from "./components/Testimonials";

export const metadata: Metadata = {
  title:
    "বরেন্য ইমাম ও মনীষীদের দৃষ্টিতে মিলাদুন্নবী উদযাপন ও মিলাদ-কিয়াম - জুবাইর আহমাদ | সিদ্দীকিয়া প্রকাশনী",
  description:
    "জুবাইর আহমাদ রচিত 'বরেন্য ইমাম ও মনীষীদের দৃষ্টিতে মিলাদুন্নবী উদযাপন ও মিলাদ-কিয়াম'। মিলাদুন্নবী ও মিলাদ-কিয়াম সম্পর্কে দালিলিক ও তাত্ত্বিক আলোচনা। সিদ্দীকিয়া প্রকাশনী থেকে প্রকাশিত একটি গুরুত্বপূর্ণ গ্রন্থ।",
};

const MILAD_KIYAM_SLUG = config.milad_kiyam_slug;

const BOOK_DETAILS = {
  title: "বরেন্য ইমাম ও মনীষীদের দৃষ্টিতে মিলাদুন্নবী উদযাপন ও মিলাদ-কিয়াম",
  author: "জুবাইর আহমাদ",
  pages: "৪৪৯",
  publisher: "সিদ্দীকিয়া প্রকাশনী",
  scholars: "বরেন্য ইমাম ও মনীষী",
  highlights: [
    {
      icon: "📖",
      title: "দালিলিক আলোচনা",
      description:
        "মিলাদুন্নবী উদযাপন ও মিলাদ-কিয়াম সম্পর্কে কুরআন, সুন্নাহ ও আকাবিরদের বক্তব্যের আলোকে গবেষণামূলক আলোচনা।",
    },
    {
      icon: "🕌",
      title: "ইমামদের অভিমত",
      description:
        "বিখ্যাত মুজতাহিদ ইমাম এবং মনীষীদের দৃষ্টিতে মিলাদুন্নবী ও মিলাদ-কিয়ামের শরয়ী অবস্থান ব্যাখ্যা।",
    },
    {
      icon: "✅",
      title: "সংশয় নিরসন",
      description:
        "মিলাদুন্নবী ও মিলাদ-কিয়াম নিয়ে প্রচলিত বিভিন্ন সংশয় ও আপত্তির দালিলিক খণ্ডন।",
    },
    {
      icon: "🌍",
      title: "ঐতিহাসিক প্রেক্ষাপট",
      description:
        "মুসলিম উম্মাহর ইতিহাসে মিলাদুন্নবী উদযাপনের প্রাচীনতা ও ঐতিহ্য নিয়ে আলোচনা।",
    },
  ],
  testimonials: [],
};

const MiladunnabiPage = async () => {
  const [productRes, shippingRes, paymentRes] = await Promise.all([
    serverSideFetcher<TSingleProduct>({
      url: `/products/${MILAD_KIYAM_SLUG}`,
      tags: [`product-${MILAD_KIYAM_SLUG}`],
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
      highlights={<BookHighlights highlights={BOOK_DETAILS.highlights} />}
      stats={
        <BookStats
          pages={BOOK_DETAILS.pages}
          scholars={BOOK_DETAILS.scholars}
        />
      }
      testimonials={<Testimonials testimonials={BOOK_DETAILS.testimonials} />}
    />
  );
};

export default MiladunnabiPage;
