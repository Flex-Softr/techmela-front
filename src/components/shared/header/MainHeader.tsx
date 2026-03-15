import MobileMenuFetcher from "./components/MobileMenuFetcher";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CartLinksAndAccount from "./components/CartLinksAndAccount";
import Search from "./components/Search";
import logo from "../../../../public/images/logo/logo.png";

const MainHeader = () => {
  return (
    <div className="flex gap-5 justify-between lg:justify-evenly items-center px-2 lg:px-10 py-2 bg-primary">
      <div className="order-2 lg:order-1 bg-white rounded-md">
        <Link href="/">
          <Image
            src={logo}
            alt="Company logo"
            height={100}
            width={200}
            className="w-16 h-12 md:w-24 md:h-12 rounded-md"
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
      <div className="flex-grow hidden lg:block lg:order-3 max-w-2xl">
        <Search />
      </div>
      <div className="flex items-center order-3 lg:order-4  flex-grow-0 justify-end">
        <CartLinksAndAccount />
      </div>
    </div>
  );
};

export default MainHeader;
