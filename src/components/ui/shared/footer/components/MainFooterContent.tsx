// ! footer-1
import ContainerMax from "@/components/containerMax/ContainerMax";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const companyLinks = [
  { name: "Home", url: "/" },
  { name: "Shop", url: "/shop" },
  { name: "About us", url: "/about-us" },
  { name: "Portfolio", url: "/portfolio" }, // Added to match design structure
];

const resourceLinks = [
  { name: "Blog", url: "/blog" },
  { name: "Contact us", url: "/contact-us" },
  { name: "Privacy policy", url: "/privacy-policy" },
  { name: "Terms & conditions", url: "/terms" },
];

const MainFooterContent = () => {
  return (
    <div className="bg-white py-5 md:py-7 border-t text-gray-600">
      <ContainerMax>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div className="space-y-2">
            <Link href="/">
              <Image
                src="/images/logo/logo.jpg"
                alt="Company logo"
                width={150}
                height={50}
                className="w-28 h-[46.67px] md:w-36 md:h-[60px] rounded-md"
                priority
              />
            </Link>
            <p className="text-sm font-medium font-muted-foreground leading-relaxed">
              Powering modern businesses with scalable cloud software and robust
              SaaS architecture built for performance and agility.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-2.5">Company</h3>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-2.5">Resources</h3>
            <ul className="space-y-1">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-2.5">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:noralifestyle@gmail.com"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="size-4" />
                noralifestyle@gmail.com
              </a>
              <a
                href="tel:+8801722222222"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="size-4" />
                +8801722222222
              </a>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="text-primary hover:scale-110 transition-transform"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="#"
                  className="text-primary hover:scale-110 transition-transform"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="#"
                  className="text-primary hover:scale-110 transition-transform"
                >
                  <FaGithub size={20} />
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
