"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdCall } from "react-icons/md";

const announcements = [
  "ইনশাআল্লাহ ৩ দিনের মধ্যে সারা দেশে দ্রুত ডেলিভারি",
  "সহজ ও ঝামেলামুক্ত রিটার্ন পলিসি",
];

const TopHeader = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const links = [
    {
      href: "/shop",
      name: "সব পণ্য",
      icon: <FaBagShopping className="size-4" />,
    },
  ];

  return (
    <div className="bg-[#061830] text-white/90 border-b border-white/10 hidden md:block">
      <div className="flex justify-between items-center xl:px-10 py-1 h-9 container">
        {/* Left: Contact Info */}
        <div className="flex gap-3 items-center flex-1">
          <a
            href="tel:+8801744675030"
            className="flex gap-1.5 items-center text-[13px] hover:text-white transition-all underline-offset-4 hover:underline"
          >
            <MdCall className="size-4 text-emerald-300" />
            <span>+8801744675030</span>
          </a>

          <span className="text-white/20">|</span>

          <a
            href="https://wa.me/8801772065894"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1.5 items-center text-[13px] hover:text-white transition-all underline-offset-4 hover:underline"
          >
            <FaWhatsapp className="size-4 text-emerald-300" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Center: Announcement Ticker */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-full relative">
          {announcements.map((text, index) => (
            <p
              key={index}
              className={`absolute text-[13px] font-medium text-white/95 transition-all duration-700 ease-in-out whitespace-nowrap ${
                index === currentAnnouncement
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Right: Quick Links */}
        <div className="flex gap-3 items-center flex-1 justify-end">
          {links.map((link, index) => (
            <Fragment key={index}>
              <Link
                href={link.href}
                className="flex gap-1.5 items-center text-[13px] text-white/90 hover:text-white transition-all underline-offset-4 hover:underline"
              >
                {link.icon}
                {link.name}
              </Link>
              {index !== links.length - 1 ? (
                <span className="text-white/20">|</span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
