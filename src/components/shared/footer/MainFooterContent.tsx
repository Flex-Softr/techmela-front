import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { SITE } from "@/const/site.const";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaUsers, FaWhatsapp, FaYoutube } from "react-icons/fa";
import logo from "../../../../public/logo/logo.webp";

const companyLinks = [
  { name: "All Products", url: "/shop" },
  { name: "About Us", url: "/about-us" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "Store Location", url: "/store-location" },
];

const customerCareLinks = [
  { name: "Order Tracking", url: "/track-your-order" },
  // { name: "warranty claim", url: "/warranty/claim-your-warranty" },
  // { name: "Warranty Claim", url: "/warranty/find-your-product" },
  { name: "My Account", url: "/my-account" },
  { name: "Delivery Policy", url: "/delivery-policy" },
  { name: "Return Policy", url: "/return-policy" },
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
              ❝ShajGhor❞ is a trusted online cosmetics shop in Bangladesh. We
              are dedicated to providing quality skincare, makeup, haircare,
              perfume, and beauty accessories.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-foreground">
              Useful Links
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
              Customer Care
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
              Contact
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
                  Surmela Goli, East Boxnagar, Sarulia, Demra, Dhaka-1361
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
                  href="https://www.facebook.com"
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
