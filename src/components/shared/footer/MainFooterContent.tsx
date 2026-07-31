import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { SITE } from "@/const/site.const";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaUsers, FaWhatsapp, FaYoutube } from "react-icons/fa";
import logo from "../../../../public/logo/logo.webp";

const companyLinks = [
  { name: "সকল পণ্য", url: "/shop" },
  { name: "আমাদের সম্পর্কে", url: "/about-us" },
  { name: "যোগাযোগ করুন", url: "/contact-us" },
  { name: "বিপণন কেন্দ্র", url: "/store-location" },
];

const customerCareLinks = [
  { name: "অর্ডার ট্র্যাকিং", url: "/track-your-order" },
  // { name: "warranty claim", url: "/warranty/claim-your-warranty" },
  // { name: "ওয়ারেন্টি ক্লেম", url: "/warranty/find-your-product" },
  { name: "আমার অ্যাকাউন্ট", url: "/my-account" },
  { name: "ডেলিভারি পলিসি", url: "/delivery-policy" },
  { name: "রিটার্ন পলিসি", url: "/return-policy" },
];

const MainFooterContent = () => {
  return (
    <div className="py-5 md:py-7 border-t">
      <ContainerMax>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-3">
          {/* Column 1: Logo & Description */}
          <div className="space-y-2">
            <Link href="/" className="flex">
              <div className="bg-background rounded-md">
                <Image
                  src={logo}
                  alt="ShajGhor Logo"
                  width={150}
                  height={50}
                  className="w-28 h-auto md:w-36 rounded-md"
                  sizes="(max-width: 768px) 112px, 144px"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm font-medium leading-relaxed text-foreground">
              ❝ShajGhor❞ বাংলাদেশের নির্ভরযোগ্য অনলাইন কসমেটিক্স শপ। আমরা
              মানসম্পন্ন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম ও বিউটি
              অ্যাক্সেসরিজ সরবরাহে নিবেদিত।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-foreground">
              প্রয়োজনীয় লিঙ্ক
            </h3>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-foreground">
              কাস্টমার কেয়ার
            </h3>
            <ul className="space-y-1">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-foreground">
              যোগাযোগ
            </h3>
            <div className="space-y-2.5">
              <a
                href="tel:+01710020030"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="size-4 text-foreground" />
                01710020030
              </a>
              <a
                href="mailto:support@shajghor.com"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="size-4 text-foreground" />
                support@shajghor.com
              </a>
              <div className="flex items-start gap-2 text-sm font-medium text-foreground">
                <MapPin className="size-4 mt-1 shrink-0 text-foreground" />
                <span>
                  সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
                </span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted p-2.5 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label="Facebook Page"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="https://www.facebook.com/groups/548576081614946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted p-2.5 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label="Facebook Group"
                >
                  <FaUsers size={18} />
                </a>
                <a
                  href="http://wa.me/01710020030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted p-2.5 rounded-full text-foreground hover:bg-success hover:text-success-foreground hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href={SITE.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted p-2.5 rounded-full text-foreground hover:bg-destructive hover:text-destructive-foreground hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label="YouTube Channel"
                >
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContainerMax>
    </div>
  );
};

export default MainFooterContent;
