import InitGTM from "@/components/GTM/InitGTM";
import PageTracking from "@/components/GTM/PageTracking";
import JsonLd from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/const/site.const";
import StoreProvider from "@/redux/StoreProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `${SITE.nameEn} | ${SITE.taglineBn}`,
    template: `%s | ${SITE.nameEn}`,
  },
  description: `${SITE.descriptionBn} "${SITE.mottoBn}"`,
  keywords: [
    SITE.nameEn,
    "Cosmetics",
    "Cosmetics Bangladesh",
    "Skincare",
    "Makeup",
    "Haircare",
    "Online Cosmetics Shop",
    "Beauty Products",
  ].join(", "),
  openGraph: {
    title: `${SITE.nameEn} | ${SITE.taglineBn}`,
    description: SITE.shortDescriptionBn,
    url: SITE.baseUrl,
    siteName: SITE.nameEn,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameEn} | ${SITE.taglineBn}`,
    description: SITE.shortDescriptionBn,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={SITE.apiUrl} />
        <link rel="dns-prefetch" href={SITE.apiUrl} />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "Store", "OnlineStore"],
            name: SITE.nameEn,
            description: SITE.descriptionBn,
            url: SITE.baseUrl,
            logo: `${SITE.baseUrl}${SITE.logoPath}`,
            image: `${SITE.baseUrl}${SITE.logoPath}`,
            telephone: SITE.phone,
            email: SITE.email,
            priceRange: "$$",
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
