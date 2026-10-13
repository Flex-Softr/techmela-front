"use client";
import logo from "@/../public/logo/techmela-lightlogo.png";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";

type Props = {
  onOrderClick: () => void;
};

const SalesHeader = ({ onOrderClick }: Props) => {
  return (
    <header className="bg-[rgba(9,33,67,1)] text-white py-2 shadow-md flex items-center justify-between sticky top-0 z-50 border-b border-white/10 px-4 lg:px-10">
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          alt="TechMela"
          width={150}
          height={40}
          className="object-contain max-h-[38px] w-auto"
          priority
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="tel:+8801744675030"
          className="hidden sm:flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20 font-bold text-sm hover:bg-white/20 transition-all cursor-pointer"
        >
          <MdCall className="text-lg" />
          <span>+8801744675030</span>
        </a>

        <a
          href="https://wa.me/8801772065894"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white/15 text-white p-2 sm:px-3 sm:py-1.5 rounded-full border border-white/20 shadow-xs hover:bg-white/25 transition-all active:scale-95"
          title="WhatsApp"
        >
          <FaWhatsapp className="text-xl sm:text-lg text-emerald-300" />
          <span className="hidden sm:inline ml-1.5 font-bold text-sm">
            WhatsApp
          </span>
        </a>

        <button
          onClick={onOrderClick}
          className="bg-white text-primary text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold shadow-md hover:bg-white/90 transition-all active:scale-95 animate-pulse-gentle whitespace-nowrap"
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
