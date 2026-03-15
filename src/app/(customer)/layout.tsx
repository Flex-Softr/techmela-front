import FloatingContact from "@/components/floatingContact/FloatingContact";
import JumpToTopBtn from "@/components/jumpToTopBtn/JumpToTopBtn";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ReactNode } from "react";
import CustomerProtection from "./_components/CustomerProtection";
import Sidebar from "./_components/Sidebar";

type Props = {
  children: ReactNode;
};

const CustomerLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col font-hind-siliguri">
      <Header />

      <div className="flex-grow bg-gray-50/50 py-2 md:py-3">
        <ContainerMax>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            {/* Dashboard Sidebar */}
            <aside className="md:col-span-4 lg:col-span-3">
              <Sidebar />
            </aside>

            {/* Content Area */}
            <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 min-h-[500px]">
              <CustomerProtection>{children}</CustomerProtection>
            </div>
          </div>
        </ContainerMax>
      </div>

      <Footer />
      <JumpToTopBtn />
      <FloatingContact />
    </main>
  );
};

export default CustomerLayout;
