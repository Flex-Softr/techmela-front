import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import CheckoutForm from "./components/CheckoutForm";
import PaymentMethodsFetcher from "./components/PaymentMethodsFetcher";
import SelectShippingAreaFetcher from "./components/SelectShippingAreaFetcher";

const Checkout = async () => {
  return (
    <section className="my-8">
      <ContainerMax>
        <CheckoutForm
          shippingAreaSlot={<SelectShippingAreaFetcher />}
          paymentMethodsDesktopSlot={
            <PaymentMethodsFetcher idPrefix="desktop-payment" />
          }
          paymentMethodsMobileSlot={
            <PaymentMethodsFetcher idPrefix="mobile-payment" />
          }
        />
      </ContainerMax>
    </section>
  );
};

export default Checkout;
