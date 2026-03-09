import ContainerMax from "@/components/containerMax/ContainerMax";
import { ReactNode } from "react";
import Sidebar from "./components/sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const UserAccountLayout = ({ children }: Props) => {
  return (
    <section className="px-2 sm:px-4 md:px-6 py-8 mt-4 md:mt-0 bg-gray-50/30 min-h-screen">
      <ContainerMax>
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your profile, address, and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Sidebar />
          </div>
          <div className="md:col-span-8 lg:col-span-9">{children}</div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default UserAccountLayout;
