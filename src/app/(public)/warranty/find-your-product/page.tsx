import type { Metadata } from "next";
import Conditions from "./components/conditions/Conditions";
// import InstructionVideo from "./components/instructionVideo/InstructionVideo";
import SearchProduct from "./components/searchProduct/SearchProduct";

export const metadata: Metadata = {
  title: "ওয়ারেন্টি অনুসন্ধান | TechMela",
  description: "আপনার পণ্যের ওয়ারেন্টি কোড দিয়ে ওয়ারেন্টির মেয়াদ ও স্থিতি অনুসন্ধান করুন।",
};

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
