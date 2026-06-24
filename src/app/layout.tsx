import InitGTM from "@/components/GTM/InitGTM";
import PageTracking from "@/components/GTM/PageTracking";
import JsonLd from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/redux/StoreProvider";
import { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn-BD">
      <head>
        <link rel="preconnect" href="https://api.siddikiaprokashoni.com" />
        <link rel="dns-prefetch" href="https://api.siddikiaprokashoni.com" />
      </head>
      <body
        className={`${hindSiliguri.variable} ${inter.className} ${inter.variable} antialiased`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "BookStore", "OnlineStore"],
            name: "সিদ্দীকিয়া প্রকাশনী",
            description:
              "আহলুস সুন্নাহ ওয়াল জামাআহর আকীদা, ফিকহ, ইতিহাস, তাসাউফ, সীরাত ও গবেষণাধর্মী ইসলামী বই প্রকাশ ও বিক্রয়কারী প্রকাশনা প্রতিষ্ঠান।",
            url: "https://siddikiaprokashoni.com",
            logo: "https://siddikiaprokashoni.com/logo/logo.webp",
            image: "https://siddikiaprokashoni.com/logo/logo.webp",
            telephone: "+8801339955155",
            email: "siddikiyaprokashoni@gmail.com",
            priceRange: "৳৳",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+8801339955155",
              email: "siddikiyaprokashoni@gmail.com",
              contactType: "customer service",
            },
            sameAs: [
              "https://www.facebook.com/siddikiaprokashoni",
              "https://www.youtube.com/@SiddikiaProkashoni",
              "https://www.instagram.com/siddikiaprokashoni",
              "https://www.tiktok.com/@siddikiaprokashoni",
              // Add other social links if available
            ],
          }}
        />
        <StoreProvider>
          <InitGTM />
          <Suspense fallback={null}>
            <PageTracking />
          </Suspense>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
