import Image from "next/image";
import logo from "../../public/logo/logo.png";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white space-y-6">
      {/* Logo-like Branding */}
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="Siddikiya Prokashoni Logo"
          width={100}
          height={100}
        />
      </div>
      <h1 className="xms:text-lg xls:text-xl sm:text-2xl md:text-4xl text-gray-700">
        সিদ্দীকিয়া প্রকাশনীতে স্বাগতম
      </h1>
      {/* Animated shimmer bar */}
      <div className="relative w-64 h-2 overflow-hidden rounded bg-gray-200">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent shimmer-bounce" />
      </div>
    </div>
  );
};

export default Loading;
