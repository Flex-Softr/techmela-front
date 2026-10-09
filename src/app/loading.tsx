import Image from "next/image";
import logo from "../../public/logo/techmela-lightlogo.png";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background space-y-6">
      {/* Logo-like Branding */}
      <div className="flex items-center space-x-2 bg-[rgba(9,33,67,1)] px-4 py-2 rounded-xl shadow-md">
        <Image src={logo} alt="TechMela Logo" width={160} height={48} className="h-10 w-auto" />
      </div>
      <h1 className="xms:text-lg xls:text-xl sm:text-2xl md:text-4xl text-foreground font-semibold">
        Welcome to TechMela
      </h1>
      {/* Animated shimmer bar */}
      <div className="relative w-64 h-2 overflow-hidden rounded bg-muted">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent shimmer-bounce" />
      </div>
    </div>
  );
};

export default Loading;
