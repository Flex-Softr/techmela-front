import CopyrightContent from "./CopyrightContent";
import MainFooterContent from "./MainFooterContent";

const Footer = () => {
  return (
    <footer className="mt-7 md:mt-10 bg-primary text-primary-foreground">
      <MainFooterContent />
      <CopyrightContent />
    </footer>
  );
};

export default Footer;
