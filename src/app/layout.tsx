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
  weight: "400",
  variable: "--font-hind-siliguri",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Nora life style",
    template: "%s | Nora life style",
  },
  description: "Nora life style",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${hindSiliguri.variable} ${inter.className} ${inter.variable} antialiased`}
        >
          <InitGTM />
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
