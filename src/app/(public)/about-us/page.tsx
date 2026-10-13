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
  title: "আমাদের সম্পর্কে | TechMela",
  description: `${SITE.nameBn} বাংলাদেশের একটি বিশ্বস্ত গ্যাজেট ও টেক এক্সেসরিজ ব্র্যান্ড। আমরা গুণগত মানসম্পন্ন ও অথেনটিক প্রযুক্তি পণ্য সরবরাহ করি।`,
  keywords: [
    SITE.nameBn,
    "টেক শপ বাংলাদেশ",
    "স্মার্ট গ্যাজেট শপ",
    "About TechMela",
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/about-us`,
  },
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
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
              name: `${SITE.nameBn}-এ কী ধরণের পণ্য পাওয়া যায়?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${SITE.nameBn}-এ প্রিমিয়াম কোয়ালিটির গ্যাজেট, স্মার্ট এক্সেসরিজ ও প্রযুক্তি পণ্য পাওয়া যায়।`,
              },
            },
            {
              "@type": "Question",
              name: `${SITE.nameBn}-এর পণ্যগুলো কি অরিজিনাল?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `হ্যাঁ, ${SITE.nameBn} শুধুমাত্র অথেনটিক ও ব্র্যান্ডের আসল পণ্য সরবরাহ করে।`,
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
                alt={`${SITE.nameBn}-এর পথচলা`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের পথচলা
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                সেরা প্রযুক্তি ও গ্যাজেট <br />
                <span className="text-primary">পৌঁছে যাক সবার কাছে</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                {SITE.nameBn} বাংলাদেশের একটি আস্থার প্রতীক। আমাদের মূল লক্ষ্য হলো সেরা মানের অরিজিনাল টেক প্রোডাক্ট ও গ্যাজেট সবার কাছে পৌঁছে দেওয়া এবং গ্রাহকদের কেনাকাটাকে নিরাপদ ও নির্ভরযোগ্য রাখা।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের গল্প
              </h2>
              <p className="text-2xl md:text-4xl font-light leading-tight text-foreground">
                গ্রাহকের সন্তুষ্টি ও আস্থাই আমাদের মূল চালিকাশক্তি। আমরা সর্বদা{" "}
                <span className="text-primary font-medium">গুণগত মানসম্পন্ন</span> ও
                আসল পণ্য সরবরাহে অবিচল।
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  সবার জন্য সাশ্রয়ী মূল্যে অথেনটিক ও সেরা টেক গ্যাজেট নিশ্চিত করা।
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">
                  নির্ভরযোগ্যতা ও সততা
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  আমরা বিশ্বস্ত প্রস্তুতকারকদের থেকে পণ্য সংগ্রহ করি এবং শতভাগ যাচাই করে গ্রাহকের কাছে পৌঁছে দিই।
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
                  শতভাগ আসল
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  আমরা শুধুমাত্র অথেনটিক ও অফিসিয়াল পণ্য সরবরাহে অঙ্গীকারবদ্ধ।
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
                  প্রতিটি পণ্য দক্ষ টিম দ্বারা মান যাচাই করে স্টকে রাখা হয়।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaHandsHelping className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  গ্রাহকের আস্থা
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  গ্রাহকের সন্তুষ্টি ও ভালোবাসাই আমাদের ব্যবসার মূল ভিত।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-background hover:shadow-sm transition-all duration-300">
              <FaLightbulb className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  সেরা সেবা
                </h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  নিরাপদ প্যাকেজিং ও দ্রুততম ডেলিভারির মাধ্যমে নিরবচ্ছিন্ন সেবা।
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
            আপনার পছন্দের গ্যাজেট খুঁজে নিন{" "}
            <span className="text-primary font-semibold underline decoration-primary/20 underline-offset-8">
              আজই
            </span>
          </h2>
          <Link
            href="/shop"
            className="group relative inline-flex items-center bg-primary px-14 py-4 text-primary-foreground transition-all hover:bg-foreground rounded-full shadow-lg shadow-primary/20 hover:shadow-none"
          >
            <span className="text-sm font-black tracking-widest">
              পণ্যসমূহ দেখুন
            </span>
            <FaArrowRight className="ml-4 text-sm transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
