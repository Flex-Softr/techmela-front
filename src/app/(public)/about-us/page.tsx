import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaArrowRight,
  FaAward,
  FaGlobe,
  FaHandsHelping,
  FaLightbulb,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: `${SITE.nameBn} বাংলাদেশের একটি নির্ভরযোগ্য অনলাইন কসমেটিক্স ব্র্যান্ড। মানসম্পন্ন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম ও বিউটি অ্যাক্সেসরিজ সরবরাহে আমরা নিবেদিত।`,
  keywords: [
    SITE.nameBn,
    "কসমেটিক্স ব্র্যান্ড বাংলাদেশ",
    "বিউটি প্রোডাক্ট শপ",
    "About ShajGhor",
    "Cosmetics Brand Bangladesh",
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/about-us`,
  },
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 font-hind-siliguri">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "হোম",
              item: SITE.baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "আমাদের সম্পর্কে",
              item: `${SITE.baseUrl}/about-us`,
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `${SITE.nameBn} কোন ধরনের পণ্য বিক্রি করে?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${SITE.nameBn} মানসম্পন্ন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম ও বিউটি অ্যাক্সেসরিজ বিক্রি করে।`,
              },
            },
            {
              "@type": "Question",
              name: `${SITE.nameBn}র পণ্যগুলো কি অথেনটিক?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `হ্যাঁ, ${SITE.nameBn} শুধুমাত্র নির্ভরযোগ্য উৎস থেকে সংগ্রহীত অথেনটিক ও মানসম্পন্ন কসমেটিক্স পণ্য সরবরাহ করে।`,
              },
            },
          ],
        }}
      />
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary mb-12">
        {/* Bespoke Brand Image with Overlay */}
        <Image
          src="/images/about_hero_new.webp"
          alt="আমাদের সম্পর্কে"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Subtle Decorative Background Pattern/Gradient */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4 tracking-tight">
            আমাদের সম্পর্কে
          </h1>
          <div className="h-1.5 w-24 bg-background/30 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            {SITE.mottoBn}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-16">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about_journey_new.webp"
                alt={`${SITE.nameBn}র যাত্রা`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের যাত্রা
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                নির্ভেজাল সৌন্দর্য <br />
                <span className="text-primary">সবার কাছে পৌঁছে দেয়া</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                {SITE.nameBn} বাংলাদেশের কসমেটিক্স ও বিউটি ইন্ডাস্ট্রির একটি
                নির্ভরযোগ্য নাম। আমাদের লক্ষ্য হলো অথেনটিক ও মানসম্পন্ন
                স্কিনকেয়ার, মেকআপ ও বিউটি প্রোডাক্ট সহজলভ্য করা এবং প্রতিটি
                গ্রাহকের সৌন্দর্যচর্চাকে নিরাপদ ও আনন্দময় করে তোলা।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের কথা
              </h2>
              <p className="text-2xl md:text-4xl font-light leading-tight text-foreground">
                গ্রাহকের আস্থাকে সবচেয়ে বেশি গুরুত্ব দিয়ে{" "}
                <span className="text-primary font-medium">মানসম্পন্ন</span> ও
                অথেনটিক পণ্য সরবরাহে নিবেদিত।
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  প্রতিটি গ্রাহকের কাছে সাশ্রয়ী মূল্যে অথেনটিক কসমেটিক্স ও
                  বিউটি প্রোডাক্ট পৌঁছে দেওয়াই আমাদের মূল উদ্দেশ্য।
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">
                  বিশুদ্ধতা ও নির্ভরযোগ্যতা
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  নির্ভরযোগ্য উৎস থেকে সংগ্রহ করে আমরা বিশুদ্ধ ও মানসম্মত
                  কসমেটিক্স পণ্য সরবরাহ করে আসছি।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-8 md:py-12 bg-muted/10 border-y border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaGlobe className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  বিশুদ্ধতা
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  আমরা ত্বক ও চুলের জন্য নিরাপদ ও মানসম্পন্ন উপাদানযুক্ত পণ্য
                  নির্বাচনে আপোষহীন।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaAward className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  গুণগত মান
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  বিশেষজ্ঞদের যাচাই-বাছাইয়ে আমাদের প্রতিটি পণ্য নির্বাচিত হয়।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaHandsHelping className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  আস্থা
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  গ্রাহকের আস্থা অর্জন ও ধরে রাখাই আমাদের ব্যবসার মূল ভিত্তি।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaLightbulb className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  উৎকর্ষ
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  আধুনিক প্যাকেজিং ও নিরাপদ ডেলিভারিতে মানসম্মত সেবা নিশ্চিত
                  করাই আমাদের লক্ষ্য।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero CTA */}
      <section className="py-8 md:pb-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-10 tracking-tight">
            সৌন্দর্যের যাত্রায় আমাদের{" "}
            <span className="text-primary font-semibold underline decoration-primary/20 underline-offset-8">
              সঙ্গী হোন
            </span>
          </h2>
          <Link
            href="/shop"
            className="group relative inline-flex items-center bg-primary px-14 py-4 text-primary-foreground transition-all hover:bg-foreground rounded-full shadow-lg shadow-primary/20 hover:shadow-none"
          >
            <span className="text-sm font-black tracking-widest ">
              পণ্যগুলো দেখুন
            </span>
            <FaArrowRight className="ml-4 text-sm transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
