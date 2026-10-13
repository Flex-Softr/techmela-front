"use client";

import { SITE } from "@/const/site.const";
import Image from "next/image";
import { useEffect, useState } from "react";

const FloatingContact = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.pageYOffset || document.documentElement.scrollTop;

      // Bottom position detection
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollPos >= documentHeight - 120) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = SITE.phone.replace(/[^0-9]/g, "");

  return (
    <div
      className={`fixed right-[20px] ${
        isAtBottom ? "bottom-[60px]" : "bottom-[20px]"
      } flex items-center z-[1000] pointer-events-none transition-all duration-300`}
    >
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"
        className="size-[50px] rounded-full shadow-lg bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 pointer-events-auto z-50 group relative ring-2 ring-white/30"
      >
        <div className="relative w-7 h-7">
          <Image
            src="/images/social_icons/whatsapp.webp"
            alt="হোয়াটসঅ্যাপ"
            fill
            className="object-contain"
          />
        </div>

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-2.5 py-1 text-xs font-semibold bg-gray-900 text-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block">
          হোয়াটসঅ্যাপ
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
