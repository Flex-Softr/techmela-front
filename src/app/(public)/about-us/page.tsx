import JsonLd from "@/components/shared/JsonLd";
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
  description:
    "সিদ্দীকিয়া প্রকাশনী ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের একটি প্রকাশনা প্রতিষ্ঠান। আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত।",
  keywords: [
    "সিদ্দীকিয়া প্রকাশনী",
    "দারুননাজাত মাদ্রাসা",
    "ইসলামিক প্রকাশনী",
    "About Siddikia Prokashoni",
    "Islamic Publisher Bangladesh",
  ].join(", "),
  alternates: {
    canonical: "https://siddikiaprokashoni.com/about-us",
  },
};

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10 font-hind-siliguri">
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
            {
              "@type": "ListItem",
              position: 2,
              name: "আমাদের সম্পর্কে",
              item: "https://siddikiaprokashoni.com/about-us",
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
              name: "সিদ্দীকিয়া প্রকাশনী কোন ধরনের বই প্রকাশ করে?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "সিদ্দীকিয়া প্রকাশনী আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক গবেষণামূলক ইসলামিক বই, মাদরাসার কিতাব এবং দ্বীনি সাহিত্যের কিতাব প্রকাশ করে।",
              },
            },
            {
              "@type": "Question",
              name: "দারুননাজাত মাদরাসার সাথে সিদ্দীকিয়া প্রকাশনীর সম্পর্ক কী?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "সিদ্দীকিয়া প্রকাশনী ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের একটি প্রকাশনা প্রতিষ্ঠান।",
              },
            },
          ],
        }}
      />
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary mb-12">
        {/* Bespoke Brand Image with Overlay */}
        <Image
          src="/images/about_hero_new.png"
          alt="আমাদের সম্পর্কে"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Subtle Decorative Background Pattern/Gradient */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            আমাদের সম্পর্কে
          </h1>
          <div className="h-1.5 w-24 bg-white/30 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            ঐতিহ্যবাহী দারুননাজাত মাদ্রাসার কিতাব বিভাগের একটি প্রকাশনা
            প্রতিষ্ঠান।
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-16">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about_journey_new.png"
                alt="সিদ্দীকিয়া প্রকাশনীর যাত্রা"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের যাত্রা
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                বিশুদ্ধ দ্বীনি ইলম <br />
                <span className="text-primary">সবার কাছে পৌঁছে দেয়া</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                সিদ্দীকিয়া প্রকাশনী বাংলাদেশর ইসলামী ধারার নির্ভরযোগ্য একটি নাম।
                আমাদের লক্ষ্য হলো বিশুদ্ধ সুন্নী আক্বীদার কিতাবসমূহ সহজলভ্য করা
                এবং উম্মাহর সেবায় গবেষণালব্ধ ও নির্ভরযোগ্য পাণ্ডুলিপি উপহার
                দেয়া।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                আমাদের কথা
              </h2>
              <p className="text-2xl md:text-4xl font-light leading-tight text-gray-900">
                আহলে সুন্নাত ওয়াল জামাআতের আকিদার উপর ভিত্তি করে{" "}
                <span className="text-primary font-medium">মানসম্পন্ন</span> ও
                গবেষণামূলক গ্রন্থ প্রকাশে নিবেদিত।
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-4">
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  শতধা বিভক্ত উম্মাহকে ঐক্যবদ্ধ করা এবং তাদের মাঝে সম্প্রীতিবোধ
                  জাগিয়ে তোলা আমাদের মূল উদ্দেশ্য।
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-4">
                  বিশুদ্ধতা ও ঐতিহ্য
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  দীর্ঘদিন ধরে দারুননাজাত মাদ্রাসার সরাসরি তত্ত্বাবধানে আমরা
                  বিশুদ্ধ ও নির্ভরযোগ্য কিতাব সরবরাহ করে আসছি।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-8 md:py-12 bg-gray-50/10 border-y border-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaGlobe className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  বিশুদ্ধতা
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  আমরা কুরআন-সুন্নাহর সঠিক জ্ঞান ও বিশুদ্ধ আকিদা ভিত্তিক কিতাব
                  নির্বাচনে আপোষহীন।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaAward className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  গবেষণা
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  বিজ্ঞ ওলামায়ে কেরাম ও গবেষকদের নিরলস সাধনায় আমাদের প্রতিটি বই
                  তৈরি হয়।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaHandsHelping className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  ঐক্য
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  উম্মাহর সম্প্রীতি ও ঐক্য প্রতিষ্ঠায় আমাদের প্রকাশনাগুলো বিশেষ
                  ভূমিকা রাখে।
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaLightbulb className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  উৎকর্ষ
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  আধুনিক মুদ্রণ ও আকর্ষণীয় প্রচ্ছদে মানসম্মত প্রকাশনা নিশ্চিত
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
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 tracking-tight">
            জ্ঞানের আলো ছড়াতে আমাদের{" "}
            <span className="text-primary font-semibold underline decoration-primary/20 underline-offset-8">
              সঙ্গী হোন
            </span>
          </h2>
          <Link
            href="/shop"
            className="group relative inline-flex items-center bg-primary px-14 py-4 text-white transition-all hover:bg-gray-900 rounded-full shadow-lg shadow-primary/20 hover:shadow-none"
          >
            <span className="text-sm font-black tracking-widest ">
              বইগুলো দেখুন
            </span>
            <FaArrowRight className="ml-4 text-sm transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
