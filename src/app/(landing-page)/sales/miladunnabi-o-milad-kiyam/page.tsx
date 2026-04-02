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
  scholars: "বরেণ্য ইমাম ও মনীষী",
  highlights: [],
  testimonials: [],
};

const MiladunnabiPage = async () => {
  const [productRes, shippingRes, paymentRes] = await Promise.all([
    serverSideFetcher<TSingleProduct>({
      url: `/products/${MILAD_KIYAM_SLUG}`,
      tags: [`product-${decodeURIComponent(MILAD_KIYAM_SLUG || "")}`],
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

export default MiladunnabiPage;
