import FloatingContact from "@/components/floatingContact/FloatingContact";
import JumpToTopBtn from "@/components/jumpToTopBtn/JumpToTopBtn";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <JumpToTopBtn />
      <FloatingContact />
    </>
  );
}
