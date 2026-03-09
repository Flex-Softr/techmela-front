// ! footer-1
import ContainerMax from "@/components/containerMax/ContainerMax";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaUsers, FaWhatsapp, FaYoutube } from "react-icons/fa";

const companyLinks = [
  { name: "শপ", url: "/shop" },
  { name: "আমাদের সম্পর্কে", url: "/about-us" },
  { name: "যোগাযোগ করুন", url: "/contact-us" },
  { name: "বিপণন কেন্দ্র", url: "/store-location" },
];

const customerCareLinks = [
  { name: "অর্ডার ট্র্যাকিং", url: "/track-your-order" },
  // { name: "warranty claim", url: "/warranty/claim-your-warranty" },
  { name: "ওয়ারেন্টি ক্লেম", url: "/warranty/find-your-product" },
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
              <div className="bg-white rounded-md">
                <Image
                  src="/images/logo/Logo.png"
                  alt="কোম্পানি লোগো"
                  width={150}
                  height={50}
                  className="w-28 h-[46.67px] md:w-36 md:h-[60px] rounded-md"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm font-medium leading-relaxed text-primary-foreground/80">
              ❝সিদ্দীকিয়া প্রকাশনী❞ ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের
              একটি প্রকাশনা প্রতিষ্ঠান। আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক
              গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2.5">প্রয়োজনীয় লিঙ্ক</h3>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium hover:text-primary-foreground transition-colors text-primary-foreground/80"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="font-bold text-lg mb-2.5">কাস্টমার কেয়ার</h3>
            <ul className="space-y-1">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium hover:text-primary-foreground transition-colors text-primary-foreground/80"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-2.5">যোগাযোগ</h3>
            <div className="space-y-2">
              <a
                href="tel:+8801602431167"
                className="flex items-center gap-1 text-sm font-medium hover:text-primary-foreground transition-colors text-primary-foreground/80"
              >
                <Phone className="size-4" />
                +8801602-431167
              </a>
              <a
                href="mailto:md.faridhanafi@gmail.com"
                className="flex items-center gap-1 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="size-4" />
                md.faridhanafi@gmail.com
              </a>
              <div className="flex items-start gap-1 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <MapPin className="size-4 mt-1 shrink-0" />
                <span>
                  সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
                </span>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/siddikiyaprokashoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all font-bold"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.facebook.com/groups/548576081614946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all font-bold"
                >
                  <FaUsers size={20} />
                </a>
                <a
                  href="http://wa.me/8801602431167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all font-bold"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="https://youtube.com/@dmkbofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all font-bold"
                >
                  <FaYoutube size={20} />
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
