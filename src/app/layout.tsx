import InitGTM from "@/components/GTM/InitGTM";
import JsonLd from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/redux/StoreProvider";
import "@smastrom/react-rating/style.css";
import { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://siddikiaprokashoni.com"),
  title: {
    default: "সিদ্দীকিয়া প্রকাশনী | সেরা ইসলামিক বইয়ের সমাহার",
    template: "%s | সিদ্দীকিয়া প্রকাশনী",
  },
  description:
    "❝সিদ্দীকিয়া প্রকাশনী❞ ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের একটি প্রকাশনা প্রতিষ্ঠান। আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত। ❝সততার পথে, দক্ষতার সাথে❞",
  keywords: [
    "সিদ্দীকিয়া প্রকাশনী",
    "ইসলামিক বই",
    "Islamic Books Bangladesh",
    "Bangla Islamic Kitab",
    "দারুননাজাত মাদরাসা কিতাব",
    "ইসলামিক বই কিনুন",
    "Siddikia Prokashoni",
    "অনলাইন বুক শপ",
  ].join(", "),
  openGraph: {
    title: "সিদ্দীকিয়া প্রকাশনী | সেরা ইসলামিক বইয়ের সমাহার",
    description:
      "আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত।",
    url: "https://siddikiaprokashoni.com",
    siteName: "সিদ্দীকিয়া প্রকাশনী",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "সিদ্দীকিয়া প্রকাশনী | সেরা ইসলামিক বইয়ের সমাহার",
    description:
      "আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত।",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://siddikiaprokashoni.com",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn-BD">
      <body
        className={`${hindSiliguri.variable} ${inter.className} ${inter.variable} antialiased`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "সিদ্দীকিয়া প্রকাশনী",
            url: "https://siddikiaprokashoni.com",
            logo: "https://siddikiaprokashoni.com/logo/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+8801602431167",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/SiddikiaProkashoni",
              // Add other social links if available
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "সিদ্দীকিয়া প্রকাশনী",
            url: "https://siddikiaprokashoni.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://siddikiaprokashoni.com/shop?searchTerm={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "হোম",
                item: "https://siddikiaprokashoni.com",
              },
            ],
          }}
        />
        <StoreProvider>
          <InitGTM />
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
