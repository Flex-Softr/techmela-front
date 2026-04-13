import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo/logo.png";
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
              <div className="bg-white rounded-md">
                <Image
                  src={logo}
                  alt="Siddikiya Prokashoni Logo"
                  width={150}
                  height={50}
                  className="w-28 h-auto md:w-36 rounded-md"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm font-medium leading-relaxed text-primary">
              ❝সিদ্দীকিয়া প্রকাশনী❞ ঐতিহ্যবাহী দারুননাজাত মাদরাসা কিতাব বিভাগের
              একটি প্রকাশনা প্রতিষ্ঠান। আহলে সুন্নাত ওয়াল জামাআতের আকিদা ভিত্তিক
              গবেষণামূলক ও মানসম্পন্ন গ্রন্থ প্রকাশে আমরা নিবেদিত।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-primary">
              প্রয়োজনীয় লিঙ্ক
            </h3>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium hover:text-primary transition-colors text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-primary">
              কাস্টমার কেয়ার
            </h3>
            <ul className="space-y-1">
              {customerCareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm font-medium hover:text-primary transition-colors text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-2.5 text-primary">যোগাযোগ</h3>
            <div className="space-y-2.5">
              <a
                href="tel:+8801602431167"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors text-primary"
              >
                <Phone className="size-4 text-primary" />
                ০১৬০২-৪৩১১৬৭
              </a>
              <a
                href="mailto:md.faridhanafi@gmail.com"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary transition-colors"
              >
                <Mail className="size-4 text-primary" />
                md.faridhanafi@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm font-medium text-primary">
                <MapPin className="size-4 mt-1 shrink-0 text-primary" />
                <span>
                  সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
                </span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/siddikiyaprokashoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-2.5 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="https://www.facebook.com/groups/548576081614946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-2.5 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <FaUsers size={18} />
                </a>
                <a
                  href="http://wa.me/8801602431167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-2.5 rounded-full text-green-600 hover:bg-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href="https://youtube.com/@dmkbofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 p-2.5 rounded-full text-red-600 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
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
