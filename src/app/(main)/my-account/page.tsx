import ContactInformation from "./components/contactInformation/ContactInformation";
import DefaultShippingAddress from "./components/defaultShippingAddress/DefaultShippingAddress";

const MyAccoutPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="col-span-1">
        <ContactInformation />
      </div>
      <div className="col-span-1">
        <DefaultShippingAddress />
      </div>
    </div>
  );
};

export default MyAccoutPage;
