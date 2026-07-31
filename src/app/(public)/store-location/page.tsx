import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";
import Image from "next/image";
import {
  FaFacebook,
  FaHeadset,
  FaMapMarkerAlt,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "স্টোর লোকেশন",
  description: `${SITE.nameBn}র শোরুমের ঠিকানা এবং ম্যাপ লোকেশন। সরাসরি আমাদের শোরুম থেকে প্রিয় কসমেটিক্স ও বিউটি পণ্যগুলো সংগ্রহ করতে ডেমরা, ঢাকাস্থ আমাদের লোকেশনে চলে আসুন।`,
  keywords: [
    `${SITE.nameBn} শোরুম`,
    "Store Location ShajGhor",
    "Demra Cosmetics Shop",
    "বক্সনগর সারুলিয়া ডেমরা ঢাকা",
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/store-location`,
  },
};

const StoreLocationPage = () => {
  return (
    <div className="min-h-screen bg-muted/30 font-hind-siliguri">
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
              name: "স্টোর লোকেশন",
              item: `${SITE.baseUrl}/store-location`,
            },
          ],
        }}
      />
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Custom Brand Image with Overlay */}
        <Image
          src="/images/store_hero_new.webp"
          alt="স্টোর লোকেশন"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4 tracking-tight">
            স্টোর লোকেশন
          </h1>
          <div className="h-1.5 w-24 bg-background/30 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            {SITE.nameBn}র পণ্য সরাসরি সংগ্রহ করতে আমাদের ঠিকানায় চলে আসুন।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left side: Map Section */}
            <div className="lg:w-7/12 relative">
              <div className="bg-background rounded-[2.5rem] shadow-2xl shadow-foreground/5 border border-white overflow-hidden group">
                <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative">
                  <iframe
                    className="w-full h-full grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9931714529966!2d90.48777747362271!3d23.711937890255083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b70009c04db1%3A0x814b3a09778a03cf!2sSurmela%20bari!5e0!3m2!1sen!2sbd!4v1773033356114!5m2!1sen!2sbd"
                    allowFullScreen
                    loading="lazy"
                    title="Google Map - ShajGhor"
                  ></iframe>
                </div>
              </div>

              {/* Decorative detail */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-3xl -z-10 blur-xl animate-pulse" />
            </div>

            {/* Right side: Store Info */}
            <div className="flex-1 lg:w-5/12">
              <div className="bg-background rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-foreground/5 border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                      <FaMapMarkerAlt size={22} />
                    </div>
                    <h2 className="text-3xl font-black text-foreground">
                      আমাদের ঠিকানা
                    </h2>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                        শোরুমের ঠিকানা
                      </p>
                      <p className="text-xl text-foreground leading-relaxed font-medium">
                        সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
                      </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-border via-muted to-border" />

                    <div>
                      <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                        হেল্পলাইন
                      </p>
                      <div className="space-y-4">
                        <a
                          href="tel:+01710020030"
                          className="inline-flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <FaHeadset size={22} />
                          </div>
                          <span className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                            01710020030
                          </span>
                        </a>
                        <a
                          href="tel:+8801718634508"
                          className="inline-flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 bg-success/10 rounded-2xl flex items-center justify-center text-success transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <FaHeadset size={22} />
                          </div>
                          <span className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                            01710020030
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">
                        সোশ্যাল মিডিয়া
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {[
                          {
                            href: SITE.social.facebook,
                            icon: FaFacebook,
                            color: "text-primary",
                            bg: "bg-primary/10",
                          },
                          {
                            href: `https://wa.me/${SITE.phone.replace("+", "")}`,
                            icon: FaWhatsapp,
                            color: "text-success",
                            bg: "bg-success/10",
                          },
                          {
                            href: "https://www.facebook.com/groups/548576081614946",
                            icon: FaUsers,
                            color: "text-primary",
                            bg: "bg-primary/10",
                          },
                          {
                            href: SITE.social.youtube,
                            icon: FaYoutube,
                            color: "text-destructive",
                            bg: "bg-destructive/10",
                          },
                        ].map((social, idx) => (
                          <a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 ${social.bg} ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                            aria-label="Social Link"
                          >
                            <social.icon size={22} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreLocationPage;
