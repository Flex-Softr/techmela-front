import serverSideFetcher from "@/utilities/serverSideFetcher";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import { TSingleProduct } from "@/types/products/singleProduct";
import { Metadata } from "next";
import SalesPageClient from "./components/SalesPageClient";
import config from "@/config/config";

export const metadata: Metadata = {
  title: "ওয়াহাবিদের ইতিহাস - ইয়াসির আরাফাত আল হিন্দী | সিদ্দীকিয়া প্রকাশনী",
  description:
    "৮৫ জন বরেণ্য ইমাম ও মনীষীর দালিলিক আলোচনায় ওয়াহাবিদের ইতিহাস জানুন। নজদের সংক্ষিপ্ত ইতিহাস থেকে শুরু করে বর্তমান প্রেক্ষাপট পর্যন্ত সুবিন্যস্ত ও প্রামাণিক গ্রন্থ।",
};

const OHABIDER_ITIHAS_SLUG = config.wahabider_itihas_slug;

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
    />
  );
};

export default WahabiderItihasPage;
