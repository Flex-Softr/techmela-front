import InitGTM from "@/components/GTM/InitGTM";
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
  title: {
    default: "সিদ্দীকিয়া প্রকাশনী",
    template: "%s - সিদ্দীকিয়া প্রকাশনী",
  },
  description:
    "❝সিদ্দীকিয়া প্রকাশনী❞ ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের একটি প্রকাশনা প্রতিষ্ঠান। আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত। ❝সততার পথে, দক্ষতার সাথে❞ 📞 01602-431167 (হোয়াটসঅ্যাপ বা সরাসরি)",
  keywords: "সিদ্দীকিয়া প্রকাশনী, সিদ্দীকিয়া প্রকাশনী, সিদ্দীকিয়া প্রকাশনী",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.variable} ${inter.className} ${inter.variable} antialiased`}
      >
        <StoreProvider>
          <InitGTM />
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
