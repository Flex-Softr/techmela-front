import BottomHeader from "./BottomHeader";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full mb-16 z-40 shadow-sm sm:static sm:shadow-none sm:bg-transparent sm:mb-0 bg-background">
        <TopHeader />
        <MainHeader />
        <BottomHeader />
      </header>
      <div className="h-[60px] w-full block sm:hidden"></div>
    </>
  );
};

export default Header;
