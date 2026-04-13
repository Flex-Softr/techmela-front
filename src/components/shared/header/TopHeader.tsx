"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall, MdDeliveryDining } from "react-icons/md";

const announcements = [
  "২০০০ টাকার বেশি অর্ডার করলেই ফ্রি হোম ডেলিভারি ",
  "সারা বাংলাদেশে ৩ দিনের মধ্যে ডেলিভারি ইনশাআল্লাহ   ",
  "একদম সহজ রিটার্ন পলিসি  ",
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
      href: "/track-your-order",
      name: "অর্ডার ট্র্যাক করুন",
      icon: <MdDeliveryDining className="size-5" />,
    },
    {
      href: "/shop",
      name: "শপ",
      icon: <FaBagShopping className="size-4" />,
    },
  ];

  return (
    <div className="bg-accent text-primary hidden md:block">
      <div className="flex justify-between items-center xl:px-10 py-1 h-9 container">
        {/* Left: Contact Info */}
        <div className="flex gap-3 items-center flex-1">
          <a
            href="tel:+8801602431167"
            className="flex gap-1.5 items-center text-[13px] hover:text-primary transition-all underline-offset-4 hover:underline"
          >
            <MdCall className="size-4 text-primary" />
            <span>০১৬০২-৪৩১১৬৭</span>
          </a>

          <span className="text-primary/20">|</span>

          <a
            href="https://wa.me/8801602431167"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1.5 items-center text-[13px] hover:text-primary transition-all underline-offset-4 hover:underline"
          >
            <FaWhatsapp className="size-4 text-green-600" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>
        </div>

        {/* Center: Announcement Ticker */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-full relative">
          {announcements.map((text, index) => (
            <p
              key={index}
              className={`absolute text-[13px] font-bold text-primary transition-all duration-700 ease-in-out whitespace-nowrap ${
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
                className="flex gap-1.5 items-center text-[13px] hover:text-primary transition-all underline-offset-4 hover:underline"
              >
                {link.icon}
                {link.name}
              </Link>
              {index !== links.length - 1 ? (
                <span className="text-primary/20">|</span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
