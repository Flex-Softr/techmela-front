import config from "@/config/config";
import { TPaymentMethod } from "@/types/paymentMethod";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { Metadata } from "next";
import SalesPageClient from "./components/SalesPageClient";

// Sub-components
import AnnouncementBar from "./components/AnnouncementBar";
import BookHighlights from "./components/BookHighlights";
import BookStats from "./components/BookStats";
import Testimonials from "./components/Testimonials";

export const metadata: Metadata = {
  title: "ওয়াহাবিদের ইতিহাস - ইয়াসির আরাফাত আল হিন্দী | সিদ্দীকিয়া প্রকাশনী",
  description:
    "৮৫ জন বরেণ্য ইমাম ও মনীষীর দালিলিক আলোচনায় ওয়াহাবিদের ইতিহাস জানুন। নজদের সংক্ষিপ্ত ইতিহাস থেকে শুরু করে বর্তমান প্রেক্ষাপট পর্যন্ত সুবিন্যস্ত ও প্রামাণিক গ্রন্থ।",
};

const OHABIDER_ITIHAS_SLUG = config.wahabider_itihas_slug;

const BOOK_DETAILS = {
  title: "ওয়াহাবিদের ইতিহাস",
  author: "ইয়াসির আরাফাত আল হিন্দী",
  pages: "৩৩৫",
  publisher: "সিদ্দীকিয়া প্রকাশনী",
  scholars: "৮৫+",
  highlights: [
    {
      icon: "📖",
      title: "দুই পর্বে সাজানো",
      description:
        "প্রথম পর্বে নজদের ইতিহাস ও মুহাম্মদ ইবনু আব্দিল ওয়াহহাবের জীবনকথা। দ্বিতীয় পর্বে ওয়াহাবী মতাদর্শ ও আকাবিরদের প্রকৃত অবস্থান।",
    },
    {
      icon: "🕌",
      title: "৮৫+ মহান ইমামের বক্তব্য",
      description:
        "প্রতিটি তথ্যের পক্ষে উপযুক্ত শরয়ী দালায়েল ও ৮৫ জন বরেণ্য মুজতাহিদ ইমাম এবং মনীষীর মতামত সংকলিত।",
    },
    {
      icon: "🌍",
      title: "ঐতিহাসিক প্রেক্ষাপট",
      description:
        "ফিলিস্তিন সমস্যায় ওয়াহাবিদের ভূমিকা এবং সৌদি আরব প্রতিষ্ঠার ইতিহাস তদানীন্তন উলামায়ে কিরামের বক্তব্যসহ।",
    },
    {
      icon: "✅",
      title: "দালিলিক ও নিরপেক্ষ আলোচনা",
      description:
        "পক্ষ-বিপক্ষ উভয় মতামত এনে নিরপেক্ষ ও দালিলিক আলোচনা — বিদআত নিয়ে মুজতাহিদ ইমামদের ব্যাখ্যার আলোকে।",
    },
  ],
  testimonials: [
    {
      name: "আব্দুর রহমান",
      location: "ঢাকা",
      rating: 5,
      text: "অত্যন্ত প্রামাণিক ও তথ্যবহুল বই। এত সুন্দরভাবে ইতিহাস উপস্থাপন করা হয়েছে যা আগে কোথাও দেখিনি।",
    },
    {
      name: "মুহাম্মাদ ইউসুফ",
      location: "চট্টগ্রাম",
      rating: 5,
      text: "আলহামদুলিল্লাহ, এই বইটি পড়ে অনেক ভুল ধারণা দূর হয়েছে। সিদ্দীকিয়া প্রকাশনীকে ধন্যবাদ।",
    },
    {
      name: "আনিস হোসাইন",
      location: "সিলেট",
      rating: 5,
      text: "বইটির রেফারেন্স ও দালায়েল অত্যন্ত শক্তিশালী। সকল মুসলিমের পড়া উচিত।",
    },
  ],
};

const WahabiderItihasPage = async () => {
  const [productRes, shippingRes, paymentRes] = await Promise.all([
    serverSideFetcher<TSingleProduct>({
      url: `/products/${OHABIDER_ITIHAS_SLUG}`,
      tags: [`product-${OHABIDER_ITIHAS_SLUG}`],
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

export default WahabiderItihasPage;
