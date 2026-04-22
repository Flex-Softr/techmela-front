"use client";
import logo from "@/../public/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";

type Props = {
  onOrderClick: () => void;
};

const SalesHeader = ({ onOrderClick }: Props) => {
  return (
    <header className="bg-white py-2 shadow-sm flex items-center justify-between sticky top-0 z-50 border-b border-gray-100 px-4 lg:px-10 font-bengali">
      <Link href="/">
        <Image
          src={logo}
          alt="Siddikia Prokashoni"
          width={140}
          height={38}
          className="object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="tel:+8801339955155"
          className="hidden sm:flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-bold text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          <MdCall className="text-lg" />
          <span>০১৩৩৯-৯৫৫১৫৫</span>
        </a>

        <a
          href="https://wa.me/8801339955155"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-500 text-white p-2 sm:px-3 sm:py-1.5 rounded-full shadow-md hover:bg-green-600 transition-all active:scale-95"
          title="WhatsApp"
        >
          <FaWhatsapp className="text-xl sm:text-lg" />
          <span className="hidden sm:inline ml-1.5 font-bold text-sm">
            হোয়াটসঅ্যাপ
          </span>
        </a>

        <button
          onClick={onOrderClick}
          className="bg-primary text-white text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95 animate-pulse-gentle whitespace-nowrap"
        >
          অর্ডার করুন
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-gentle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s infinite ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default SalesHeader;
