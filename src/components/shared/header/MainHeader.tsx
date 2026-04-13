import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../../../public/logo/logo.png";
import CartLinksAndAccount from "./components/CartLinksAndAccount";
import MobileMenuFetcher from "./components/MobileMenuFetcher";
import Search from "./components/Search";

const MainHeader = () => {
  return (
    <div className="flex gap-2 justify-between items-center px-4 lg:px-8 py-1 max-w-6xl mx-auto">
      <div className="order-2 lg:order-1 flex-shrink-0 transition-all duration-300 hover:scale-[1.05]">
        <Link href="/">
          <Image
            src={logo}
            alt="Siddikiya Prokashoni Logo"
            width={160}
            height={44}
            className="object-contain scale-[1.1]"
            priority
          />
        </Link>
      </div>
      <div className="block md:hidden">
        <Suspense
          fallback={
            <Button variant={"outline"} className="size-10 rounded-full">
              <FaBars className="animate-pulse opacity-50" />
            </Button>
          }
        >
          <MobileMenuFetcher />
        </Suspense>
      </div>
      <div className="flex-grow hidden lg:block lg:order-3 max-w-xl">
        <Search />
      </div>
      <div className="flex items-center order-3 lg:order-4  flex-grow-0 justify-end">
        <CartLinksAndAccount />
      </div>
    </div>
  );
};

export default MainHeader;
