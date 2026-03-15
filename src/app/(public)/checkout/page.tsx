import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import config from "@/config/config";
import CheckoutForm from "./components/CheckoutForm";
import PaymentMethodsFetcher from "./components/PaymentMethodsFetcher";
import SelectShippingAreaFetcher from "./components/SelectShippingAreaFetcher";

const Checkout = async () => {
  return (
    <section className="my-8">
      <ContainerMax>
        <CheckoutForm
          shippingAreaSlot={
            <SelectShippingAreaFetcher
              shippingCostExceptFirst={config.per_item_shipping_cost}
            />
          }
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
