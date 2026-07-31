import InitGTM from "@/components/GTM/InitGTM";
import PageTracking from "@/components/GTM/PageTracking";
import JsonLd from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/const/site.const";
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
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `${SITE.nameBn} | ${SITE.taglineBn}`,
    template: `%s | ${SITE.nameBn}`,
  },
  description: `${SITE.descriptionBn} ❝${SITE.mottoBn}❞`,
  keywords: [
    SITE.nameBn,
    "কসমেটিক্স",
    "Cosmetics Bangladesh",
    "Bangla Cosmetics",
    "স্কিনকেয়ার",
    "মেকআপ",
    "হেয়ারকেয়ার",
    SITE.nameEn,
    "অনলাইন কসমেটিক্স শপ",
  ].join(", "),
  openGraph: {
    title: `${SITE.nameBn} | ${SITE.taglineBn}`,
    description: SITE.shortDescriptionBn,
    url: SITE.baseUrl,
    siteName: SITE.nameBn,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameBn} | ${SITE.taglineBn}`,
    description: SITE.shortDescriptionBn,
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
        <link rel="preconnect" href={SITE.apiUrl} />
        <link rel="dns-prefetch" href={SITE.apiUrl} />
      </head>
      <body
        className={`${hindSiliguri.variable} ${inter.className} ${inter.variable} antialiased`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "Store", "OnlineStore"],
            name: SITE.nameBn,
            description: SITE.descriptionBn,
            url: SITE.baseUrl,
            logo: `${SITE.baseUrl}${SITE.logoPath}`,
            image: `${SITE.baseUrl}${SITE.logoPath}`,
            telephone: SITE.phone,
            email: SITE.email,
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
              telephone: SITE.phone,
              email: SITE.email,
              contactType: "customer service",
            },
            sameAs: [
              SITE.social.facebook,
              SITE.social.youtube,
              SITE.social.instagram,
              SITE.social.tiktok,
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
