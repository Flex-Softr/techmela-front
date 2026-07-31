import JsonLd from "@/components/shared/JsonLd";
import { SITE } from "@/const/site.const";
import { Metadata } from "next";
import Image from "next/image";
import {
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "যোগাযোগ করুন",
  description: `${SITE.nameBn}র সাথে যোগাযোগ করুন। আপনার যেকোনো জিজ্ঞাসা, পরামর্শ বা সহায়তার জন্য আমরা সর্বদা প্রস্তুত। আমাদের ঠিকানা, ফোন নম্বর এবং ইমেল এখানে পাবেন।`,
  keywords: [
    `যোগাযোগ ${SITE.nameBn}`,
    "ShajGhor Contact",
    "Cosmetics Shop Phone Number",
    "ShajGhor Address",
  ].join(", "),
  alternates: {
    canonical: `${SITE.baseUrl}/contact-us`,
  },
};

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-muted/50 font-hind-siliguri">
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
              name: "যোগাযোগ",
              item: `${SITE.baseUrl}/contact-us`,
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
              name: "সরাসরি পণ্য কেনার জন্য শো-রুম কোথায়?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "আমাদের শো-রুম ঢাকার বক্সনগর, সারুলিয়া, ডেমরা এলাকায় অবস্থিত। বিস্তারিত ঠিকানার জন্য স্টোর লোকেশন পেজ দেখুন।",
              },
            },
            {
              "@type": "Question",
              name: "আপনাদের হেল্পলাইন নম্বর কত?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "আমাদের হেল্পলাইন নম্বর হলো 01710020030 এবং 01710020030। যেকোনো প্রয়োজনে আমাদের কল করতে পারেন।",
              },
            },
          ],
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary font-hind-siliguri">
        {/* New Generated Brand Image with Overlay */}
        <Image
          src="/images/contact_hero_new.webp"
          alt="যোগাযোগ করুন"
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
            যোগাযোগ করুন
          </h1>
          <div className="h-1.5 w-24 bg-background/30 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            আপনার যেকোনো জিজ্ঞাসা বা পরামর্শ আমাদের জানান। আমরা আপনার সেবায়
            সর্বদা নিয়োজিত।
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Side: Contact Info */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground border-l-4 border-primary pl-4">
                  তথ্য ও সহযোগিতা
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {SITE.nameBn} আপনার সৌন্দর্যচর্চার অভিজ্ঞতাকে সমৃদ্ধ করতে
                  প্রতিশ্রুতিবদ্ধ। যেকোনো প্রয়োজনে নির্দ্বিধায় আমাদের সাথে
                  যোগাযোগ করুন।
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <FaPhoneAlt className="text-xl text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                      ফোন
                    </h4>
                    <p className="text-xl font-bold text-foreground">
                      01710020030, 01710020030
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      সকাল ১০টা - রাত ১০টা (২৪/৭ সেবা)
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-xl text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                      ইমেল
                    </h4>
                    <p className="text-lg font-bold text-foreground break-all">
                      {SITE.email}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      অনলাইন সাপোর্ট
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-xl text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                      ঠিকানা
                    </h4>
                    <p className="text-foreground font-bold leading-relaxed">
                      সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="pt-8 space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত হোন
                </h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={SITE.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1 shadow-sm"
                    aria-label="Facebook Page"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a
                    href={`https://wa.me/${SITE.phone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center hover:bg-success hover:text-success-foreground transition-all transform hover:-translate-y-1 shadow-sm"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-2xl" />
                  </a>
                  <a
                    href="https://www.facebook.com/groups/548576081614946"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1 shadow-sm"
                    aria-label="Facebook Group"
                  >
                    <FaUsers className="text-2xl" />
                  </a>
                  <a
                    href={SITE.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-all transform hover:-translate-y-1 shadow-sm"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section (Optional, using the one from store-location) */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-border h-[400px]">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9931714529966!2d90.48777747362271!3d23.711937890255083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b70009c04db1%3A0x814b3a09778a03cf!2sSurmela%20bari!5e0!3m2!1sen!2sbd!4v1773033356114!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
              title="Google Map - ShajGhor"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
