import BottomHeader from "./BottomHeader";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-background shadow-xs transition-all duration-500">
      <TopHeader />
      <MainHeader />
      <BottomHeader />
    </header>
  );
};

export default Header;
