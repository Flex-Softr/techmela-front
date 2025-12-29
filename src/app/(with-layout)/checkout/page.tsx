import ContainerMax from "@/components/containerMax/ContainerMax";
import serverSideFetcher from "@/hooks/serverSideFetcher";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import CheckoutPageContent from "./components/CheckoutPageContent";

const Checkout = async () => {
  const [{ data: shippingCharges = [] }] = await serverSideFetcher<
    TShippingCharges[]
  >("/shipping-charges?isActive=true");
  const [{ data: paymentMethods = [] }] = await serverSideFetcher<
    TPaymentMethod[]
  >("/payment-method?isActive=true");

  return (
    <section className="mt-[80px] sm:mt-3">
      <ContainerMax>
        <CheckoutPageContent
          shippingCharges={shippingCharges}
          paymentMethods={paymentMethods}
        />
      </ContainerMax>
    </section>
  );
};

export default Checkout;
