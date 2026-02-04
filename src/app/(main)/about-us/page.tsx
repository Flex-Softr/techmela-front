import Link from "next/link";
import React from "react";
import {
  FaArrowRight,
  FaAward,
  FaGlobe,
  FaHandsHelping,
  FaLightbulb,
} from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/10">
      {/* Consolidated Hero & Story Section */}
      <section className="pt-8 pb-16 md:pt-16 md:pb-20 border-b border-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight mb-4 text-gray-900">
              Nora <span className="font-bold text-primary">Life Style</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light italic max-w-3xl mx-auto leading-relaxed">
              &quot;Elevating your everyday journey through thoughtful design
              and uncompromising comfort.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-[0.4em] text-primary font-black">
                Our Story
              </h2>
              <p className="text-2xl md:text-4xl font-light leading-tight text-gray-900">
                Born from a passion for{" "}
                <span className="text-primary font-medium">style</span> and
                substance, we bridge contemporary fashion with daily
                functionality for the modern individual.
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-4">
                  Modern Aesthetics
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  Timeless silhouettes that remain relevant through every
                  season.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-primary pl-4">
                  Comfort-Driven
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  Every step should be effortless. Engineered for breathability
                  and daily ease.
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
                  Sourcing
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  We meticulously select the finest materials from reputable
                  global sources, ensuring that every component meets our
                  uncompromising standards for durability and premium feel.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaAward className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  Quality
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Quality is our signature. Each product undergoes multiple
                  stages of rigorous elite standard checks to ensure it delivers
                  the excellence you deserve.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaHandsHelping className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  Ethical
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  We are committed to mindful eco-practices and fair standards,
                  minimizing our environmental footprint while supporting the
                  hands that help build our brand.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-300">
              <FaLightbulb className="text-3xl text-primary mt-1 shrink-0" />
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-widest text-primary">
                  Craft
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  By constantly evolving our manufacturing techniques, we bridge
                  traditional craftsmanship with modern innovation to create
                  truly forward-thinking fashion.
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
            Step Into{" "}
            <span className="text-primary font-semibold underline decoration-primary/20 underline-offset-8">
              Excellence
            </span>
          </h2>
          <Link
            href="/shop"
            className="group relative inline-flex items-center bg-primary px-14 py-4 text-white transition-all hover:bg-gray-900 rounded-full shadow-lg shadow-primary/20 hover:shadow-none"
          >
            <span className="text-sm font-black tracking-widest font-mono">
              EXPLORE COLLECTION
            </span>
            <FaArrowRight className="ml-4 text-sm transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
