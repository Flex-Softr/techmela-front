import BottomHeader from "./BottomHeader";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <header className="sticky md:relative top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500">
      <TopHeader />
      <MainHeader />
      <BottomHeader />
    </header>
  );
};

export default Header;
