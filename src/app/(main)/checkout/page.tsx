import ContainerMax from "@/components/containerMax/ContainerMax";
import { TPaymentMethod } from "@/types/paymentMethod";
import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import CheckoutForm from "./components/CheckoutForm";

const Checkout = async () => {
  const { data: shippingCharges = [] } = await serverSideFetcher<
    TShippingCharges[]
  >({
    url: "/shipping-charges?isActive=true",
    tags: ["shippingCharge"],
  });
  const { data: paymentMethods = [] } = await serverSideFetcher<
    TPaymentMethod[]
  >({
    url: "/payment-method?isActive=true",
    tags: ["paymentMethod"],
  });

  return (
    <section className="mt-2 sm:mt-3">
      <ContainerMax>
        <CheckoutForm
          shippingCharges={shippingCharges}
          paymentMethods={paymentMethods}
        />
      </ContainerMax>
    </section>
  );
};

export default Checkout;
