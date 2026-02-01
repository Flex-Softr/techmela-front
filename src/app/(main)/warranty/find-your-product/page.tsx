import Conditions from "./components/conditions/Conditions";
// import InstructionVideo from "./components/instructionVideo/InstructionVideo";
import SearchProduct from "./components/searchProduct/SearchProduct";

const FindYourProductPage = () => {
  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <Conditions />
      {/* <InstructionVideo /> */}
      <SearchProduct />
    </div>
  );
};

export default FindYourProductPage;
