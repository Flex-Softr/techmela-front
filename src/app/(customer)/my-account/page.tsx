import ContactInformation from "./components/ContactInformation";
import DefaultShippingAddress from "./components/DefaultShippingAddress";

export const metadata = {
  title: "আমার অ্যাকাউন্ট",
};

const MyAccoutPage = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="col-span-1">
          <ContactInformation />
        </div>
        <div className="col-span-1">
          <DefaultShippingAddress />
        </div>
      </div>
    </div>
  );
};

export default MyAccoutPage;
