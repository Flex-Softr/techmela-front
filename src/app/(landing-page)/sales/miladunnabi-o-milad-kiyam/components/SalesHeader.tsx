"use client";
import Image from "next/image";
import Link from "next/link";
import { MdCall } from "react-icons/md";
import logo from "../../../../../../public/logo/logo.png";

type Props = {
  onOrderClick: () => void;
};

const SalesHeader = ({ onOrderClick }: Props) => {
  return (
    <header className="bg-white py-3 shadow-sm flex items-center justify-between sticky top-0 z-50 border-b border-gray-100 px-4 lg:px-10">
      <Link href="/">
        <Image
          src={logo}
          alt="Siddikia Prokashoni"
          width={160}
          height={44}
          className="object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-bold text-sm">
          <MdCall className="text-lg" />
          <span>০১৬০২-৪৩১১৬৭</span>
        </div>
        <button
          onClick={onOrderClick}
          className="bg-primary text-white text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 transition-transform active:scale-95"
        >
          অর্ডার করুন
        </button>
      </div>
    </header>
  );
};

export default SalesHeader;
