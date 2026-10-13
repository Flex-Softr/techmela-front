import { Metadata } from "next";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import { TSingleProduct } from "@/types/products/singleProduct";
import TShippingCharges from "@/types/shippingCharge";
import { TPaymentMethod } from "@/types/paymentMethod";
import SX21LandingClient from "./SX21LandingClient";
import { getImageSrc } from "@/lib/utils";

// Product ID can be set via environment variable: SX21_PRODUCT_ID or NEXT_PUBLIC_SX21_PRODUCT_ID
const SX21_PRODUCT_ID =
  process.env.SX21_PRODUCT_ID ||
  process.env.NEXT_PUBLIC_SX21_PRODUCT_ID ||
  "";

export const revalidate = false; // On-demand revalidation only

export async function generateMetadata(): Promise<Metadata> {
  let product: TSingleProduct | null = null;

  if (SX21_PRODUCT_ID) {
    try {
      const productRes = await serverSideFetcher<TSingleProduct>({
        url: `/products/${SX21_PRODUCT_ID}`,
        tags: [`product-${decodeURIComponent(SX21_PRODUCT_ID)}`],
      });
      product = productRes?.data ?? null;
    } catch {
      product = null;
    }
  }

  const title =
    product?.title ||
    "SX21 ওয়্যারলেস ম্যাজিক মাইক্রোফোন (ANC + ইকো মোড) — মাত্র ১০০০ টাকার মধ্যে সেরা মাইক | TechMela";
  const description =
    product?.shortDescription ||
    "সীমিত বাজেটে মোবাইল দিয়ে ভিডিও কনটেন্ট তৈরির সেরা সমাধান SX21 ওয়্যারলেস ম্যাজিক মাইক্রোফোন। এতে রয়েছে ANC নয়েজ কাট ও ইকো মোড। মাদ্রাসা শিক্ষার্থী, ইমাম, শিক্ষক ও ভ্লগারদের এক নম্বর পছন্দ।";

  const imageUrl =
    getImageSrc(product?.thumbnail?.src || product?.gallery?.[0]?.src) ||
    "/images/sx21-microphone.jpg";

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
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Fallback shipping charges if API is unreachable
const DEFAULT_SHIPPING_CHARGES: TShippingCharges[] = [
  { _id: "inside-dhaka", name: "ঢাকার ভিতরে (হোম ডেলিভারি)", amount: 70 },
  { _id: "outside-dhaka", name: "ঢাকার বাইরে (কুরিয়ার হোম ডেলিভারি)", amount: 130 },
];

// Fallback payment method (Cash on delivery) if API is unreachable
const DEFAULT_PAYMENT_METHODS: TPaymentMethod[] = [
  {
    _id: "cod",
    name: "ক্যাশ অন ডেলিভারি (Cash on Delivery)",
    logo: { _id: "cod-logo", src: "", alt: "ক্যাশ অন ডেলিভারি" },
    description: "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন",
    isPaymentDetailsNeeded: false,
  },
];

const SX21MicrophonePage = async () => {
  const promises: [
    Promise<{ data?: TSingleProduct } | null>,
    Promise<{ data?: TShippingCharges[] } | null>,
    Promise<{ data?: TPaymentMethod[] } | null>
  ] = [
    SX21_PRODUCT_ID
      ? serverSideFetcher<TSingleProduct>({
          url: `/products/${SX21_PRODUCT_ID}`,
          tags: [`product-${decodeURIComponent(SX21_PRODUCT_ID)}`],
        }).catch(() => null)
      : Promise.resolve(null),
    serverSideFetcher<TShippingCharges[]>({
      url: "/shipping-charges?isActive=true",
      tags: ["shippingCharge"],
    }).catch(() => null),
    serverSideFetcher<TPaymentMethod[]>({
      url: "/payment-method?isActive=true",
      tags: ["paymentMethod"],
    }).catch(() => null),
  ];

  const [productRes, shippingRes, paymentRes] = await Promise.all(promises);

  const product = productRes?.data ?? null;
  const shippingCharges =
    shippingRes?.data && shippingRes.data.length > 0
      ? shippingRes.data
      : DEFAULT_SHIPPING_CHARGES;
  const paymentMethods =
    paymentRes?.data && paymentRes.data.length > 0
      ? paymentRes.data
      : DEFAULT_PAYMENT_METHODS;

  return (
    <SX21LandingClient
      product={product}
      shippingCharges={shippingCharges}
      paymentMethods={paymentMethods}
      fallbackRegularPrice={1030}
      fallbackSalePrice={890}
      defaultThumbnail="/images/sx21-microphone.jpg"
    />
  );
};

export default SX21MicrophonePage;
