import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import SelectShippingArea from "./SelectShippingArea";

const SelectShippingAreaFetcher = async () => {
  const { data: shippingCharges = [] } = await serverSideFetcher<
    TShippingCharges[]
  >({
    url: "/shipping-charges?isActive=true",
    tags: ["shippingCharge"],
  });

  return <SelectShippingArea shippingCharges={shippingCharges} />;
};

export default SelectShippingAreaFetcher;
