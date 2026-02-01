import WarrantyForm from "./components/WarrantyForm";

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
