import type { Metadata } from "next";
import WarrantyForm from "./components/WarrantyForm";

export const metadata: Metadata = {
  title: "ওয়ারেন্টি ক্লেম | TechMela",
  description: "আপনার পণ্যের ওয়ারেন্টি ক্লেম করার আবেদন ফর্ম পূরণ করুন।",
};

const ClaimYourWarrantyPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[95%] md:w-[85%] my-8 rounded-lg">
        <div className="mx-2 md:mx-12">
          <WarrantyForm />
        </div>
      </div>
    </div>
  );
};

export default ClaimYourWarrantyPage;
